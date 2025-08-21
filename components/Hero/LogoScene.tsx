/* components/LogoScene.tsx */
"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, Environment, Edges } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

type Phase = "initial" | "pc" | "human" | "approach" | "magic";

export default function LogoScene({
  phase,
  gap,
  disableHeavyMotion,
}: {
  phase: Phase;
  gap: number;
  disableHeavyMotion: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 42], fov: 35, near: 0.1, far: 200 }}
    >
      <Suspense fallback={null}>
        <Scene
          phase={phase}
          gap={gap}
          disableHeavyMotion={disableHeavyMotion}
        />
      </Suspense>
    </Canvas>
  );
}

function Scene({
  phase,
  gap,
  disableHeavyMotion,
}: {
  phase: Phase;
  gap: number;
  disableHeavyMotion: boolean;
}) {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    const t = performance.now() * 0.0002;
    lightRef.current.position.x = 20 * Math.cos(t);
    lightRef.current.position.z = 30 + 10 * Math.sin(t * 0.7);
  });

  return (
    <>
      <Environment preset="city" />
      <directionalLight
        ref={lightRef}
        intensity={1.8}
        position={[18, 24, 28]}
        castShadow
      />
      <ambientLight intensity={0.35} />

      <ExtrudedSVG
        url="/logo-pc.svg"
        color="#111111"
        metalness={0.25}
        roughness={0.45}
        depth={4}
        bevel
        phase={phase}
        scale={0.18}
        disableHeavyMotion={disableHeavyMotion}
        targets={{
          initial: {
            position: [0, gap * 0.012 + 20, 0],
            rotation: [-Math.PI / 6, 0.08, 0.05],
          },
          pc: {
            position: [0, gap * -0.012 - 8, 0],
            rotation: [-Math.PI / 8, 0.05, 0.0],
          },
          human: {
            position: [0, gap * -0.012 - 8, 0],
            rotation: [-Math.PI / 10, 0.03, 0.0],
          },
          approach: { position: [0, 3, 0], rotation: [0.08, 0, 0] },
          magic: { position: [0, 0.6, 0], rotation: [0, 0, 0] },
        }}
      />

      <ExtrudedSVG
        url="/logo-human.svg"
        color="#111111"
        metalness={0.25}
        roughness={0.45}
        depth={4}
        bevel
        phase={phase}
        scale={0.18}
        disableHeavyMotion={disableHeavyMotion}
        targets={{
          initial: {
            position: [0, -gap * 0.012 - 20, 0],
            rotation: [Math.PI / 6, -0.08, -0.05],
          },
          pc: {
            position: [0, gap * 0.012 + 8, 0],
            rotation: [Math.PI / 8, -0.05, 0.0],
          },
          human: {
            position: [0, gap * 0.012 + 8, 0],
            rotation: [Math.PI / 9, -0.03, 0.0],
          },
          approach: { position: [0, -3, 0], rotation: [-0.08, 0, 0] },
          magic: { position: [0, -0.6, 0], rotation: [0, 0, 0] },
        }}
      />

      <ContactShadows
        position={[0, -7, 0]}
        opacity={0.3}
        scale={80}
        blur={2.4}
        far={24}
      />
    </>
  );
}

function ExtrudedSVG({
  url,
  color = "#222",
  metalness = 0.2,
  roughness = 0.5,
  depth = 6,
  bevel = true,
  scale = 0.2,
  phase,
  disableHeavyMotion,
  targets,
}: {
  url: string;
  color?: string;
  metalness?: number;
  roughness?: number;
  depth?: number;
  bevel?: boolean;
  scale?: number;
  phase: Phase;
  disableHeavyMotion: boolean;
  targets: Record<
    Phase | "initial",
    { position: [number, number, number]; rotation: [number, number, number] }
  >;
}) {
  const group = useRef<THREE.Group>(null!);
  const data = useLoader(SVGLoader, url);

  const shapes = useMemo(() => {
    const s: THREE.Shape[] = [];
    for (const p of data.paths) s.push(...SVGLoader.createShapes(p));
    return s;
  }, [data]);

  const geometry = useMemo(() => {
    const temp: THREE.BufferGeometry[] = [];
    const extruded = new THREE.ExtrudeGeometry(shapes, {
      depth,
      bevelEnabled: bevel,
      bevelSegments: 2,
      bevelSize: 0.6,
      bevelThickness: 0.6,
      curveSegments: 24,
    });
    extruded.center();
    temp.push(extruded);
    return mergeGeometries(temp) ?? extruded;
  }, [shapes, depth, bevel]);

  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color, metalness, roughness }),
    [color, metalness, roughness]
  );

  useFrame((_, dt) => {
    const t = targets[phase] ?? targets.initial;
    const damp = disableHeavyMotion ? 12 : 6;
    group.current.position.x +=
      (t.position[0] - group.current.position.x) * Math.min(1, damp * dt);
    group.current.position.y +=
      (t.position[1] - group.current.position.y) * Math.min(1, damp * dt);
    group.current.position.z +=
      (t.position[2] - group.current.position.z) * Math.min(1, damp * dt);
    group.current.rotation.x +=
      (t.rotation[0] - group.current.rotation.x) * Math.min(1, 6 * dt);
    group.current.rotation.y +=
      (t.rotation[1] - group.current.rotation.y) * Math.min(1, 6 * dt);
    group.current.rotation.z +=
      (t.rotation[2] - group.current.rotation.z) * Math.min(1, 6 * dt);

    if (!disableHeavyMotion && phase === "approach") {
      const k = Math.sin(performance.now() * 0.003) * 0.02;
      group.current.scale.setScalar(scale * (1 + k));
    } else {
      group.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
      {/* crisp silhouette */}
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#000" roughness={1} metalness={0} />
        <Edges threshold={15} />
      </mesh>
    </group>
  );
}
