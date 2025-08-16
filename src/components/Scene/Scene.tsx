"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Stats } from "@react-three/drei";
import RotatingCube from "./RotatingCube";
import CoordinateAxes from "./CoordinateAxes";
import { Suspense } from "react";

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [6, 6, 6],
        fov: 60,
        near: 0.1,
        far: 1000,
      }}
      style={{
        height: "600px",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        borderRadius: "8px",
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        {/* 조명 설정 */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* 3D 객체들 */}
        <RotatingCube />
        <CoordinateAxes />

        {/* 그리드 */}
        <Grid
          args={[20, 20]}
          cellColor="#333366"
          sectionColor="#4444aa"
          position={[0, -3, 0]}
          infiniteGrid={true}
          fadeDistance={30}
          fadeStrength={1}
        />

        {/* 컨트롤 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          dampingFactor={0.05}
          enableDamping={true}
          maxDistance={20}
          minDistance={3}
          maxPolarAngle={Math.PI / 2 + 0.3}
        />

        {/* 개발용 Stats (프로덕션에서는 제거) */}
        {process.env.NODE_ENV === "development" && <Stats />}
      </Suspense>
    </Canvas>
  );
}
