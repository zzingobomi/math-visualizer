import React, { useMemo } from "react";
import { Billboard, Text } from "@react-three/drei";
import { MathNumericType } from "mathjs";
import { Matrix4, Vector3 } from "three";
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

// mathjs 타입 안전하게 number로 변환
function toNumber(val: MathNumericType): number {
  if (typeof val === "number") return val;
  if (typeof val === "bigint") return Number(val);
  return (val as any).valueOf();
}

export const CoordinateFrame = React.memo(
  ({ position, scale = 1, rotation, label }: CoordinateFrameProps) => {
    const rotationMatrix = useMemo(() => {
      if (!rotation) return new Matrix4().identity();

      const x = new Vector3(
        toNumber(rotation.get([0, 0])),
        toNumber(rotation.get([1, 0])),
        toNumber(rotation.get([2, 0]))
      );
      const y = new Vector3(
        toNumber(rotation.get([0, 1])),
        toNumber(rotation.get([1, 1])),
        toNumber(rotation.get([2, 1]))
      );
      const z = new Vector3(
        toNumber(rotation.get([0, 2])),
        toNumber(rotation.get([1, 2])),
        toNumber(rotation.get([2, 2]))
      );

      return new Matrix4().makeBasis(x, y, z);
    }, [rotation]);

    const axisRadius = AXIS_CONFIG.radius * scale;
    const coneRadius = AXIS_CONFIG.coneRadius * scale;
    const coneHeight = AXIS_CONFIG.coneHeight * scale;

    return (
      <group position={position}>
        <group matrix={rotationMatrix} matrixAutoUpdate={false}>
          {/* X축 */}
          <mesh position={[scale / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[axisRadius, axisRadius, scale, 8]} />
            <meshStandardMaterial color={AXIS_COLORS.x} />
          </mesh>
          <mesh position={[scale, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[coneRadius, coneHeight, 8]} />
            <meshStandardMaterial color={AXIS_COLORS.x} />
          </mesh>

          {/* Y축 */}
          <mesh position={[0, scale / 2, 0]}>
            <cylinderGeometry args={[axisRadius, axisRadius, scale, 8]} />
            <meshStandardMaterial color={AXIS_COLORS.y} />
          </mesh>
          <mesh position={[0, scale, 0]}>
            <coneGeometry args={[coneRadius, coneHeight, 8]} />
            <meshStandardMaterial color={AXIS_COLORS.y} />
          </mesh>

          {/* Z축 */}
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
              fontSize={0.2 * scale}
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
