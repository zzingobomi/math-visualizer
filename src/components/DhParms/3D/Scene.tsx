import React from "react";
import { useDHParameterStore } from "@/stores/dhParameterStore";
import { useForwardKinematics } from "@/hooks/useForwardKinematics";
import { CoordinateFrame } from "./CoordinateFrame";
import { RobotLink } from "./RobotLink";
import { Vector3Tuple, Matrix3x3 } from "@/types/dhparams";

const JOINT_COLORS = {
  base: "#ff6b6b",
  joint: "#4ecdc4",
} as const;

const LIGHTING_CONFIG = {
  ambient: 0.6,
  directional: 0.8,
  directionalPosition: [10, 10, 5] as Vector3Tuple,
} as const;

const GRID_CONFIG = {
  size: 10,
  divisions: 20,
  colorCenterLine: "#444444",
  colorGrid: "#222222",
} as const;

export const Scene: React.FC = React.memo(() => {
  const { joints, convention } = useDHParameterStore();
  const { positions, matrices } = useForwardKinematics(joints, convention);

  return (
    <>
      {/* 조명 */}
      <ambientLight intensity={LIGHTING_CONFIG.ambient} />
      <directionalLight
        position={LIGHTING_CONFIG.directionalPosition}
        intensity={LIGHTING_CONFIG.directional}
      />

      {/* 베이스 좌표계 */}
      <CoordinateFrame position={[0, 0, 0]} scale={0.8} label="Base" />

      {/* 관절별 좌표계 */}
      {matrices.map((matrix, index) => {
        const position: Vector3Tuple = [
          matrix.get([0, 3]) as number,
          matrix.get([1, 3]) as number,
          matrix.get([2, 3]) as number,
        ];

        const rotation: Matrix3x3 = [
          [matrix.get([0, 0]), matrix.get([0, 1]), matrix.get([0, 2])],
          [matrix.get([1, 0]), matrix.get([1, 1]), matrix.get([1, 2])],
          [matrix.get([2, 0]), matrix.get([2, 1]), matrix.get([2, 2])],
        ] as Matrix3x3;

        return (
          <CoordinateFrame
            key={index}
            position={position}
            rotation={rotation}
            scale={0.6}
            label={`J${index + 1}`}
          />
        );
      })}

      {/* 로봇 링크 */}
      {positions.slice(0, -1).map((start, index) => (
        <RobotLink key={index} start={start} end={positions[index + 1]} />
      ))}

      {/* 관절 (구) */}
      {positions.map((pos, index) => (
        <mesh key={index} position={pos}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial
            color={index === 0 ? JOINT_COLORS.base : JOINT_COLORS.joint}
          />
        </mesh>
      ))}

      {/* 바닥 그리드 */}
      <gridHelper
        args={[
          GRID_CONFIG.size,
          GRID_CONFIG.divisions,
          GRID_CONFIG.colorCenterLine,
          GRID_CONFIG.colorGrid,
        ]}
      />
    </>
  );
});
