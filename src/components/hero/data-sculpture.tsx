"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float, RoundedBox, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { useSculptureSelection } from "@/context/sculpture-selection-context";
import { useHeroScrollProgress } from "@/context/hero-scroll-context";
import { sculptureNodes } from "@/data/market";

const GOLD = new THREE.Color("#c4a574");
const STONE = new THREE.Color("#e8e2d8");
const STONE_DEEP = new THREE.Color("#d4cdc2");

function useFacetInteraction(id: string) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { selectedId, hoveredId, setSelectedId, setHoveredId, clearSelection } = useSculptureSelection();
  const reduce = useReducedMotion();
  const active = selectedId === id;
  const hover = hoveredId === id;

  useFrame((state) => {
    const mesh = meshRef.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;
    const t = state.clock.elapsedTime;
    const targetScale = active ? 1.08 : hover ? 1.04 : 1;
    const s = reduce
      ? targetScale
      : THREE.MathUtils.lerp(mesh.scale.x, targetScale, 0.14);
    mesh.scale.setScalar(s);
    const base = active ? 0.2 : hover ? 0.1 : 0.04;
    const pulse = active && !reduce ? Math.sin(t * 2.6) * 0.04 : 0;
    mat.emissiveIntensity = base + pulse;
  });

  const bind = useMemo(
    () => ({
      /** Pointer first — more reliable than click alone with overlays / trackpads */
      onPointerDown: (e: ThreeEvent<PointerEvent>) => {
        if (e.button !== 0) return;
        e.stopPropagation();
        if (selectedId === id) clearSelection();
        else setSelectedId(id);
      },
      onPointerOver: (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHoveredId(id);
      },
      onPointerOut: (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHoveredId((h) => (h === id ? null : h));
      },
    }),
    [id, selectedId, clearSelection, setSelectedId, setHoveredId],
  );

  return { meshRef, matRef, bind, active };
}

function FacetMesh({
  id,
  position,
  rotation = [0, 0, 0],
  geometry,
}: {
  id: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  geometry: React.ReactNode;
}) {
  const { meshRef, matRef, bind } = useFacetInteraction(id);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
      userData={{ insightId: id }}
      {...bind}
    >
      {geometry}
      <meshPhysicalMaterial
        ref={matRef}
        color={STONE}
        emissive={GOLD}
        emissiveIntensity={0.04}
        metalness={0.42}
        roughness={0.34}
        clearcoat={0.38}
        clearcoatRoughness={0.42}
      />
    </mesh>
  );
}

function FacetById({
  id,
  position,
  rotation,
}: {
  id: string;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  switch (id) {
    case "facet-med":
      return (
        <FacetMesh
          id={id}
          position={position}
          rotation={rotation}
          geometry={<boxGeometry args={[0.52, 0.34, 0.28]} />}
        />
      );
    case "facet-dom":
      return (
        <FacetMesh
          id={id}
          position={position}
          rotation={rotation}
          geometry={<octahedronGeometry args={[0.27]} />}
        />
      );
    case "facet-sf":
      return (
        <FacetMesh
          id={id}
          position={position}
          rotation={rotation}
          geometry={<boxGeometry args={[0.24, 0.74, 0.22]} />}
        />
      );
    case "facet-marin":
      return (
        <FacetMesh
          id={id}
          position={position}
          rotation={rotation ?? [0, 0, 0]}
          geometry={<torusGeometry args={[0.22, 0.045, 28, 48]} />}
        />
      );
    case "facet-yield":
      return (
        <FacetMesh
          id={id}
          position={position}
          rotation={rotation}
          geometry={<coneGeometry args={[0.26, 0.5, 6]} />}
        />
      );
    case "facet-rates":
      return (
        <FacetMesh
          id={id}
          position={position}
          rotation={rotation}
          geometry={<icosahedronGeometry args={[0.24, 0]} />}
        />
      );
    default:
      return null;
  }
}

/** Cursor feedback when hovering any facet */
function SculptureCursorBridge() {
  const { hoveredId } = useSculptureSelection();
  useCursor(!!hoveredId);
  return null;
}

const LAYOUT: Record<
  (typeof sculptureNodes)[number]["id"],
  { position: [number, number, number]; rotation?: [number, number, number] }
> = {
  "facet-med": { position: [-0.52, 0.18, 0.12], rotation: [0.12, 0.45, 0.05] },
  "facet-dom": { position: [0.28, 0.38, 0.02], rotation: [0.2, -0.35, 0.15] },
  "facet-sf": { position: [-0.12, -0.22, 0.32], rotation: [0.05, 0.2, 0.02] },
  "facet-marin": { position: [0.48, -0.08, 0.22], rotation: [1.15, 0.4, 0.2] },
  "facet-yield": { position: [-0.38, 0.52, -0.12], rotation: [0.08, 0.55, -0.2] },
  "facet-rates": { position: [0.12, 0.02, -0.38], rotation: [0.25, 0.15, 0.4] },
};

function BasePlinth() {
  const ref = useRef<THREE.Mesh>(null);
  /** Plinth is visual only — don't consume hits meant for facets above it */
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    m.raycast = () => {};
  }, []);

  return (
    <RoundedBox
      ref={ref}
      position={[0.02, -0.62, 0.05]}
      args={[1.85, 0.14, 1.35]}
      radius={0.04}
      smoothness={3}
      receiveShadow
      castShadow
    >
      <meshPhysicalMaterial color={STONE_DEEP} metalness={0.55} roughness={0.42} clearcoat={0.2} />
    </RoundedBox>
  );
}

export function DataSculpture() {
  const reduce = useReducedMotion();
  const progressRef = useHeroScrollProgress();

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const slow = reduce ? 0.012 : 0.028;
    g.rotation.y += delta * slow;
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      progressRef.current * 0.22 + (reduce ? 0 : Math.sin(state.clock.elapsedTime * 0.1) * 0.04),
      0.05,
    );
    g.position.y = reduce ? 0 : Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
  });

  const facets = (
    <group ref={groupRef} position={[0.05, -0.02, 0]}>
      <SculptureCursorBridge />
      {sculptureNodes.map((n) => {
        const cfg = LAYOUT[n.id];
        if (!cfg) return null;
        return <FacetById key={n.id} id={n.id} position={cfg.position} rotation={cfg.rotation} />;
      })}
    </group>
  );

  return (
    <group>
      <BasePlinth />
      {reduce ? (
        facets
      ) : (
        <Float speed={1.25} rotationIntensity={0.12} floatIntensity={0.28}>
          {facets}
        </Float>
      )}
    </group>
  );
}
