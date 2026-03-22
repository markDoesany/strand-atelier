"use client";

import { IntroBoot } from "./intro-boot";
import { CursorHud } from "./cursor-hud";
import { ViewportFrame } from "./viewport-frame";

export function AppChrome() {
  return (
    <>
      <IntroBoot />
      <CursorHud />
      <ViewportFrame />
    </>
  );
}
