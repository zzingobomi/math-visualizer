"use client";

import { Space, Slider, InputNumber, Button, Typography, Row, Col } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useRotationStore } from "@/stores/rotationStore";

const { Text } = Typography;

export default function ZYZInputs() {
  const { zyz, updateFromZYZ } = useRotationStore();

  const handleZYZChange = (key: keyof typeof zyz, value: number | null) => {
    if (value === null) return;

    const newZYZ = { ...zyz, [key]: value };
    updateFromZYZ(newZYZ);
  };

  const resetZYZ = () => {
    updateFromZYZ({ phi: 0, theta: 0, psi: 0 });
  };

  return (
    <Space direction="vertical" size="middle" className="w-full">
      {/* Phi (첫 번째 Z 회전) */}
      <div>
        <Row justify="space-between" align="middle" className="mb-2">
          <Text strong className="text-blue-500">
            φ (첫 번째 Z)
          </Text>
          <InputNumber
            size="small"
            value={zyz.phi}
            min={-180}
            max={180}
            step={1}
            precision={1}
            onChange={(value) => handleZYZChange("phi", value)}
            style={{ width: "80px" }}
            addonAfter="°"
          />
        </Row>
        <Slider
          value={zyz.phi}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleZYZChange("phi", value)}
          styles={{
            track: { backgroundColor: "#1890ff" },
            handle: { borderColor: "#1890ff" },
          }}
        />
      </div>

      {/* Theta (Y 회전) */}
      <div>
        <Row justify="space-between" align="middle" className="mb-2">
          <Text strong className="text-green-500">
            θ (Y축)
          </Text>
          <InputNumber
            size="small"
            value={zyz.theta}
            min={0}
            max={180}
            step={1}
            precision={1}
            onChange={(value) => handleZYZChange("theta", value)}
            style={{ width: "80px" }}
            addonAfter="°"
          />
        </Row>
        <Slider
          value={zyz.theta}
          min={0}
          max={180}
          step={1}
          onChange={(value) => handleZYZChange("theta", value)}
          styles={{
            track: { backgroundColor: "#52c41a" },
            handle: { borderColor: "#52c41a" },
          }}
        />
      </div>

      {/* Psi (두 번째 Z 회전) */}
      <div>
        <Row justify="space-between" align="middle" className="mb-2">
          <Text strong className="text-purple-500">
            ψ (두 번째 Z)
          </Text>
          <InputNumber
            size="small"
            value={zyz.psi}
            min={-180}
            max={180}
            step={1}
            precision={1}
            onChange={(value) => handleZYZChange("psi", value)}
            style={{ width: "80px" }}
            addonAfter="°"
          />
        </Row>
        <Slider
          value={zyz.psi}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleZYZChange("psi", value)}
          styles={{
            track: { backgroundColor: "#722ed1" },
            handle: { borderColor: "#722ed1" },
          }}
        />
      </div>

      <Button
        type="primary"
        danger
        size="small"
        icon={<ReloadOutlined />}
        onClick={resetZYZ}
        block
      >
        Reset ZYZ
      </Button>

      <div>
        <Text type="secondary" className="text-xs">
          <strong>ZYZ:</strong> Z→Y→Z 순서로 회전
          <br />
          θ (theta)는 0~180도 범위입니다
          <br />
          짐벌락 회피에 유용한 표현 방식
        </Text>
      </div>
    </Space>
  );
}
