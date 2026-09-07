import { Environment, Lightformer, PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import cartonAsset from "@/assets/models/vevra-cardboard_box_01.glb.asset.json";
import cartAsset from "@/assets/models/vevra-industrial_storage_cart.glb.asset.json";
import plasticAsset from "@/assets/models/vevra-plastic_crate_01.glb.asset.json";
import woodAsset from "@/assets/models/vevra-wooden_crate_01.glb.asset.json";

const MODEL_URLS = [cartonAsset.url, plasticAsset.url, cartAsset.url, woodAsset.url] as const;
const POSITIONS = [-4.35, -1.4, 1.55, 4.5] as const;

function PackagingModel({
  url,
  position,
  targetSize,
  active,
}: {
  url: string;
  position: [number, number, number];
  targetSize: number;
  active: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const object = useMemo(() => {
    const clone = scene.clone(true);
    const initialBounds = new THREE.Box3().setFromObject(clone);
    const size = initialBounds.getSize(new THREE.Vector3());
    const largest = Math.max(size.x, size.y, size.z) || 1;
    clone.scale.setScalar(targetSize / largest);
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    clone.position.set(-center.x, -bounds.min.y, -center.z);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene, targetSize]);

  useFrame((_, rawDelta) => {
    const node = group.current;
    if (!node) return;
    const delta = Math.min(rawDelta, 0.05);
    const desiredScale = active ? 1.08 : 0.82;
    const damping = 1 - Math.exp(-5 * delta);
    node.scale.lerp(new THREE.Vector3(desiredScale, desiredScale, desiredScale), damping);
    node.position.y = THREE.MathUtils.lerp(node.position.y, active ? 0.02 : -0.12, damping);
  });

  return (
    <group ref={group} position={position}>
      <primitive object={object} />
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
    group.position.x = THREE.MathUtils.lerp(group.position.x, -POSITIONS[activeIndex], damping);
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
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={6}
        shadow-camera-bottom={-3}
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
          <Suspense fallback={null}>
            <PackagingModel url={MODEL_URLS[0]} position={[POSITIONS[0], 0, 0]} targetSize={2.5} active={activeIndex === 0} />
            <PackagingModel url={MODEL_URLS[1]} position={[POSITIONS[1], 0, 0]} targetSize={2.65} active={activeIndex === 1} />
            <PackagingModel url={MODEL_URLS[2]} position={[POSITIONS[2], 0, 0]} targetSize={3.15} active={activeIndex === 2} />
            <PackagingModel url={MODEL_URLS[3]} position={[POSITIONS[3], 0, 0]} targetSize={2.55} active={activeIndex === 3} />
          </Suspense>
        </group>
      </PresentationControls>
    </>
  );
}

export default function VevraHeroScene({ activeIndex }: { activeIndex: number }) {
  const reducedMotion = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedMotion.current = media.matches;
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <Canvas
      aria-label="Interactive display of VEVRA corrugated, plastic, metal and wooden packaging systems"
      camera={{ position: [0, 2.45, 8.4], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      shadows
    >
      <Showroom activeIndex={activeIndex} reducedMotion={reducedMotion.current} />
    </Canvas>
  );
}

MODEL_URLS.forEach((url) => useGLTF.preload(url));