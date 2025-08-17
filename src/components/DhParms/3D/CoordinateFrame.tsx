import React from "react";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { Vector3Tuple, Matrix3x3 } from "@/types/dhparams";

interface CoordinateFrameProps {
  position: Vector3Tuple;
  scale?: number;
  rotation?: Matrix3x3;
  label?: string;
}

const AXIS_COLORS = {
  x: "#ff6b6b",
  y: "#52c41a",
  z: "#4dabf7",
} as const;

const AXIS_CONFIG = {
  radius: 0.02,
  coneRadius: 0.05,
  coneHeight: 0.15,
} as const;

export const CoordinateFrame: React.FC<CoordinateFrameProps> = React.memo(
  ({ position, scale = 1, rotation, label }) => {
    const rotationMatrix = rotation
      ? new THREE.Matrix4().makeBasis(
          new THREE.Vector3(rotation[0][0], rotation[1][0], rotation[2][0]),
          new THREE.Vector3(rotation[0][1], rotation[1][1], rotation[2][1]),
          new THREE.Vector3(rotation[0][2], rotation[1][2], rotation[2][2])
        )
      : new THREE.Matrix4().identity();

    const axisRadius = AXIS_CONFIG.radius * scale;
    const coneRadius = AXIS_CONFIG.coneRadius * scale;
    const coneHeight = AXIS_CONFIG.coneHeight * scale;

    return (
      <group position={position}>
        <group matrix={rotationMatrix} matrixAutoUpdate={false}>
          {/* X축 - 빨강 */}
          <mesh position={[scale / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[axisRadius, axisRadius, scale, 8]} />
            <meshStandardMaterial color={AXIS_COLORS.x} />
          </mesh>
          <mesh position={[scale, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[coneRadius, coneHeight, 8]} />
            <meshStandardMaterial color={AXIS_COLORS.x} />
          </mesh>

          {/* Y축 - 초록 */}
          <mesh position={[0, scale / 2, 0]}>
            <cylinderGeometry args={[axisRadius, axisRadius, scale, 8]} />
            <meshStandardMaterial color={AXIS_COLORS.y} />
          </mesh>
          <mesh position={[0, scale, 0]}>
            <coneGeometry args={[coneRadius, coneHeight, 8]} />
            <meshStandardMaterial color={AXIS_COLORS.y} />
          </mesh>

          {/* Z축 - 파랑 */}
          <mesh position={[0, 0, scale / 2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[axisRadius, axisRadius, scale, 8]} />
            <meshStandardMaterial color={AXIS_COLORS.z} />
          </mesh>
          <mesh position={[0, 0, scale]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[coneRadius, coneHeight, 8]} />
            <meshStandardMaterial color={AXIS_COLORS.z} />
          </mesh>
        </group>

        {/* 라벨 */}
        {label && (
          <Billboard>
            <Text
              position={[0, scale + 0.3, 0]}
              fontSize={0.2}
              color="#333"
              anchorX="center"
              anchorY="middle"
            >
              {label}
            </Text>
          </Billboard>
        )}
      </group>
    );
  }
);
