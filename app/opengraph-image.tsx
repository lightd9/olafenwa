import { ImageResponse } from "next/og";
import { portfolio } from "@/data/olafenwa";

export const alt = `${portfolio.name} — ${portfolio.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 100px",
        backgroundColor: "#f7f6f3",
        color: "#111110",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 9999,
            backgroundColor: "#22c55e",
          }}
        />
        <div
          style={{
            fontSize: 24,
            color: "#2563eb",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          available for work
        </div>
      </div>

      <div style={{ fontSize: 88, fontWeight: 500, lineHeight: 1.05 }}>
        {portfolio.name}
      </div>
      <div style={{ fontSize: 48, color: "#888880", marginTop: 16 }}>
        {portfolio.role}
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#888880",
          marginTop: 48,
          maxWidth: 900,
        }}
      >
        {portfolio.bio}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 100,
          fontSize: 24,
          color: "#888880",
          fontFamily: "monospace",
        }}
      >
        olafenwa.vercel.app
      </div>
    </div>,
    { ...size },
  );
}
