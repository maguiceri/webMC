"use client";

/**
 * Full-screen looping video background.
 * Drop a file at `public/neural.mp4` (and optionally `public/neural.webm`).
 * The component renders the video covering the viewport with overlays for
 * readability. If the video fails to load, the dark gradient stays visible.
 */
export default function VideoBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Fallback gradient — always visible behind the video */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#01030a_0%,#020617_45%,#040a1c_100%)]" />

      {/* Looping video — color-graded to match the dark blue palette */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        style={{
          filter:
            "saturate(0.6) brightness(0.9) contrast(1.05) hue-rotate(-8deg)",
        }}
      >
        <source
          src="/14134130_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Blue color-grading layer (recolors the video toward dark blue) */}
      <div
        className="absolute inset-0 mix-blend-color opacity-85"
        style={{
          background:
            "linear-gradient(180deg, #0a163d 0%, #0a1a4a 50%, #0a1230 100%)",
        }}
      />

      {/* Multiply tint to keep the blacks deep */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.42) 0%, rgba(5,10,38,0.32) 50%, rgba(2,6,23,0.42) 100%)",
        }}
      />

      {/* Subtle blue glow accents (radials in the brand palette) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.20),transparent_55%),radial-gradient(circle_at_85%_85%,rgba(56,189,248,0.16),transparent_55%)]" />

      {/* Final readability overlay */}
      <div className="absolute inset-0 bg-slate-950/25" />

      {/* Top + bottom vignettes (header / footer legibility) */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />
    </div>
  );
}
