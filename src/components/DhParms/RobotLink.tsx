import * as THREE from "three";

interface RobotLinkProps {
  start: [number, number, number];
  end: [number, number, number];
  radius?: number;
}

export const RobotLink = ({ start, end, radius = 0.05 }: RobotLinkProps) => {
  const direction = new THREE.Vector3().subVectors(
    new THREE.Vector3(...end),
    new THREE.Vector3(...start)
  );
  const length = direction.length();
  const position = new THREE.Vector3()
    .addVectors(new THREE.Vector3(...start), new THREE.Vector3(...end))
    .multiplyScalar(0.5);

  // 실린더를 방향에 맞게 회전
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize()
  );

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, length, 8]} />
      <meshStandardMaterial color="#888888" />
    </mesh>
  );
};
