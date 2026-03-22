/**
 * Stylized Bay-area 3D map: abstract W→E / N↑ layout (not geographic scale).
 */
export const regionalMap3DLayout = {
  sf: { pos: [-1.02, 0, 0.32] as const, mesh: "spire" as const },
  marin: { pos: [-0.38, 0, 1.2] as const, mesh: "mesa" as const },
  pen: { pos: [-0.78, 0, -0.9] as const, mesh: "corridor" as const },
  eb: { pos: [1.26, 0, 0.4] as const, mesh: "grid" as const },
} as const;

export type RegionalMapId = keyof typeof regionalMap3DLayout;
