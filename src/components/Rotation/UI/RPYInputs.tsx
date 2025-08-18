"use client";

import { Space, Slider, InputNumber, Button, Typography, Row } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useRotationStore } from "@/stores/rotationStore";

const { Text } = Typography;

export default function RPYInputs() {
  const { rpy, updateFromRPY } = useRotationStore();

  const handleRPYChange = (key: keyof typeof rpy, value: number | null) => {
    if (value === null) return;

    const newRPY = { ...rpy, [key]: value };
    updateFromRPY(newRPY);
  };

  const resetRPY = () => {
    updateFromRPY({ roll: 0, pitch: 0, yaw: 0 });
  };

  return (
    <Space direction="vertical" size="middle" className="w-full">
      {/* Roll */}
      <div>
        <Row justify="space-between" align="middle" className="mb-2">
          <Text strong className="text-red-500">
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
          styles={{
            track: { backgroundColor: "#ff4d4f" },
            handle: { borderColor: "#ff4d4f" },
          }}
        />
      </div>

      {/* Pitch */}
      <div>
        <Row justify="space-between" align="middle" className="mb-2">
          <Text strong className="text-green-500">
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
          styles={{
            track: { backgroundColor: "#52c41a" },
            handle: { borderColor: "#52c41a" },
          }}
        />
      </div>

      {/* Yaw */}
      <div>
        <Row justify="space-between" align="middle" className="mb-2">
          <Text strong className="text-blue-500">
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
          styles={{
            track: { backgroundColor: "#1890ff" },
            handle: { borderColor: "#1890ff" },
          }}
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

      <Text type="secondary" className="text-xs">
        Z-Y-X 순서로 회전 (Extrinsic)
      </Text>
    </Space>
  );
}
