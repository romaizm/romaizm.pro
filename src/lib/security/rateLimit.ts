import { createHash } from "node:crypto";

const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_LOCAL_ENTRIES = 10_000;

const localLimits = new Map<string, { count: number; reset: number }>();

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
  return limitLocally(identifier);
}
