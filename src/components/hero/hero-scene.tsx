"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useThree } from "@react-three/fiber";
import { ContactShadows, Grid } from "@react-three/drei";
import * as THREE from "three";
import { DataSculpture } from "./data-sculpture";

/** Meshes inside won't participate in R3F raycasting (decor / shadows only). */
function RaycastSilent({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useLayoutEffect(() => {
    ref.current?.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) mesh.raycast = () => {};
    });
  }, []);
  return <group ref={ref}>{children}</group>;
}

function DecorativeGrid() {
  return (
    <RaycastSilent>
      <Grid
        position={[0, -1.13, 0]}
        args={[16, 16]}
        cellSize={0.22}
        cellThickness={0.4}
        cellColor="#c4a574"
        sectionSize={2.8}
        sectionThickness={0.65}
        sectionColor="#1a1917"
        fadeDistance={11}
        fadeStrength={1.2}
        infiniteGrid
        followCamera={false}
      />
    </RaycastSilent>
  );
}

function SceneFog() {
  const { scene } = useThree();
  useLayoutEffect(() => {
    const prev = scene.fog;
    scene.fog = new THREE.Fog("#faf8f4", 4.5, 14);
    return () => {
      scene.fog = prev;
    };
  }, [scene]);
  return null;
}

export function HeroScene() {
  return (
    <>
      <SceneFog />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 7, 6]} intensity={1.1} color="#fff8ef" castShadow />
      <directionalLight position={[-6, 3, -5]} intensity={0.45} color="#d8cfc2" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.35}
        penumbra={0.85}
        intensity={0.5}
        color="#fff5e6"
        castShadow
      />
      <pointLight position={[-2, 1.5, 2]} intensity={0.25} color="#c4a574" />
      <DataSculpture />
      <RaycastSilent>
        <ContactShadows
          position={[0, -1.12, 0]}
          opacity={0.48}
          scale={12}
          blur={2.8}
          far={3.5}
          color="#1a1917"
        />
      </RaycastSilent>
      <DecorativeGrid />
    </>
  );
}
