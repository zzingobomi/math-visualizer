"use client";

import { Space, Slider, InputNumber, Button, Typography, Row, Col } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useRotationStore } from "@/stores/rotationStore";

const { Text } = Typography;

export default function RPYInputs() {
  const { rpy, updateFromRPY, reset } = useRotationStore();

  const handleRPYChange = (key: keyof typeof rpy, value: number | null) => {
    if (value === null) return;

    const newRPY = { ...rpy, [key]: value };
    updateFromRPY(newRPY);
  };

  const resetRPY = () => {
    updateFromRPY({ roll: 0, pitch: 0, yaw: 0 });
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Roll */}
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "8px" }}
        >
          <Text strong style={{ color: "#ff4d4f" }}>
            Roll (X축)
          </Text>
          <InputNumber
            size="small"
            value={rpy.roll}
            min={-180}
            max={180}
            step={1}
            precision={1}
            onChange={(value) => handleRPYChange("roll", value)}
            style={{ width: "80px" }}
            addonAfter="°"
          />
        </Row>
        <Slider
          value={rpy.roll}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleRPYChange("roll", value)}
          trackStyle={{ backgroundColor: "#ff4d4f" }}
          handleStyle={{ borderColor: "#ff4d4f" }}
        />
      </div>

      {/* Pitch */}
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "8px" }}
        >
          <Text strong style={{ color: "#52c41a" }}>
            Pitch (Y축)
          </Text>
          <InputNumber
            size="small"
            value={rpy.pitch}
            min={-180}
            max={180}
            step={1}
            precision={1}
            onChange={(value) => handleRPYChange("pitch", value)}
            style={{ width: "80px" }}
            addonAfter="°"
          />
        </Row>
        <Slider
          value={rpy.pitch}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleRPYChange("pitch", value)}
          trackStyle={{ backgroundColor: "#52c41a" }}
          handleStyle={{ borderColor: "#52c41a" }}
        />
      </div>

      {/* Yaw */}
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "8px" }}
        >
          <Text strong style={{ color: "#1890ff" }}>
            Yaw (Z축)
          </Text>
          <InputNumber
            size="small"
            value={rpy.yaw}
            min={-180}
            max={180}
            step={1}
            precision={1}
            onChange={(value) => handleRPYChange("yaw", value)}
            style={{ width: "80px" }}
            addonAfter="°"
          />
        </Row>
        <Slider
          value={rpy.yaw}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleRPYChange("yaw", value)}
          trackStyle={{ backgroundColor: "#1890ff" }}
          handleStyle={{ borderColor: "#1890ff" }}
        />
      </div>

      <Button
        type="primary"
        danger
        size="small"
        icon={<ReloadOutlined />}
        onClick={resetRPY}
        block
      >
        Reset RPY
      </Button>

      <Text type="secondary" style={{ fontSize: "12px" }}>
        Z-Y-X 순서로 회전 (Extrinsic)
      </Text>
    </Space>
  );
}
