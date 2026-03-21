"use client";

import dynamic from "next/dynamic";
import { HeroFallback } from "./hero-fallback";

export const HeroCanvasDynamic = dynamic(
  () => import("./hero-canvas-inner").then((m) => m.HeroCanvasInner),
  { ssr: false, loading: () => <HeroFallback /> },
);
