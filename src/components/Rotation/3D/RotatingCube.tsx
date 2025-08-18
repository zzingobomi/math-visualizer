"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BoxGeometry, Mesh, Color, BufferAttribute } from "three";
import { useRotationStore } from "@/stores/rotationStore";


export default function RotatingCube() {
  const meshRef = useRef<Mesh>(null);
  const { rotationMatrix4 } = useRotationStore();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.matrix.copy(rotationMatrix4);
      meshRef.current.matrixAutoUpdate = false;
    }
  });

  // 각 면에 색상을 적용한 geometry 생성
  const coloredGeometry = useMemo(() => {
    const geometry = new BoxGeometry(2, 2, 2);
    const colors = new Float32Array(144); // 24 vertices * 3 colors per vertex * 2 triangles per face

    // 각 면의 색상 (오른쪽, 왼쪽, 위, 아래, 앞, 뒤)
    const faceColors = [
      new Color("#ff6666"), // X+ (오른쪽) - 연한 빨강
      new Color("#cc4444"), // X- (왼쪽) - 진한 빨강
      new Color("#66ff66"), // Y+ (위) - 연한 초록
      new Color("#44cc44"), // Y- (아래) - 진한 초록
      new Color("#6666ff"), // Z+ (앞) - 연한 파랑
      new Color("#4444cc"), // Z- (뒤) - 진한 파랑
    ];

    // 각 면(6개)에 대해 색상 적용
    for (let face = 0; face < 6; face++) {
      const color = faceColors[face];
      // 각 면은 4개의 vertex를 가지고 있음
      for (let vertex = 0; vertex < 4; vertex++) {
        const index = (face * 4 + vertex) * 3;
        colors[index] = color.r;
        colors[index + 1] = color.g;
        colors[index + 2] = color.b;
      }
    }

    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    return geometry;
  }, []);

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <primitive object={coloredGeometry} />
      <meshStandardMaterial
        vertexColors={true}
        transparent
        opacity={0.8}
        roughness={0.3}
        metalness={0.1}
      />

      {/* 큐브 모서리 표시 */}
      <lineSegments>
        <edgesGeometry args={[new BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.8} transparent />
      </lineSegments>

      {/* 각 축 방향 표시용 작은 큐브들 */}
      {/* X축 방향 (빨간색) */}
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>

      {/* Y축 방향 (초록색) */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>

      {/* Z축 방향 (파란색) */}
      <mesh position={[0, 0, 1.2]}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshBasicMaterial color="#0000ff" />
      </mesh>
    </mesh>
  );
}
