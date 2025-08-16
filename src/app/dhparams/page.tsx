"use client";

import { useMemo, useState } from "react";
import * as math from "mathjs";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Slider,
  InputNumber,
  Button,
  Radio,
  Divider,
} from "antd";
import { PlusOutlined, MinusOutlined, ReloadOutlined } from "@ant-design/icons";
import { calculateTransformMatrix } from "@/types/dhparams";
import { Scene } from "@/components/DhParms/Scene";
import { JointControls } from "@/components/DhParms/UI/JointControls";
import { MatrixDisplay } from "@/components/DhParms/UI/MatrixDisplay";

const { Title, Text } = Typography;

export default function DHParameterVisualizer() {
  const [joints, setJoints] = useState([
    { id: "1", theta: 0, d: 1, a: 1, alpha: 0 },
  ]);
  const [isModified, setIsModified] = useState(false);

  const updateJoint = (id: string, field: any, value: null) => {
    if (value === null) return;
    setJoints(
      joints.map((joint) =>
        joint.id === id ? { ...joint, [field]: value } : joint
      )
    );
  };

  // Forward Kinematics 계산
  const forwardKinematics = useMemo(() => {
    let currentMatrix = math.identity(4);
    const individualMatrices: math.Matrix<math.MathNumericType>[] = [];

    joints.forEach((joint) => {
      const T = calculateTransformMatrix(joint, isModified);
      individualMatrices.push(T);
      currentMatrix = math.multiply(currentMatrix, T);
    });

    return { final: currentMatrix, individual: individualMatrices };
  }, [joints, isModified]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Space direction="vertical" size="large" className="w-full">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <Title level={1} className="mb-2">
            DH Parameter Visualizer
          </Title>
          <Text type="secondary" className="text-base">
            로봇 관절의 Denavit-Hartenberg 매개변수 시각화 도구
          </Text>
        </div>

        {/* 메인 레이아웃 */}
        <Row gutter={[24, 24]} className="min-h-[calc(100vh-200px)]">
          {/* 3D Scene */}
          <Col xs={24} lg={16} className="min-h-[600px]">
            <Card
              title="3D 시각화"
              className="h-full flex flex-col"
              bodyStyle={{ flex: 1, padding: "16px" }}
            >
              <div className="h-[600px] bg-gray-900 rounded-lg">
                <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
                  <Scene joints={joints} isModified={isModified} />
                  <OrbitControls enablePan enableZoom enableRotate />
                </Canvas>
              </div>
            </Card>
          </Col>

          {/* 컨트롤 패널 */}
          <Col xs={24} lg={8}>
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden pr-2">
              <Space direction="vertical" size="middle" className="w-full">
                {/* DH Convention */}
                <Card title="DH 표기법" size="small" variant="borderless">
                  <Space
                    direction="vertical"
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <Radio.Group
                      value={isModified ? "modified" : "standard"}
                      onChange={(e) =>
                        setIsModified(e.target.value === "modified")
                      }
                      size="small"
                    >
                      <Radio.Button value="standard">Standard DH</Radio.Button>
                      <Radio.Button value="modified">Modified DH</Radio.Button>
                    </Radio.Group>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      <strong>Standard:</strong> 일반적인 DH 매개변수
                      <br />
                      <strong>Modified:</strong> 수정된 DH 매개변수
                    </Text>
                  </Space>
                </Card>

                {/* Joint Controls */}
                <Card title="관절 매개변수" size="small" variant="borderless">
                  <JointControls
                    joints={joints}
                    setJoints={setJoints}
                    updateJoint={updateJoint}
                  />
                </Card>

                {/* Matrix Display */}
                <Card title="변환 행렬" size="small" variant="borderless">
                  <MatrixDisplay matrices={forwardKinematics} />
                </Card>
              </Space>
            </div>
          </Col>
        </Row>

        {/* 범례/도움말 */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="색상 범례" size="small" variant="borderless">
              <Space direction="vertical" size="small">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-1 bg-red-500 rounded-sm" />
                  <Text>X축 (빨강)</Text>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-1 bg-green-500 rounded-sm" />
                  <Text>Y축 (초록)</Text>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-1 bg-blue-500 rounded-sm" />
                  <Text>Z축 (파랑)</Text>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-1 bg-teal-500 rounded-sm" />
                  <Text>관절 (청록)</Text>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="사용 방법" size="small" variant="borderless">
              <Space direction="vertical" size="small">
                <Text>• 마우스 드래그로 3D 뷰 회전</Text>
                <Text>• 휠 스크롤로 확대/축소</Text>
                <Text>• 슬라이더로 관절 매개변수 조정</Text>
                <Text>• 실시간 변환 행렬 계산 확인</Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
