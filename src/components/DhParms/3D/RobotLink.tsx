import React, { useMemo } from "react";
import * as THREE from "three";
import { Vector3Tuple } from "@/types/dhparams";

interface RobotLinkProps {
  start: Vector3Tuple;
  end: Vector3Tuple;
  radius?: number;
  color?: string;
}

export const RobotLink: React.FC<RobotLinkProps> = React.memo(
  ({ start, end, radius = 0.05, color = "#888888" }) => {
    const { position, quaternion, length } = useMemo(() => {
      const startVec = new THREE.Vector3(...start);
      const endVec = new THREE.Vector3(...end);
      const direction = new THREE.Vector3().subVectors(endVec, startVec);
      const length = direction.length();
      const position = new THREE.Vector3()
        .addVectors(startVec, endVec)
        .multiplyScalar(0.5);

      // 실린더를 방향에 맞게 회전
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
      );

      return {
        position: position.toArray() as Vector3Tuple,
        quaternion,
        length,
      };
    }, [start, end]);

    return (
      <mesh position={position} quaternion={quaternion}>
        <cylinderGeometry args={[radius, radius, length, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
);
