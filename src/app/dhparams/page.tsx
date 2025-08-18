"use client";

import React, { Suspense } from "react";
import { Row, Col, Card, Typography, Space } from "antd";
import { useDHParameterStore } from "@/stores/dhParameterStore";
import { useForwardKinematics } from "@/hooks/useForwardKinematics";
import { Scene } from "@/components/DhParms/3D/Scene";
import { MatrixDisplay } from "@/components/DhParms/UI/MatrixDisplay";
import ColorLegend from "@/components/DhParms/UI/ColorLegend";
import DHConventionSelector from "@/components/DhParms/UI/DHConventionSelector";
import JointControls from "@/components/DhParms/UI/JointControls";
import UsageGuide from "@/components/DhParms/UI/UsageGuide";

const { Title, Text } = Typography;

export default function DHParameterVisualizer() {
  const { joints, convention } = useDHParameterStore();
  const forwardKinematics = useForwardKinematics(joints, convention);

  return (
    <div className="p-6 min-h-screen">
      <Space direction="vertical" size="large" className="w-full">
        {/* 헤더 */}
        <header className="text-center mb-6">
          <Title level={1} className="mb-2">
            DH Parameter Visualizer
          </Title>
          <Text type="secondary" className="text-base">
            로봇 관절의 Denavit-Hartenberg 매개변수 시각화 도구
          </Text>
        </header>

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
                <Scene />
              </Suspense>
            </Card>
          </Col>

          {/* 컨트롤 패널 */}
          <Col xs={24} lg={8}>
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden pr-2">
              <Space direction="vertical" size="middle" className="w-full">
                {/* DH Convention */}
                <DHConventionSelector />

                {/* Joint Controls */}
                <Card title="관절 매개변수" size="small" variant="borderless">
                  <JointControls />
                </Card>

                {/* Matrix Display */}
                <Card title="변환 행렬" size="small" variant="borderless">
                  <MatrixDisplay matrices={forwardKinematics} />
                </Card>
              </Space>
            </div>
          </Col>
        </Row>

        {/* 하단 정보 패널 */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <ColorLegend />
          </Col>
          <Col xs={24} md={12}>
            <UsageGuide />
          </Col>
        </Row>
      </Space>
    </div>
  );
}
