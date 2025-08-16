"use client";

import { Text } from "@react-three/drei";

export default function CoordinateAxes() {
  return (
    <group>
      {/* X축 - 빨간색 */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, 5, 0, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff0000" linewidth={3} />
      </line>

      {/* Y축 - 초록색 */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, 0, 5, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ff00" linewidth={3} />
      </line>

      {/* Z축 - 파란색 */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, 0, 0, 5])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0000ff" linewidth={3} />
      </line>

      {/* X축 화살표 */}
      <mesh position={[5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.15, 0.5, 8]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>

      {/* Y축 화살표 */}
      <mesh position={[0, 5, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.15, 0.5, 8]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>

      {/* Z축 화살표 */}
      <mesh position={[0, 0, 5]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.15, 0.5, 8]} />
        <meshBasicMaterial color="#0000ff" />
      </mesh>

      {/* 축 레이블 */}
      <Text
        position={[5.5, 0, 0]}
        fontSize={0.5}
        color="#ff0000"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        X
      </Text>

      <Text
        position={[0, 5.5, 0]}
        fontSize={0.5}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        Y
      </Text>

      <Text
        position={[0, 0, 5.5]}
        fontSize={0.5}
        color="#0000ff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        Z
      </Text>

      {/* 원점 표시 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
