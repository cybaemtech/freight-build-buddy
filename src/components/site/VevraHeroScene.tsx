import { Environment, Lightformer, PresentationControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, type ReactNode, useMemo, useRef } from "react";
import * as THREE from "three";

const POSITIONS = [-4.35, -1.4, 1.55, 4.5] as const;

/* ================= 3D PROCEDURAL PACKAGING MODELS ================= */

function CardboardBoxModel() {
  return (
    <group>
      {/* Main Box */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <boxGeometry args={[2.2, 1.8, 1.8]} />
        <meshStandardMaterial color="#c29b68" roughness={0.8} metalness={0.05} />
      </mesh>
      {/* Box Edges / Seams */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[2.22, 1.82, 1.82]} />
        <meshStandardMaterial color="#a07a4a" wireframe opacity={0.15} transparent />
      </mesh>
      {/* Packing Tape */}
      <mesh position={[0, 2.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 1.8]} />
        <meshStandardMaterial color="#e5c398" roughness={0.4} />
      </mesh>
      {/* VEVRA Label Badge */}
      <mesh position={[0, 1.1, 0.91]}>
        <planeGeometry args={[0.8, 0.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.1, 0.915]}>
        <planeGeometry args={[0.7, 0.12]} />
        <meshStandardMaterial color="#dc2738" />
      </mesh>
    </group>
  );
}

function PlasticCrateModel() {
  return (
    <group position={[0, 0.85, 0]}>
      {/* Outer Shell */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.5, 1.7]} />
        <meshStandardMaterial color="#0d2342" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Inner Rim Accent */}
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[2.45, 0.12, 1.75]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.2} metalness={0.4} />
      </mesh>
      {/* Handles */}
      <mesh position={[-1.21, 0.2, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.6]} />
        <meshStandardMaterial color="#050d1a" />
      </mesh>
      <mesh position={[1.21, 0.2, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.6]} />
        <meshStandardMaterial color="#050d1a" />
      </mesh>
      {/* Grid Ribs */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.42, 1.3, 1.72]} />
        <meshStandardMaterial color="#3b82f6" wireframe opacity={0.25} transparent />
      </mesh>
    </group>
  );
}

function IndustrialCartModel() {
  return (
    <group position={[0, 0.9, 0]}>
      {/* Base Chassis */}
      <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[2.8, 0.2, 1.9]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.8} />
      </mesh>
      {/* Corner Posts */}
      {[-1.3, 1.3].map((x) =>
        [-0.85, 0.85].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.9, z]}>
            <cylinderGeometry args={[0.04, 0.04, 1.6, 8]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.9} />
          </mesh>
        ))
      )}
      {/* Mesh Cage Walls */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[2.75, 1.5, 1.85]} />
        <meshStandardMaterial color="#64748b" wireframe metalness={0.7} />
      </mesh>
      {/* Wheels */}
      {[-1.1, 1.1].map((x) =>
        [-0.7, 0.7].map((z) => (
          <mesh key={`w-${x}-${z}`} position={[x, -0.15, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}

function WoodenCrateModel() {
  return (
    <group position={[0, 0.95, 0]}>
      {/* Main Wood Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.6, 1.6]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.85} metalness={0.0} />
      </mesh>
      {/* Horizontal Planks */}
      {[-0.5, 0, 0.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0.81]}>
          <boxGeometry args={[2.22, 0.35, 0.02]} />
          <meshStandardMaterial color="#6d421e" roughness={0.9} />
        </mesh>
      ))}
      {/* Corner Braces */}
      {[-1.05, 1.05].map((x) => (
        <mesh key={x} position={[x, 0, 0.82]}>
          <boxGeometry args={[0.15, 1.62, 0.02]} />
          <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function PackagingItem({
  index,
  position,
  active,
}: {
  index: number;
  position: [number, number, number];
  active: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, rawDelta) => {
    const node = group.current;
    if (!node) return;
    const delta = Math.min(rawDelta, 0.05);
    const desiredScale = active ? 1.08 : 0.82;
    const damping = 1 - Math.exp(-5 * delta);
    node.scale.lerp(new THREE.Vector3(desiredScale, desiredScale, desiredScale), damping);
    node.position.y = THREE.MathUtils.lerp(node.position.y, active ? 0.05 : -0.12, damping);
    if (active) {
      node.rotation.y += delta * 0.3;
    } else {
      node.rotation.y = THREE.MathUtils.lerp(node.rotation.y, 0, damping);
    }
  });

  return (
    <group ref={group} position={position}>
      {index === 0 && <CardboardBoxModel />}
      {index === 1 && <PlasticCrateModel />}
      {index === 2 && <IndustrialCartModel />}
      {index === 3 && <WoodenCrateModel />}
    </group>
  );
}

function Showroom({ activeIndex, reducedMotion }: { activeIndex: number; reducedMotion: boolean }) {
  const carousel = useRef<THREE.Group>(null);
  const scratch = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, rawDelta) => {
    const group = carousel.current;
    if (!group) return;
    const delta = Math.min(rawDelta, 0.05);
    const damping = 1 - Math.exp(-4.5 * delta);
    const targetPosition = POSITIONS[activeIndex] ?? POSITIONS[0];
    group.position.x = THREE.MathUtils.lerp(group.position.x, -targetPosition, damping);
    if (!reducedMotion) {
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, state.pointer.x * 0.035, damping);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -state.pointer.y * 0.018, damping);
    }
    scratch.set(state.pointer.x * 0.12, 2.45 + state.pointer.y * 0.06, 8.4);
    state.camera.position.lerp(scratch, reducedMotion ? 1 : 1 - Math.exp(-2.5 * delta));
    state.camera.lookAt(0, 1.1, 0);
  });

  return (
    <>
      <color attach="background" args={["#0d2342"]} />
      <fog attach="fog" args={["#0d2342", 10, 18]} />
      <hemisphereLight args={["#f5f8ff", "#203149", 1.7]} />
      <directionalLight
        castShadow
        color="#ffffff"
        intensity={3.2}
        position={[-3, 7, 5]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight color="#dc2738" intensity={2.2} position={[6, 2, 1]} />
      <Environment resolution={128}>
        <Lightformer intensity={2.5} position={[0, 6, -2]} scale={[10, 4, 1]} />
        <Lightformer intensity={1.2} color="#b8c9df" position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer intensity={1.1} color="#dc2738" position={[6, 1, 1]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
      </Environment>

      <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.38}>
        <planeGeometry args={[32, 18]} />
        <meshStandardMaterial color="#dfe7f0" roughness={0.72} metalness={0.08} />
      </mesh>
      <gridHelper args={[28, 28, "#55718f", "#2d4664"]} position={[0, -0.37, 0]} />

      <PresentationControls
        global
        enabled={!reducedMotion}
        cursor
        snap
        speed={0.55}
        zoom={0.96}
        rotation={[0, 0, 0]}
        polar={[-0.08, 0.12]}
        azimuth={[-0.16, 0.16]}
      >
        <group ref={carousel}>
          {POSITIONS.map((pos, idx) => (
            <PackagingItem key={idx} index={idx} position={[pos, 0, 0]} active={activeIndex === idx} />
          ))}
        </group>
      </PresentationControls>
    </>
  );
}

class ThreeErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  override state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-brand-blue-dark text-white p-6 text-center">
          <div className="max-w-md">
            <h3 className="text-xl font-bold">VEVRA 3D Packaging Ecosystem</h3>
            <p className="mt-2 text-sm text-white/70">
              Interactive 3D preview for Corrugated, Plastic, Metal &amp; Wooden Packaging Solutions.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function VevraHeroScene({ activeIndex }: { activeIndex: number }) {
  return (
    <ThreeErrorBoundary>
      <Canvas
        aria-label="Interactive display of VEVRA corrugated, plastic, metal and wooden packaging systems"
        camera={{ position: [0, 2.45, 8.4], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        shadows
      >
        <Showroom activeIndex={activeIndex} reducedMotion={false} />
      </Canvas>
    </ThreeErrorBoundary>
  );
}