"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

export type RegionArea = {
  id: string;
  name: string;
  median: string;
  yoy: string;
  inventory: string;
  note: string;
};

type Props = {
  areas: readonly RegionArea[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  className?: string;
};

import { regionalMap3DLayout } from "@/data/regional-map-layout";

/** Heights suggest inventory tension (Tight= tall). Shape from regional-map-layout. */
const REGION_HEIGHT: Record<string, number> = {
  sf: 0.72,
  marin: 0.58,
  pen: 0.65,
  eb: 0.38,
};

const SHAPE_MAP = { spire: "tower" as const, mesa: "block" as const, corridor: "tower" as const, grid: "pillar" as const };

const GOLD = new THREE.Color("#c4a574");
const STONE = new THREE.Color("#e5ddd2");
const STONE_DEEP = new THREE.Color("#d4ccc0");
const WATER = new THREE.Color("#c8c2b8");

function RegionMarker({
  area,
  pos,
  height,
  shape,
  selected,
  hovered,
  onPointerDown,
  onPointerOver,
  onPointerOut,
}: {
  area: RegionArea;
  pos: [number, number, number];
  height: number;
  shape: "tower" | "block" | "pillar";
  selected: boolean;
  hovered: boolean;
  onPointerDown: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hitRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const m = meshRef.current;
    if (!m) return;
    const target = selected ? 1.12 : hovered ? 1.05 : 1;
    const s = THREE.MathUtils.lerp(m.scale.y, target, 1 - Math.exp(-delta * 8));
    m.scale.set(1, s, 1);
  });

  const emissive = selected ? 0.25 : hovered ? 0.12 : 0.04;
  const w = shape === "block" ? 0.22 : 0.18;
  const d = shape === "block" ? 0.28 : 0.18;

  return (
    <group position={[pos[0], height / 2, pos[2]]}>
      <mesh
        ref={hitRef}
        onPointerDown={(e) => {
          e.stopPropagation();
          onPointerDown();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onPointerOver();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onPointerOut();
        }}
      >
        <boxGeometry args={[w * 2.2, height * 1.4, d * 2.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={meshRef} castShadow receiveShadow position={[0, 0, 0]}>
      {shape === "tower" ? (
        <boxGeometry args={[w, height, d]} />
      ) : shape === "block" ? (
          <RoundedBox args={[w * 1.2, height * 0.9, d * 1.2]} radius={0.02} smoothness={2} />
        ) : (
          <cylinderGeometry args={[w * 0.8, w, height, 6]} />
        )}
        <meshPhysicalMaterial
          color={STONE}
          emissive={GOLD}
          emissiveIntensity={emissive}
          metalness={0.48}
          roughness={0.32}
          clearcoat={0.4}
          clearcoatRoughness={0.35}
        />
      </mesh>
    </group>
  );
}

function MapScene({
  areas,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  motionOn,
}: {
  areas: readonly RegionArea[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
  motionOn: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g || !motionOn) return;
    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.06) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 4]} intensity={1.0} color="#fff8f0" castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.3} color="#c4a574" />
      <pointLight position={[0.5, 1.5, 0.5]} intensity={0.2} color="#f0e8dc" />

      {/* Water / bay plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[3.2, 2.6]} />
        <meshStandardMaterial
          color={WATER}
          roughness={0.92}
          metalness={0.08}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Landmass - stylized peninsula outline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <ringGeometry args={[0.4, 1.5, 32, 1, 0, Math.PI * 1.6]} />
        <meshStandardMaterial
          color={STONE_DEEP}
          roughness={0.88}
          metalness={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {areas.map((area) => {
        const layout = regionalMap3DLayout[area.id as keyof typeof regionalMap3DLayout];
        if (!layout) return null;
        const height = REGION_HEIGHT[area.id] ?? 0.5;
        const shape = SHAPE_MAP[layout.mesh];
        return (
          <RegionMarker
            key={area.id}
            area={area}
            pos={[layout.pos[0], layout.pos[1], layout.pos[2]]}
            height={height}
            shape={shape}
            selected={selectedId === area.id}
            hovered={hoveredId === area.id}
            onPointerDown={() => onSelect(selectedId === area.id ? null : area.id)}
            onPointerOver={() => onHover(area.id)}
            onPointerOut={() => onHover(null)}
          />
        );
      })}

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={1.4}
        maxDistance={3.2}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        enableDamping
        dampingFactor={0.06}
        autoRotate={motionOn}
        autoRotateSpeed={0.2}
      />
    </group>
  );
}

export function RegionMap3D({ areas, selectedId, onSelect, className = "" }: Props) {
  const reduce = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const motionOn = !reduce;

  const selected = selectedId ? areas.find((a) => a.id === selectedId) : null;

  return (
    <div className={`relative ${className}`}>
      <p className="sr-only">
        Interactive 3D map of Bay Area regions. Drag to orbit, scroll to zoom. Click markers for
        regional insights.
      </p>
      <div className="relative h-[min(340px,50vw)] w-full min-h-[260px] overflow-hidden rounded-sm bg-[var(--stone)]/50 ring-1 ring-[var(--line)]">
        <Canvas
          shadows
          camera={{ position: [0, 0.9, 2.2], fov: 45, near: 0.1, far: 20 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          className="touch-none"
        >
          <MapScene
            areas={areas}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={onSelect}
            onHover={setHoveredId}
            motionOn={motionOn}
          />
        </Canvas>
        <div className="pointer-events-none absolute right-3 top-3 font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.18em] text-[var(--charcoal-muted)]/75">
          [ bay area · illustrative ]
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-12 left-1/2 z-10 -translate-x-1/2 text-center font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--charcoal)] transition-opacity duration-200"
        style={{ opacity: hoveredId || selectedId ? 1 : 0 }}
        aria-live="polite"
      >
        {selected?.name ?? (hoveredId ? areas.find((a) => a.id === hoveredId)?.name : null) ?? ""}
      </div>
    </div>
  );
}
