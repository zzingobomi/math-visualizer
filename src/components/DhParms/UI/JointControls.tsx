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

const { Text } = Typography;

export const JointControls = ({ joints, setJoints, updateJoint }) => {
  const addJoint = () => {
    const newId = String(joints.length + 1);
    setJoints([...joints, { id: newId, theta: 0, d: 0.5, a: 1, alpha: 0 }]);
  };

  const removeJoint = () => {
    if (joints.length > 1) {
      setJoints(joints.slice(0, -1));
    }
  };

  const resetAll = () => {
    setJoints([{ id: "1", theta: 0, d: 1, a: 1, alpha: 0 }]);
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <div className="flex justify-between items-center">
        <Text strong>관절 제어 ({joints.length}개)</Text>
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<PlusOutlined />}
            onClick={addJoint}
          >
            추가
          </Button>
          <Button
            danger
            size="small"
            icon={<MinusOutlined />}
            onClick={removeJoint}
            disabled={joints.length <= 1}
          >
            제거
          </Button>
          <Button size="small" icon={<ReloadOutlined />} onClick={resetAll}>
            초기화
          </Button>
        </Space>
      </div>

      {joints.map((joint, index) => (
        <div
          key={joint.id}
          className="p-4 border border-gray-200 rounded-lg bg-gray-50"
        >
          <Text strong className="block mb-3">
            관절 {joint.id}
          </Text>

          {/* Theta */}
          <div className="mb-4">
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "8px" }}
            >
              <Text strong style={{ color: "#ff4d4f" }}>
                θ 회전
              </Text>
              <InputNumber
                size="small"
                value={joint.theta}
                min={-180}
                max={180}
                step={5}
                precision={1}
                onChange={(value) => updateJoint(joint.id, "theta", value)}
                style={{ width: "80px" }}
                addonAfter="°"
              />
            </Row>
            <Slider
              value={joint.theta}
              min={-180}
              max={180}
              step={5}
              onChange={(value) => updateJoint(joint.id, "theta", value)}
              trackStyle={{ backgroundColor: "#ff4d4f" }}
              handleStyle={{ borderColor: "#ff4d4f" }}
            />
          </div>

          {/* d */}
          <div className="mb-4">
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "8px" }}
            >
              <Text strong style={{ color: "#1890ff" }}>
                d 오프셋
              </Text>
              <InputNumber
                size="small"
                value={joint.d}
                min={-5}
                max={5}
                step={0.1}
                precision={2}
                onChange={(value) => updateJoint(joint.id, "d", value)}
                style={{ width: "80px" }}
              />
            </Row>
            <Slider
              value={joint.d}
              min={-5}
              max={5}
              step={0.1}
              onChange={(value) => updateJoint(joint.id, "d", value)}
              trackStyle={{ backgroundColor: "#1890ff" }}
              handleStyle={{ borderColor: "#1890ff" }}
            />
          </div>

          {/* a */}
          <div className="mb-4">
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "8px" }}
            >
              <Text strong style={{ color: "#52c41a" }}>
                a 길이
              </Text>
              <InputNumber
                size="small"
                value={joint.a}
                min={-5}
                max={5}
                step={0.1}
                precision={2}
                onChange={(value) => updateJoint(joint.id, "a", value)}
                style={{ width: "80px" }}
              />
            </Row>
            <Slider
              value={joint.a}
              min={-5}
              max={5}
              step={0.1}
              onChange={(value) => updateJoint(joint.id, "a", value)}
              trackStyle={{ backgroundColor: "#52c41a" }}
              handleStyle={{ borderColor: "#52c41a" }}
            />
          </div>

          {/* Alpha */}
          <div>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "8px" }}
            >
              <Text strong style={{ color: "#faad14" }}>
                α 비틀림
              </Text>
              <InputNumber
                size="small"
                value={joint.alpha}
                min={-180}
                max={180}
                step={15}
                precision={1}
                onChange={(value) => updateJoint(joint.id, "alpha", value)}
                style={{ width: "80px" }}
                addonAfter="°"
              />
            </Row>
            <Slider
              value={joint.alpha}
              min={-180}
              max={180}
              step={15}
              onChange={(value) => updateJoint(joint.id, "alpha", value)}
              trackStyle={{ backgroundColor: "#faad14" }}
              handleStyle={{ borderColor: "#faad14" }}
            />
          </div>
        </div>
      ))}
    </Space>
  );
};
