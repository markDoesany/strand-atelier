"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import type { SeriesPoint } from "@/data/market";

type Props = {
  primary: SeriesPoint[];
  secondary: SeriesPoint[];
  className?: string;
};

function toCurvePoints(points: SeriesPoint[], chaos: number) {
  const ys = points.map((p) => p.y);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const range = maxY - minY || 1;
  const n = points.length;
  return points.map((p, i) => {
    const t = n <= 1 ? 0 : i / (n - 1);
    const x = THREE.MathUtils.lerp(-2.15, 2.15, t);
    const y = ((p.y - minY) / range) * 1.45 + 0.12;
    const z =
      Math.sin(i * 0.92 + 0.4) * 0.14 * chaos + Math.cos(i * 0.37 + 1.8) * 0.07 * chaos;
    return new THREE.Vector3(x, y, z);
  });
}

function TrendTube({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const geom = useMemo(() => new THREE.TubeGeometry(curve, 160, 0.034, 10, false), [curve]);

  return (
    <mesh geometry={geom} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#e8dfd2"
        emissive="#c4a574"
        emissiveIntensity={0.08}
        metalness={0.55}
        roughness={0.28}
        clearcoat={0.45}
        clearcoatRoughness={0.35}
      />
    </mesh>
  );
}

function MonthHitSpheres({
  positions,
  hovered,
  onHover,
}: {
  positions: THREE.Vector3[];
  hovered: number | null;
  onHover: (i: number | null) => void;
}) {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-delta * 10);
    groupRefs.current.forEach((g, i) => {
      if (!g) return;
      const target = hovered === i ? 1.35 : 1;
      const s = THREE.MathUtils.lerp(g.scale.x, target, k);
      g.scale.setScalar(s);
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <group key={i} ref={(el) => { groupRefs.current[i] = el; }} position={pos}>
          <mesh
            onPointerOver={(e) => {
              e.stopPropagation();
              onHover(i);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              onHover(null);
            }}
          >
            <sphereGeometry args={[0.14, 10, 10]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
          <mesh castShadow>
            <sphereGeometry args={[0.056, 20, 20]} />
            <meshPhysicalMaterial
              color={hovered === i ? "#f0e6d8" : "#d9cfc2"}
              emissive="#c4a574"
              emissiveIntensity={hovered === i ? 0.35 : 0.12}
              metalness={0.5}
              roughness={0.25}
              clearcoat={0.4}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function ChartScene({
  primary,
  secondary,
  hovered,
  onHover,
  motionOn,
}: {
  primary: SeriesPoint[];
  secondary: SeriesPoint[];
  hovered: number | null;
  onHover: (i: number | null) => void;
  motionOn: boolean;
}) {
  const primaryPts = useMemo(() => toCurvePoints(primary, 1), [primary]);
  const secondaryPts = useMemo(() => toCurvePoints(secondary, 0.65), [secondary]);

  const curvePrimary = useMemo(
    () => new THREE.CatmullRomCurve3(primaryPts, false, "catmullrom", 0.35),
    [primaryPts],
  );

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g || !motionOn) return;
    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.09) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 8, 5]} intensity={1.05} color="#fff8f0" castShadow />
      <directionalLight position={[-5, 2, -4]} intensity={0.35} color="#c4a574" />
      <spotLight position={[0, 5, 0]} angle={0.5} penumbra={1} intensity={0.25} color="#fff5e6" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#f5f1ea" roughness={0.92} metalness={0.05} />
      </mesh>

      <TrendTube curve={curvePrimary} />
      <Line
        points={secondaryPts}
        color="#5c5852"
        lineWidth={1.2}
        transparent
        opacity={0.38}
        dashed
        dashSize={0.14}
        gapSize={0.1}
      />

      <MonthHitSpheres positions={primaryPts} hovered={hovered} onHover={onHover} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3.2}
        maxDistance={6.8}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.05}
        minAzimuthAngle={-Math.PI / 5}
        maxAzimuthAngle={Math.PI / 5}
        enableDamping
        dampingFactor={0.065}
        autoRotate={motionOn}
        autoRotateSpeed={0.28}
      />
    </group>
  );
}

export function PriceTrendChart3D({ primary, secondary, className = "" }: Props) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const motionOn = !reduce;

  const active = hovered !== null ? primary[hovered] : null;

  return (
    <div className={`relative ${className}`}>
      <p className="sr-only">
        Interactive three-dimensional chart of median price trend. Drag to orbit, scroll to zoom.
        Hover nodes for month labels.
      </p>
      <div className="relative h-[min(360px,55vw)] w-full min-h-[260px] overflow-hidden rounded-sm bg-[var(--stone)]/40 ring-1 ring-[var(--line)]">
        <Canvas
          shadows
          camera={{ position: [0, 1.05, 4.35], fov: 42, near: 0.1, far: 40 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          className="touch-none"
        >
          <ChartScene
            primary={primary}
            secondary={secondary}
            hovered={hovered}
            onHover={setHovered}
            motionOn={motionOn}
          />
        </Canvas>
        <div className="pointer-events-none absolute left-3 top-3 font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.2em] text-[var(--charcoal-muted)]/80">
          [ orbit · zoom · hover ]
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-14 left-1/2 z-10 min-h-[2.5rem] -translate-x-1/2 text-center font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-[var(--charcoal)] transition-opacity duration-200"
        style={{ opacity: active ? 1 : 0 }}
        aria-live="polite"
      >
        {active ? (
          <>
            <span className="text-[var(--gold-deep)]">{active.x}</span>
            <span className="mx-2 text-[var(--charcoal-muted)]">·</span>
            <span className="tabular-nums">${active.y.toFixed(2)}M</span>
          </>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-x-1 gap-y-2 sm:gap-x-0">
        {primary.map((p, i) => (
          <span
            key={p.x}
            className="inline-block font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.08em] text-[var(--charcoal-muted)] transition-colors duration-200 sm:px-1"
            style={{
              transform: `translate(${((i * 7) % 5) - 2}px, ${((i * 3) % 4) - 1}px) rotate(${((i % 5) - 2) * 0.8}deg)`,
            }}
          >
            {p.x}
          </span>
        ))}
      </div>
    </div>
  );
}
