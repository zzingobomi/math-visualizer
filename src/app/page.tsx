"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Typography, Row, Col, Button } from "antd";
import {
  RotateRightOutlined,
  SettingOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const HomePage = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [loadingTool, setLoadingTool] = useState<string | null>(null);

  const tools = [
    {
      id: "rotation",
      title: "3D Rotation Visualizer",
      description: "Euler 각, RPY, 회전행렬 시각화",
      icon: <RotateRightOutlined className="text-2xl" />,
      color: "bg-blue-500",
    },
    {
      id: "dhparams",
      title: "DH Parameter Visualizer",
      description: "DH 매개변수 기구학 시각화",
      icon: <SettingOutlined className="text-2xl" />,
      color: "bg-green-500",
    },
  ];

  const handleNavigate = (toolId: string) => {
    setLoadingTool(toolId);
    router.push(`/${toolId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <Title level={1} className="!mb-3 !text-4xl font-bold">
            로봇공학 스터디 도구
          </Title>
          <Text className="text-gray-500 text-lg">
            로봇공학 개념을 직관적으로 이해할 수 있는 시각화 툴 모음
          </Text>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {tools.map((tool) => {
            const isHovered = hovered === tool.id;
            const isLoading = loadingTool === tool.id;
            return (
              <Col xs={24} sm={12} md={8} key={tool.id}>
                <Card
                  hoverable
                  variant="borderless"
                  className={`backdrop-blur-lg bg-white/80 rounded-2xl transition-all duration-300 px-6 py-7 ${
                    isHovered ? "scale-105 shadow-2xl" : "shadow-md"
                  }`}                  
                  onClick={() => handleNavigate(tool.id)}
                  onMouseEnter={() => setHovered(tool.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className={`w-14 h-14 mb-5 mx-auto rounded-full flex items-center justify-center text-white ${tool.color} shadow-md`}
                  >
                    {tool.icon}
                  </div>

                  <Title level={4} className="text-center font-semibold !mb-3">
                    {tool.title}
                  </Title>

                  <Text className="block text-center text-gray-500 mb-8">
                    {tool.description}
                  </Text>

                  <div className="text-center">
                    <Button
                      type="primary"
                      ghost
                      icon={<ArrowRightOutlined />}
                      className="rounded-full px-5"
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      {isLoading ? "로딩중..." : "시작하기"}
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
