import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Roman Izmestev";
  const description =
    searchParams.get("description") || "Full-Stack Developer";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Gradient accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            R
          </span>
          <span
            style={{
              fontSize: "80px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #06b6d4, #ec4899)",
              backgroundClip: "text",
              color: "transparent",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            .
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "20px",
            lineHeight: 1.2,
            maxWidth: "900px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "28px",
            color: "#a3a3a3",
            maxWidth: "800px",
            lineHeight: 1.4,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {description}
        </div>

        {/* URL at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            fontSize: "24px",
            color: "#525252",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          romaizm.pro
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
