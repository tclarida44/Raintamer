import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Rain Tamer — Built to tame Oklahoma weather.";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(ellipse 1200px 600px at 50% 0%, rgba(31,102,255,0.28), transparent 60%), linear-gradient(180deg, #0A1628 0%, #050B14 100%)",
          color: "#F5F7FA",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "#94A3B8",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#1F66FF",
            }}
          />
          OKC · Since 2012
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -3,
            }}
          >
            Built to tame
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -3,
              background: "linear-gradient(135deg, #BEDDFF 0%, #1F66FF 60%, #0F4FE0 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Oklahoma weather.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#C7CFD9",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            Rain Tamer
          </div>
          <div style={{ color: "#1F66FF", fontWeight: 600 }}>(405) 726-8106</div>
        </div>
      </div>
    ),
    size,
  );
}
