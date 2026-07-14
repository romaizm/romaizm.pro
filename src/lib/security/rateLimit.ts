import { createHash } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_LOCAL_ENTRIES = 10_000;

const localLimits = new Map<string, { count: number; reset: number }>();

const hasRedis = Boolean(
  process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
);

const durableLimiter = hasRedis
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(LIMIT, "1 h"),
      prefix: "romaizm:contact",
      analytics: false,
    })
  : null;

function limitLocally(identifier: string) {
  const now = Date.now();

  if (localLimits.size >= MAX_LOCAL_ENTRIES) {
    for (const [key, value] of localLimits) {
      if (value.reset <= now) localLimits.delete(key);
    }
  }

  const current = localLimits.get(identifier);
  if (!current || current.reset <= now) {
    localLimits.set(identifier, { count: 1, reset: now + WINDOW_MS });
    return { success: true, reset: now + WINDOW_MS };
  }

  if (current.count >= LIMIT) {
    return { success: false, reset: current.reset };
  }

  current.count += 1;
  return { success: true, reset: current.reset };
}

export function createRateLimitIdentifier(ip: string, userAgent: string) {
  return createHash("sha256")
    .update(`${ip}|${userAgent.slice(0, 256)}`)
    .digest("hex");
}

export async function checkContactRateLimit(identifier: string) {
  if (durableLimiter) {
    try {
      const result = await durableLimiter.limit(identifier);
      return { success: result.success, reset: result.reset };
    } catch {
      // Preserve availability during a transient Redis outage while still
      // enforcing a per-instance limit.
    }
  }

  return limitLocally(identifier);
}
