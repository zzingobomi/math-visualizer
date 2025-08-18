"use client";

import { Suspense } from "react";
import { Row, Col, Card, Typography, Space } from "antd";
import MatrixInputs from "@/components/Rotation/UI/MatrixInputs";
import RPYInputs from "@/components/Rotation/UI/RPYInputs";
import EulerInputs from "@/components/Rotation/UI/EulerInputs";
import ZYZInputs from "@/components/Rotation/UI/ZYZInputs";
import MatrixDisplay from "@/components/Rotation/UI/MatrixDisplay";
import Scene from "@/components/Rotation/3D/Scene";

const { Title, Text } = Typography;

export default function RotationVisualizer() {
  return (
    <div className="p-6 min-h-screen bg-gray-950">
      <Space direction="vertical" size="large" className="w-full">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <Title level={1} className="text-white mb-2">
            3D Rotation Visualizer
          </Title>
          <Text type="secondary" className="text-base">
            변환 행렬, RPY, 오일러 각, ZYZ 회전
          </Text>
        </div>

        {/* 메인 레이아웃 */}
        <Row gutter={[24, 24]} className="min-h-[calc(100vh-200px)]">
          {/* 3D Scene */}
          <Col xs={24} lg={16} className="min-h-[600px]">
            <Card
              title="3D Visualization"
              className="h-full flex flex-col"
              classNames={{
                body: "flex-1 p-0",
              }}
            >
              <Suspense
                fallback={
                  <div className="h-full flex items-center justify-center">
                    <Text>Loading...</Text>
                  </div>
                }
              >
                <div className="h-full w-full">
                  <Scene />
                </div>
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
            <Card title="사용 팁" size="small" variant="borderless">
              <Space direction="vertical" size="small">
                <Text>• 드래그하여 카메라 시점을 회전할 수 있습니다</Text>
                <Text>• 스크롤로 확대/축소 가능합니다</Text>
                <Text>• 회전 값을 조정하면 실시간으로 업데이트됩니다</Text>
                <Text>• 서로 다른 회전 표현을 비교해보세요</Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
