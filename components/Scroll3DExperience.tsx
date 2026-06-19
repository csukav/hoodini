"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Group } from "three";

const phases = [
  {
    title: "HOODINI",
    description: "Prémium streetwear, minden napra.",
  },
  {
    title: "CRAFTWORK",
    description: "Precíz varratok, szelektált anyagok.",
  },
  {
    title: "DETAILS",
    description: "A részletek teszik különlegessé.",
  },
  {
    title: "YOUR DROP",
    description: "Fedezd fel az aktuális kollekcót.",
  },
] as const;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(clamp01(max > 0 ? window.scrollY / max : 0));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
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

/* ── Hoodie 3D model ─────────────────────────────────────────────────── */

function HoodieModel({ progress }: { progress: number }) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const smooth = 1 - Math.exp(-delta * 3.5);

    // Continuous rotation, scroll speeds it up
    groupRef.current.rotation.y += delta * (0.28 + progress * 0.85);

    // Gentle vertical float
    const floatY = Math.sin(state.clock.elapsedTime * 0.55) * 0.09;
    groupRef.current.position.y += (floatY - groupRef.current.position.y) * smooth;

    // Scroll: slight forward tilt reveals hoodie back
    const targetRX = progress * 0.22;
    groupRef.current.rotation.x +=
      (targetRX - groupRef.current.rotation.x) * smooth;

    // Scroll: grow slightly
    const s = 0.91 + progress * 0.24;
    groupRef.current.scale.x += (s - groupRef.current.scale.x) * smooth;
    groupRef.current.scale.y += (s - groupRef.current.scale.y) * smooth;
    groupRef.current.scale.z += (s - groupRef.current.scale.z) * smooth;
  });

  return (
    <group ref={groupRef}>
      {/* ── BODY ── */}
      <RoundedBox args={[1.38, 1.52, 0.54]} radius={0.07} smoothness={4} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#111827" roughness={0.82} metalness={0.08} />
      </RoundedBox>

      {/* ── SHOULDER FILLS ── */}
      <mesh position={[-0.78, 0.52, 0]}>
        <sphereGeometry args={[0.27, 20, 20]} />
        <meshStandardMaterial color="#111827" roughness={0.82} metalness={0.08} />
      </mesh>
      <mesh position={[0.78, 0.52, 0]}>
        <sphereGeometry args={[0.27, 20, 20]} />
        <meshStandardMaterial color="#111827" roughness={0.82} metalness={0.08} />
      </mesh>

      {/* ── LEFT SLEEVE ── */}
      <group position={[-1.09, 0.37, 0]} rotation={[0, 0.1, 0.27]}>
        <mesh>
          <cylinderGeometry args={[0.215, 0.195, 1.05, 20]} />
          <meshStandardMaterial color="#111827" roughness={0.82} metalness={0.08} />
        </mesh>
        {/* left cuff */}
        <mesh position={[0, -0.58, 0]}>
          <cylinderGeometry args={[0.207, 0.207, 0.12, 20]} />
          <meshStandardMaterial color="#e9b44c" roughness={0.46} metalness={0.35}
            emissive="#7a4d10" emissiveIntensity={0.18} />
        </mesh>
      </group>

      {/* ── RIGHT SLEEVE ── */}
      <group position={[1.09, 0.37, 0]} rotation={[0, -0.1, -0.27]}>
        <mesh>
          <cylinderGeometry args={[0.215, 0.195, 1.05, 20]} />
          <meshStandardMaterial color="#111827" roughness={0.82} metalness={0.08} />
        </mesh>
        {/* right cuff */}
        <mesh position={[0, -0.58, 0]}>
          <cylinderGeometry args={[0.207, 0.207, 0.12, 20]} />
          <meshStandardMaterial color="#e9b44c" roughness={0.46} metalness={0.35}
            emissive="#7a4d10" emissiveIntensity={0.18} />
        </mesh>
      </group>

      {/* ── HOOD (outer dome) ── */}
      <mesh position={[0, 0.92, -0.11]} rotation={[0.14, 0, 0]}>
        <sphereGeometry args={[0.56, 36, 36, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
        <meshStandardMaterial color="#111827" roughness={0.82} metalness={0.08}
          side={THREE.DoubleSide} />
      </mesh>
      {/* hood inner lining (visible when rotated) */}
      <mesh position={[0, 0.92, -0.11]} rotation={[0.14, 0, 0]}>
        <sphereGeometry args={[0.52, 36, 36, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
        <meshStandardMaterial color="#1e2640" roughness={0.9} side={THREE.BackSide} />
      </mesh>

      {/* ── HOOD OPENING RIM ── */}
      <mesh position={[0, 0.72, 0.16]} rotation={[-0.36, 0, 0]}>
        <torusGeometry args={[0.36, 0.044, 14, 56, Math.PI * 1.62]} />
        <meshStandardMaterial color="#e9b44c" roughness={0.44} metalness={0.38}
          emissive="#7a4d10" emissiveIntensity={0.22} />
      </mesh>

      {/* ── COLLAR ── */}
      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.13, 28]} />
        <meshStandardMaterial color="#e9b44c" roughness={0.46} metalness={0.35}
          emissive="#7a4d10" emissiveIntensity={0.18} />
      </mesh>

      {/* ── KANGAROO POCKET ── */}
      <RoundedBox args={[0.76, 0.37, 0.055]} radius={0.026} position={[0, -0.19, 0.285]}>
        <meshStandardMaterial color="#e9b44c" roughness={0.52} metalness={0.28}
          emissive="#6b3e0a" emissiveIntensity={0.14} />
      </RoundedBox>
      {/* pocket centre seam */}
      <mesh position={[0, -0.19, 0.316]}>
        <boxGeometry args={[0.013, 0.35, 0.008]} />
        <meshStandardMaterial color="#0d1117" roughness={0.9} />
      </mesh>

      {/* ── BOTTOM HEM ── */}
      <mesh position={[0, -0.885, 0]}>
        <cylinderGeometry args={[0.71, 0.71, 0.1, 36]} />
        <meshStandardMaterial color="#e9b44c" roughness={0.48} metalness={0.35}
          emissive="#7a4d10" emissiveIntensity={0.18} />
      </mesh>

      {/* ── DRAWSTRINGS ── */}
      <mesh position={[-0.13, 0.41, 0.286]}>
        <cylinderGeometry args={[0.016, 0.016, 0.58, 8]} />
        <meshStandardMaterial color="#c8d4e8" roughness={0.54} metalness={0.44} />
      </mesh>
      <mesh position={[0.13, 0.41, 0.286]}>
        <cylinderGeometry args={[0.016, 0.016, 0.58, 8]} />
        <meshStandardMaterial color="#c8d4e8" roughness={0.54} metalness={0.44} />
      </mesh>
      {/* aglets (metal tips) */}
      <mesh position={[-0.13, 0.11, 0.286]}>
        <cylinderGeometry args={[0.022, 0.018, 0.065, 8]} />
        <meshStandardMaterial color="#e9b44c" roughness={0.32} metalness={0.7}
          emissive="#7a4d10" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0.13, 0.11, 0.286]}>
        <cylinderGeometry args={[0.022, 0.018, 0.065, 8]} />
        <meshStandardMaterial color="#e9b44c" roughness={0.32} metalness={0.7}
          emissive="#7a4d10" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

/* ── Scene wrapper ────────────────────────────────────────────────────── */

export default function Scroll3DExperience() {
  const progress = useScrollProgress();
  const activeIndex = Math.min(phases.length - 1, Math.floor(progress * phases.length));
  const activePhase = phases[activeIndex];

  return (
    <section className="scroll3d" aria-label="Interaktív 3D pulcsi bemutató">
      <div className="scroll3d-sticky">
        <div className="scroll3d-canvas-wrap" aria-hidden="true">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }}>
            <color attach="background" args={["#05070d"]} />
            <fog attach="fog" args={["#05070d", 5, 12]} />

            {/* Lighting tuned for fabric/clothing */}
            <ambientLight intensity={0.45} />
            <directionalLight position={[2, 4, 3]} intensity={1.6} color="#f8f0e8" />
            <directionalLight position={[-3, 1, -2]} intensity={0.55} color="#8ab4f8" />
            <pointLight position={[0, -1.5, 3.5]} intensity={0.9} color="#f2c96b" />
            <pointLight position={[0, 3.5, -1]} intensity={0.7} color="#e9b44c" />

            <HoodieModel progress={progress} />
            <Environment preset="city" />
          </Canvas>
        </div>

        <div className="scroll3d-overlay">
          <p className="scroll3d-kicker">Hoodini 3D Konfigurátor</p>
          <h1 className="scroll3d-title">{activePhase.title}</h1>
          <p className="scroll3d-description">{activePhase.description}</p>

          <div className="scroll3d-meter" role="presentation" aria-hidden="true">
            <span style={{ transform: `scaleX(${Math.max(progress, 0.03)})` }} />
          </div>

          <p className="scroll3d-hint">Görgess lejjebb a részletek felfedezéséhez.</p>
        </div>
      </div>
    </section>
  );
}
