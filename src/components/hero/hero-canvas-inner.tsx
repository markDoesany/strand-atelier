"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { HeroScene } from "./hero-scene";

export function HeroCanvasInner() {
  return (
    <Canvas
      shadows
      camera={{ position: [0.42, 0.28, 4.05], fov: 38 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </Canvas>
  );
}
