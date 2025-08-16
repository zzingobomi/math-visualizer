"use client";

import { Row, Col, Card, Typography, Space } from "antd";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import MatrixInputs from "@/components/UI/MatrixInputs";
import RPYInputs from "@/components/UI/RPYInputs";
import EulerInputs from "@/components/UI/EulerInputs";
import ZYZInputs from "@/components/UI/ZYZInputs";
import MatrixDisplay from "@/components/UI/MatrixDisplay";

const { Title, Text } = Typography;

// Three.js 컴포넌트를 dynamic import로 로드 (SSR 방지)
const Scene = dynamic(() => import("@/components/Scene/Scene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1a1a",
        borderRadius: "8px",
      }}
    >
      <Text>Loading 3D Scene...</Text>
    </div>
  ),
});

export default function Home() {
  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        background: "#0a0a0a",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Title level={1} style={{ color: "#ffffff", marginBottom: "8px" }}>
            3D Rotation Visualizer
          </Title>
          <Text type="secondary" style={{ fontSize: "16px" }}>
            Interactive tool for understanding transformation matrices, RPY,
            Euler angles, and ZYZ rotations
          </Text>
        </div>

        {/* 메인 레이아웃 */}
        <Row gutter={[24, 24]}>
          {/* 3D Scene */}
          <Col xs={24} lg={16}>
            <Card
              title="3D Visualization"
              style={{ height: "100%", padding: "16px" }}
            >
              <Suspense
                fallback={
                  <div
                    style={{
                      height: "600px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
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
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
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
              <Card title="XYZ Euler Angles" size="small" variant="borderless">
                <EulerInputs />
              </Card>

              {/* ZYZ Controls */}
              <Card title="ZYZ Euler Angles" size="small" variant="borderless">
                <ZYZInputs />
              </Card>
            </Space>
          </Col>
        </Row>

        {/* 범례/도움말 */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Color Legend" size="small" variant="borderless">
              <Space direction="vertical" size="small">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "4px",
                      background: "#ff0000",
                      borderRadius: "2px",
                    }}
                  />
                  <Text>X-Axis (Red)</Text>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "4px",
                      background: "#00ff00",
                      borderRadius: "2px",
                    }}
                  />
                  <Text>Y-Axis (Green)</Text>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "4px",
                      background: "#0000ff",
                      borderRadius: "2px",
                    }}
                  />
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
