"use client";

import { Row, Col, Card, Typography, Space } from "antd";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import MatrixInputs from "@/components/Rotation/UI/MatrixInputs";
import RPYInputs from "@/components/Rotation/UI/RPYInputs";
import EulerInputs from "@/components/Rotation/UI/EulerInputs";
import ZYZInputs from "@/components/Rotation/UI/ZYZInputs";
import MatrixDisplay from "@/components/Rotation/UI/MatrixDisplay";

const { Title, Text } = Typography;

// Three.js 컴포넌트를 dynamic import로 로드 (SSR 방지)
const Scene = dynamic(() => import("@/components/Rotation/Scene"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center bg-gray-900 rounded-lg">
      <Text>Loading 3D Scene...</Text>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="p-6 min-h-screen bg-gray-950">
      <Space direction="vertical" size="large" className="w-full">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <Title level={1} className="text-white mb-2">
            3D Rotation Visualizer
          </Title>
          <Text type="secondary" className="text-base">
            Interactive tool for understanding transformation matrices, RPY,
            Euler angles, and ZYZ rotations
          </Text>
        </div>

        {/* 메인 레이아웃 */}
        <Row gutter={[24, 24]} className="min-h-[calc(100vh-200px)]">
          {/* 3D Scene */}
          <Col xs={24} lg={16} className="min-h-[600px]">
            <Card
              title="3D Visualization"
              className="h-full flex flex-col"
              bodyStyle={{ flex: 1, padding: "16px" }}
            >
              <Suspense
                fallback={
                  <div className="h-[600px] flex items-center justify-center">
                    <Text>Loading...</Text>
                  </div>
                }
              >
                <Scene />
              </Suspense>
            </Card>
          </Col>

          {/* 컨트롤 패널 */}
          <Col xs={24} lg={8}>
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden pr-2">
              <Space direction="vertical" size="middle" className="w-full">
                {/* Matrix Display */}
                <Card
                  title="Current Rotation Matrix"
                  size="small"
                  variant="borderless"
                >
                  <MatrixDisplay />
                </Card>

                {/* Matrix Direct Input */}
                <Card
                  title="Transformation Matrix"
                  size="small"
                  variant="borderless"
                >
                  <MatrixInputs />
                </Card>

                {/* RPY Controls */}
                <Card title="Roll-Pitch-Yaw" size="small" variant="borderless">
                  <RPYInputs />
                </Card>

                {/* Euler Controls */}
                <Card
                  title="XYZ Euler Angles"
                  size="small"
                  variant="borderless"
                >
                  <EulerInputs />
                </Card>

                {/* ZYZ Controls */}
                <Card
                  title="ZYZ Euler Angles"
                  size="small"
                  variant="borderless"
                >
                  <ZYZInputs />
                </Card>
              </Space>
            </div>
          </Col>
        </Row>

        {/* 범례/도움말 */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Color Legend" size="small" variant="borderless">
              <Space direction="vertical" size="small">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-1 bg-red-500 rounded-sm" />
                  <Text>X-Axis (Red)</Text>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-1 bg-green-500 rounded-sm" />
                  <Text>Y-Axis (Green)</Text>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-1 bg-blue-500 rounded-sm" />
                  <Text>Z-Axis (Blue)</Text>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Usage Tips" size="small" variant="borderless">
              <Space direction="vertical" size="small">
                <Text>• Drag to rotate the camera view</Text>
                <Text>• Scroll to zoom in/out</Text>
                <Text>
                  • Adjust any rotation values to see real-time updates
                </Text>
                <Text>• Compare different rotation representations</Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
