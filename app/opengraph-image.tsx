import { ImageResponse } from "next/og";

export const alt = "Magali Cerisola — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #020617 0%, #061633 35%, #0a2a6b 70%, #1d4ed8 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Soft radial accents */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.45), transparent 60%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -180,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.30), transparent 60%)",
            display: "flex",
          }}
        />

        {/* Top row: MC logo + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 22,
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "white",
              boxShadow: "0 25px 60px -15px rgba(59,130,246,0.6)",
              letterSpacing: "-1px",
            }}
          >
            MC
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 18,
                color: "rgba(186,230,253,0.75)",
                letterSpacing: "8px",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Curriculum Vitae
            </span>
            <span
              style={{
                fontSize: 22,
                color: "rgba(224,242,254,0.55)",
                fontWeight: 400,
              }}
            >
              maggceri.com
            </span>
          </div>
        </div>

        {/* Main heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 104,
              fontWeight: 900,
              color: "#f8fafc",
              lineHeight: 1,
              letterSpacing: "-3px",
              display: "flex",
            }}
          >
            Magali Cerisola
          </div>
          <div
            style={{
              fontSize: 44,
              color: "#bae6fd",
              fontWeight: 600,
              display: "flex",
            }}
          >
            Full Stack Developer
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(186,230,253,0.7)",
              fontWeight: 400,
              marginTop: 8,
              display: "flex",
            }}
          >
            4+ years building modern web applications · Buenos Aires, AR
          </div>
        </div>

        {/* Bottom row: tech tags */}
        <div
          style={{
            display: "flex",
            gap: 10,
            position: "relative",
            flexWrap: "wrap",
          }}
        >
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "Figma",
          ].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(96,165,250,0.45)",
                background: "rgba(30,58,138,0.45)",
                color: "#dbeafe",
                fontSize: 22,
                fontWeight: 500,
                display: "flex",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
