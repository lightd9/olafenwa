import { ImageResponse } from "next/og";
import { portfolio } from "@/data/olafenwa";

export const alt = "Project case study by Hassan Olafenwa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  const title = project?.title ?? portfolio.name;
  const tags = project?.tags.join("  ·  ") ?? portfolio.role;

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
          fontSize: 22,
          color: "#2563eb",
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 32,
        }}
      >
        Selected Work
      </div>
      <div
        style={{
          fontSize: title.length > 24 ? 64 : 80,
          fontWeight: 500,
          lineHeight: 1.05,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#888880",
          marginTop: 36,
        }}
      >
        {tags}
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
        olafenwa.vercel.app/work/{slug}
      </div>
    </div>,
    { ...size },
  );
}
