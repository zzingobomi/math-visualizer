"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BoxGeometry, Mesh } from "three";
import { useRotationStore } from "@/store/rotationStore";

export default function RotatingCube() {
  const meshRef = useRef<Mesh>(null);
  const { rotationMatrix4 } = useRotationStore();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.matrix.copy(rotationMatrix4);
      meshRef.current.matrixAutoUpdate = false;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#ff6b35"
        transparent
        opacity={0.8}
        roughness={0.3}
        metalness={0.1}
      />

      {/* 큐브 모서리 표시 */}
      <lineSegments>
        <edgesGeometry args={[new BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.6} transparent />
      </lineSegments>
    </mesh>
  );
}
