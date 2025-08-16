"use client";

import { Row, Col, InputNumber, Button, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useRotationStore } from "@/store/rotationStore";

const { Text } = Typography;

export default function MatrixInputs() {
  const { matrix, updateFromMatrix, reset } = useRotationStore();

  const handleMatrixChange = (
    key: keyof typeof matrix,
    value: number | null
  ) => {
    if (value === null) return;

    const newMatrix = { ...matrix, [key]: value };
    updateFromMatrix(newMatrix);
  };

  return (
    <div>
      <Row gutter={[8, 8]} style={{ marginBottom: "16px" }}>
        <Col span={8}>
          <InputNumber
            size="small"
            value={matrix.m11}
            step={0.01}
            precision={3}
            onChange={(value) => handleMatrixChange("m11", value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={8}>
          <InputNumber
            size="small"
            value={matrix.m12}
            step={0.01}
            precision={3}
            onChange={(value) => handleMatrixChange("m12", value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={8}>
          <InputNumber
            size="small"
            value={matrix.m13}
            step={0.01}
            precision={3}
            onChange={(value) => handleMatrixChange("m13", value)}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      <Row gutter={[8, 8]} style={{ marginBottom: "16px" }}>
        <Col span={8}>
          <InputNumber
            size="small"
            value={matrix.m21}
            step={0.01}
            precision={3}
            onChange={(value) => handleMatrixChange("m21", value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={8}>
          <InputNumber
            size="small"
            value={matrix.m22}
            step={0.01}
            precision={3}
            onChange={(value) => handleMatrixChange("m22", value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={8}>
          <InputNumber
            size="small"
            value={matrix.m23}
            step={0.01}
            precision={3}
            onChange={(value) => handleMatrixChange("m23", value)}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      <Row gutter={[8, 8]} style={{ marginBottom: "16px" }}>
        <Col span={8}>
          <InputNumber
            size="small"
            value={matrix.m31}
            step={0.01}
            precision={3}
            onChange={(value) => handleMatrixChange("m31", value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={8}>
          <InputNumber
            size="small"
            value={matrix.m32}
            step={0.01}
            precision={3}
            onChange={(value) => handleMatrixChange("m32", value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={8}>
          <InputNumber
            size="small"
            value={matrix.m33}
            step={0.01}
            precision={3}
            onChange={(value) => handleMatrixChange("m33", value)}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      <Button
        type="primary"
        danger
        size="small"
        icon={<ReloadOutlined />}
        onClick={reset}
        block
      >
        Reset
      </Button>

      <Text
        type="secondary"
        style={{ fontSize: "12px", marginTop: "8px", display: "block" }}
      >
        직접 회전 행렬 값을 입력하세요
      </Text>
    </div>
  );
}
