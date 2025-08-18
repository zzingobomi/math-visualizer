"use client";

import {
  Space,
  Slider,
  InputNumber,
  Button,
  Typography,
  Row,
  Radio,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useRotationStore } from "@/stores/rotationStore";

const { Text } = Typography;

export default function EulerInputs() {
  const { euler, updateFromEuler } = useRotationStore();

  const handleEulerChange = (key: keyof typeof euler, value: any) => {
    if (key !== "type" && value === null) return;
    const newEuler = { ...euler, [key]: value };
    updateFromEuler(newEuler);
  };

  const resetEuler = () => {
    updateFromEuler({ x: 0, y: 0, z: 0, type: euler.type });
  };

  return (
    <Space direction="vertical" size="middle" className="w-full">
      {/* Type Selection */}
      <div>
        <Text strong className="block mb-2">
          회전 순서
        </Text>
        <Radio.Group
          value={euler.type}
          onChange={(e) => handleEulerChange("type", e.target.value)}
          size="small"
        >
          <Radio.Button value="intrinsic">Intrinsic (XYZ)</Radio.Button>
          <Radio.Button value="extrinsic">Extrinsic (ZYX)</Radio.Button>
        </Radio.Group>
      </div>

      {/* X Rotation */}
      <div>
        <Row justify="space-between" align="middle" className="mb-2">
          <Text strong className="text-red-500">
            X 회전
          </Text>
          <InputNumber
            size="small"
            value={euler.x}
            min={-180}
            max={180}
            step={1}
            precision={1}
            onChange={(value) => handleEulerChange("x", value)}
            className="w-20"
            addonAfter="°"
          />
        </Row>
        <Slider
          value={euler.x}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleEulerChange("x", value)}
          styles={{
            track: { backgroundColor: "#ff4d4f" },
            handle: { borderColor: "#ff4d4f" }, // FIXME: border color 가 적용이 안되는거 같은데..
          }}
        />
      </div>

      {/* Y Rotation */}
      <div>
        <Row justify="space-between" align="middle" className="mb-2">
          <Text strong className="text-green-500">
            Y 회전
          </Text>
          <InputNumber
            size="small"
            value={euler.y}
            min={-180}
            max={180}
            step={1}
            precision={1}
            onChange={(value) => handleEulerChange("y", value)}
            className="w-20"
            addonAfter="°"
          />
        </Row>
        <Slider
          value={euler.y}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleEulerChange("y", value)}
          styles={{
            track: { backgroundColor: "#52c41a" },
            handle: { borderColor: "#52c41a" },
          }}
        />
      </div>

      {/* Z Rotation */}
      <div>
        <Row justify="space-between" align="middle" className="mb-2">
          <Text strong className="text-blue-500">
            Z 회전
          </Text>
          <InputNumber
            size="small"
            value={euler.z}
            min={-180}
            max={180}
            step={1}
            precision={1}
            onChange={(value) => handleEulerChange("z", value)}
            className="w-20"
            addonAfter="°"
          />
        </Row>
        <Slider
          value={euler.z}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleEulerChange("z", value)}
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
        onClick={resetEuler}
        block
      >
        Reset Euler
      </Button>

      <div>
        <Text type="secondary" className="text-xs">
          <strong>Intrinsic:</strong> 물체 좌표축(local) 기준 X→Y→Z 순서
          <br />
          <strong>Extrinsic:</strong> 고정 좌표축(world) 기준 Z→Y→X 순서
        </Text>
      </div>
    </Space>
  );
}
