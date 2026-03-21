"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows, Grid } from "@react-three/drei";
import * as THREE from "three";
import { useHeroScrollProgress } from "@/context/hero-scroll-context";

function SceneFog() {
  const { scene } = useThree();
  useLayoutEffect(() => {
    const prev = scene.fog;
    scene.fog = new THREE.Fog("#faf8f4", 4.5, 13.5);
    return () => {
      scene.fog = prev;
    };
  }, [scene]);
  return null;
}

function AbstractForm() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const progressRef = useHeroScrollProgress();
  const geometry = useMemo(() => new THREE.TorusKnotGeometry(0.88, 0.3, 64, 14), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.55, 0.018, 48, 120), []);
  const innerGeo = useMemo(() => new THREE.IcosahedronGeometry(0.42, 1), []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const wire = wireRef.current;
    const ring = ringRef.current;
    const inner = innerRef.current;
    if (!mesh) return;

    const slow = 0.045;
    mesh.rotation.y += delta * slow;
    mesh.rotation.x = THREE.MathUtils.lerp(
      mesh.rotation.x,
      progressRef.current * 0.28 + Math.sin(state.clock.elapsedTime * 0.12) * 0.035,
      0.06,
    );
    mesh.position.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.06;

    if (wire) {
      wire.rotation.copy(mesh.rotation);
      wire.position.copy(mesh.position);
    }
    if (inner) {
      inner.position.copy(mesh.position);
      inner.rotation.y = mesh.rotation.y * -1.15 + state.clock.elapsedTime * 0.08;
      inner.rotation.x = mesh.rotation.x * 0.6 + Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
    }
    if (ring) {
      ring.rotation.x = Math.PI / 2.35;
      ring.rotation.z = state.clock.elapsedTime * 0.11 + progressRef.current * 0.4;
    }
  });

  return (
    <group>
      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.4}>
        <group>
          <mesh ref={meshRef} geometry={geometry} scale={1.28} castShadow>
            <meshPhysicalMaterial
              color="#ebe4d8"
              metalness={0.45}
              roughness={0.38}
              clearcoat={0.35}
              clearcoatRoughness={0.45}
              reflectivity={0.5}
            />
          </mesh>
          <lineSegments ref={wireRef} geometry={edges} scale={1.29}>
            <lineBasicMaterial color="#c4a574" transparent opacity={0.28} />
          </lineSegments>
          <mesh ref={innerRef} geometry={innerGeo} scale={1}>
            <meshBasicMaterial
              color="#c4a574"
              wireframe
              transparent
              opacity={0.14}
              depthWrite={false}
            />
          </mesh>
        </group>
      </Float>
      <mesh ref={ringRef} geometry={ringGeo} position={[0.1, -0.05, -0.2]}>
        <meshBasicMaterial color="#9a7b4f" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <>
      <SceneFog />
      <ambientLight intensity={0.48} />
      <directionalLight position={[5, 7, 6]} intensity={1.15} color="#fff8ef" castShadow />
      <directionalLight position={[-6, 3, -5]} intensity={0.42} color="#d8cfc2" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.35}
        penumbra={0.85}
        intensity={0.55}
        color="#fff5e6"
        castShadow
      />
      <AbstractForm />
      <ContactShadows
        position={[0, -1.12, 0]}
        opacity={0.45}
        scale={12}
        blur={2.8}
        far={3.5}
        color="#1a1917"
      />
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
    </>
  );
}
