import { useMemo } from "react";
import * as math from "mathjs";
import { calculateTransformMatrix, DHParams } from "@/types/dhparams";
import { CoordinateFrame } from "./CoordinateFrame";
import { RobotLink } from "./RobotLink";

interface SceneProps {
  joints: DHParams[];
  isModified: boolean;
}

export const Scene = ({ joints, isModified }: SceneProps) => {
  // Forward Kinematics 계산
  const { positions, matrices } = useMemo(() => {
    const positions: [number, number, number][] = [[0, 0, 0]];
    const matrices: math.Matrix[] = [];
    let currentMatrix = math.identity(4) as math.Matrix;

    joints.forEach((joint, index) => {
      const T = calculateTransformMatrix(joint, isModified);
      currentMatrix = math.multiply(currentMatrix, T) as math.Matrix;
      matrices.push(currentMatrix.clone() as math.Matrix);

      // 위치 추출
      const pos: [number, number, number] = [
        currentMatrix.get([0, 3]) as number,
        currentMatrix.get([1, 3]) as number,
        currentMatrix.get([2, 3]) as number,
      ];
      positions.push(pos);
    });

    return { positions, matrices };
  }, [joints, isModified]);

  return (
    <>
      {/* 조명 */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      {/* 베이스 좌표계 */}
      <CoordinateFrame position={[0, 0, 0]} scale={0.8} label="Base" />

      {/* 관절별 좌표계 */}
      {matrices.map((matrix, index) => {
        const position: [number, number, number] = [
          matrix.get([0, 3]),
          matrix.get([1, 3]),
          matrix.get([2, 3]),
        ];

        const rotation = [
          [matrix.get([0, 0]), matrix.get([0, 1]), matrix.get([0, 2])],
          [matrix.get([1, 0]), matrix.get([1, 1]), matrix.get([1, 2])],
          [matrix.get([2, 0]), matrix.get([2, 1]), matrix.get([2, 2])],
        ];

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
          <meshStandardMaterial color={index === 0 ? "#ff6b6b" : "#4ecdc4"} />
        </mesh>
      ))}

      {/* 바닥 그리드 */}
      <gridHelper args={[10, 20, "#444444", "#222222"]} />
    </>
  );
};
