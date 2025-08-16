import React, { useState, useRef, useMemo, useEffect } from "react";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";
import * as math from "mathjs";

interface CoordinateFrameProps {
  position: [number, number, number];
  rotation?: number[][];
  scale?: number;
  label: string;
}

export const CoordinateFrame = ({
  position,
  rotation,
  scale = 0.5,
  label,
}: CoordinateFrameProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && rotation) {
      groupRef.current.setRotationFromMatrix(
        new THREE.Matrix4().fromArray(rotation.flat())
      );
    }
  }, [rotation]);

  return (
    <group ref={groupRef} position={position}>
      {/* X축 - 빨간색 */}
      <Line
        points={[
          [0, 0, 0],
          [scale, 0, 0],
        ]}
        color="red"
        lineWidth={3}
      />
      <mesh position={[scale, 0, 0]}>
        <coneGeometry args={[0.05, 0.15]} />
        <meshBasicMaterial color="red" />
      </mesh>

      {/* Y축 - 초록색 */}
      <Line
        points={[
          [0, 0, 0],
          [0, scale, 0],
        ]}
        color="green"
        lineWidth={3}
      />
      <mesh position={[0, scale, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.05, 0.15]} />
        <meshBasicMaterial color="green" />
      </mesh>

      {/* Z축 - 파란색 */}
      <Line
        points={[
          [0, 0, 0],
          [0, 0, scale],
        ]}
        color="blue"
        lineWidth={3}
      />
      <mesh position={[0, 0, scale]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.05, 0.15]} />
        <meshBasicMaterial color="blue" />
      </mesh>

      {/* 라벨 */}
      <Text
        position={[0, 0, scale + 0.3]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};
