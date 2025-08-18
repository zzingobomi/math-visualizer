import React, { useMemo } from "react";
import { Quaternion, Vector3 } from "three";
import { Vector3Tuple } from "@/types/dhparams";

interface RobotLinkProps {
  start: Vector3Tuple;
  end: Vector3Tuple;
  radius?: number;
  color?: string;
}

export const RobotLink = React.memo(
  ({ start, end, radius = 0.05, color = "#888888" }: RobotLinkProps) => {
    const { position, quaternion, length } = useMemo(() => {
      const startVec = new Vector3(...start);
      const endVec = new Vector3(...end);
      const direction = new Vector3().subVectors(endVec, startVec);
      const length = direction.length();

      // 실린더를 방향에 맞게 회전
      const quaternion = new Quaternion();
      if (length > 0) {
        quaternion.setFromUnitVectors(
          new Vector3(0, 1, 0),
          direction.clone().normalize()
        );
      }

      const position = new Vector3()
        .addVectors(startVec, endVec)
        .multiplyScalar(0.5);

      return {
        position: position.toArray() as Vector3Tuple,
        quaternion,
        length,
      };
    }, [start, end]);

    if (length === 0) return null;

    return (
      <mesh position={position} quaternion={quaternion}>
        <cylinderGeometry args={[radius, radius, length, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
);
