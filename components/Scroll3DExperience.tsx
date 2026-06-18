"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Mesh } from "three";

type SceneShapesProps = {
  progress: number;
};

const phases = [
  {
    title: "Origins",
    description: "A forma nyugodt, tiszta, fókuszált.",
  },
  {
    title: "Momentum",
    description: "Görgetésre nő az energia, elkezd forogni a tér.",
  },
  {
    title: "Velocity",
    description: "A geometriák szétnyílnak, a mozgás intenzívebbé válik.",
  },
  {
    title: "Impact",
    description: "A végén minden elem összeáll egy markáns finálévá.",
  },
] as const;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? window.scrollY / max : 0;
      setProgress(clamp01(next));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

function SceneShapes({ progress }: SceneShapesProps) {
  const knotRef = useRef<Mesh>(null);
  const orbitRef = useRef<Mesh>(null);
  const ringRefs = useRef<Mesh[]>([]);

  const ringOffsets = useMemo(() => [-1.1, -0.35, 0.35, 1.1], []);

  useFrame((state, delta) => {
    const smooth = 1 - Math.exp(-delta * 7);
    const p = progress;

    if (knotRef.current) {
      const knot = knotRef.current;
      knot.rotation.x += delta * (0.2 + p * 1.3);
      knot.rotation.y += delta * (0.35 + p * 1.6);
      knot.position.z += (p * 1.1 - knot.position.z) * smooth;
      const targetScale = 1 + p * 0.55;
      knot.scale.x += (targetScale - knot.scale.x) * smooth;
      knot.scale.y += (targetScale - knot.scale.y) * smooth;
      knot.scale.z += (targetScale - knot.scale.z) * smooth;
    }

    if (orbitRef.current) {
      const orbit = orbitRef.current;
      orbit.rotation.z += delta * 0.9;
      orbit.position.y += ((0.35 - p * 1.1) - orbit.position.y) * smooth;
      orbit.position.x += ((p * 0.9 - 0.45) - orbit.position.x) * smooth;
    }

    ringRefs.current.forEach((ring, index) => {
      if (!ring) {
        return;
      }
      const offset = ringOffsets[index] ?? 0;
      const wave = Math.sin(state.clock.elapsedTime * 0.8 + index * 0.9) * 0.12;
      ring.rotation.x += delta * (0.15 + index * 0.1);
      ring.rotation.y += delta * (0.25 + index * 0.07);
      ring.position.y += (offset + wave + p * 0.35) * smooth - ring.position.y * smooth;
      ring.position.x += ((index - 1.5) * 0.35 + p * 0.2) * smooth - ring.position.x * smooth;
      ring.position.z += (-p * (0.2 + index * 0.1)) * smooth - ring.position.z * smooth;
    });
  });

  return (
    <group>
      <mesh ref={knotRef} castShadow receiveShadow>
        <torusKnotGeometry args={[0.95, 0.27, 190, 24]} />
        <meshStandardMaterial
          color="#e9b44c"
          metalness={0.6}
          roughness={0.18}
          emissive="#8d5c1a"
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh ref={orbitRef} position={[-0.4, 0.35, -0.45]}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshStandardMaterial
          color="#2f88ff"
          roughness={0.22}
          metalness={0.35}
          emissive="#0d2f5a"
          emissiveIntensity={0.35}
          flatShading
        />
      </mesh>

      {ringOffsets.map((offset, index) => (
        <mesh
          key={offset}
          ref={(el) => {
            if (el) {
              ringRefs.current[index] = el;
            }
          }}
          position={[0, offset, -0.6 - index * 0.15]}
        >
          <torusGeometry args={[1.7 + index * 0.1, 0.017, 12, 128]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#8ec5ff" : "#ffdca8"}
            transparent
            opacity={0.72}
            metalness={0.45}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Scroll3DExperience() {
  const progress = useScrollProgress();
  const activeIndex = Math.min(phases.length - 1, Math.floor(progress * phases.length));
  const activePhase = phases[activeIndex];

  return (
    <section className="scroll3d" aria-label="Interaktív 3D bemutató">
      <div className="scroll3d-sticky">
        <div className="scroll3d-canvas-wrap" aria-hidden="true">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 52 }}>
            <color attach="background" args={["#05070d"]} />
            <fog attach="fog" args={["#05070d", 4, 10.5]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[3.5, 3, 2]} intensity={1.3} />
            <pointLight position={[-3.5, -2.2, 2.8]} intensity={1.8} color="#8ec5ff" />
            <SceneShapes progress={progress} />
            <Environment preset="city" />
          </Canvas>
        </div>

        <div className="scroll3d-overlay">
          <p className="scroll3d-kicker">Scroll-Reactive 3D</p>
          <h1 className="scroll3d-title">{activePhase.title}</h1>
          <p className="scroll3d-description">{activePhase.description}</p>

          <div className="scroll3d-meter" role="presentation" aria-hidden="true">
            <span style={{ transform: `scaleX(${Math.max(progress, 0.03)})` }} />
          </div>

          <p className="scroll3d-hint">Görgess lejjebb a jelenet transzformációjához.</p>
        </div>
      </div>
    </section>
  );
}
