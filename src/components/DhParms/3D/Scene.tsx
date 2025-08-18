import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { matrix } from "mathjs";
import { useDHParameterStore } from "@/stores/dhParameterStore";
import { useForwardKinematics } from "@/hooks/useForwardKinematics";
import { CoordinateFrame } from "./CoordinateFrame";
import { RobotLink } from "./RobotLink";
import { Vector3Tuple, Matrix3x3 } from "@/types/dhparams";
import DHParameterTable from "../UI/DHParameterTable";

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
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        {/* 조명 */}
        <ambientLight intensity={LIGHTING_CONFIG.ambient} />
        <directionalLight
          position={LIGHTING_CONFIG.directionalPosition}
          intensity={LIGHTING_CONFIG.directional}
        />

        {/* 베이스 좌표계 */}
        <CoordinateFrame position={[0, 0, 0]} scale={0.8} label="Base" />

        {/* 관절별 좌표계 */}
        {matrices.map((mat, index) => {
          const position: Vector3Tuple = [
            mat.get([0, 3]) as number,
            mat.get([1, 3]) as number,
            mat.get([2, 3]) as number,
          ];

          const rotation: Matrix3x3 = matrix([
            [mat.get([0, 0]), mat.get([0, 1]), mat.get([0, 2])],
            [mat.get([1, 0]), mat.get([1, 1]), mat.get([1, 2])],
            [mat.get([2, 0]), mat.get([2, 1]), mat.get([2, 2])],
          ]) as Matrix3x3;

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

        {/* 컨트롤 */}
        <OrbitControls enablePan enableZoom enableRotate />

        {process.env.NODE_ENV === "development" && <Stats />}
      </Canvas>

      {/* DH Parameter 테이블 오버레이 */}
      <DHParameterTable />
    </div>
  );
});
