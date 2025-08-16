"use client";

import {
  Space,
  Slider,
  InputNumber,
  Button,
  Typography,
  Row,
  Col,
  Radio,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useRotationStore } from "@/store/rotationStore";

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
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Type Selection */}
      <div>
        <Text strong style={{ marginBottom: "8px", display: "block" }}>
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
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "8px" }}
        >
          <Text strong style={{ color: "#ff4d4f" }}>
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
            style={{ width: "80px" }}
            addonAfter="°"
          />
        </Row>
        <Slider
          value={euler.x}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleEulerChange("x", value)}
          trackStyle={{ backgroundColor: "#ff4d4f" }}
          handleStyle={{ borderColor: "#ff4d4f" }}
        />
      </div>

      {/* Y Rotation */}
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "8px" }}
        >
          <Text strong style={{ color: "#52c41a" }}>
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
            style={{ width: "80px" }}
            addonAfter="°"
          />
        </Row>
        <Slider
          value={euler.y}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleEulerChange("y", value)}
          trackStyle={{ backgroundColor: "#52c41a" }}
          handleStyle={{ borderColor: "#52c41a" }}
        />
      </div>

      {/* Z Rotation */}
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "8px" }}
        >
          <Text strong style={{ color: "#1890ff" }}>
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
            style={{ width: "80px" }}
            addonAfter="°"
          />
        </Row>
        <Slider
          value={euler.z}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => handleEulerChange("z", value)}
          trackStyle={{ backgroundColor: "#1890ff" }}
          handleStyle={{ borderColor: "#1890ff" }}
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
        <Text type="secondary" style={{ fontSize: "12px" }}>
          <strong>Intrinsic:</strong> 고정 좌표축 기준 X→Y→Z 순서
          <br />
          <strong>Extrinsic:</strong> 회전 좌표축 기준 Z→Y→X 순서
        </Text>
      </div>
    </Space>
  );
}
