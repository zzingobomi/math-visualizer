"use client";

import { Typography, Space } from "antd";
import { useRotationStore } from "@/stores/rotationStore";

const { Text } = Typography;

export default function MatrixDisplay() {
  const { matrix } = useRotationStore();

  const formatNumber = (num: number) => {
    return num.toFixed(3).padStart(7, " ");
  };

  return (
    <div
      style={{
        fontFamily: 'Monaco, Consolas, "Courier New", monospace',
        fontSize: "14px",
        backgroundColor: "#0a0a0a",
        padding: "16px",
        borderRadius: "6px",
        border: "1px solid #434343",
      }}
    >
      <Space direction="vertical" size={4} style={{ width: "100%" }}>
        <div>
          <Text code style={{ color: "#ff6b6b" }}>
            ┌
          </Text>
          <Text code>{formatNumber(matrix.m11)}</Text>
          <Text code>{formatNumber(matrix.m12)}</Text>
          <Text code>{formatNumber(matrix.m13)}</Text>
          <Text code style={{ color: "#ff6b6b" }}>
            ┐
          </Text>
        </div>
        <div>
          <Text code style={{ color: "#ff6b6b" }}>
            │
          </Text>
          <Text code>{formatNumber(matrix.m21)}</Text>
          <Text code>{formatNumber(matrix.m22)}</Text>
          <Text code>{formatNumber(matrix.m23)}</Text>
          <Text code style={{ color: "#ff6b6b" }}>
            │
          </Text>
        </div>
        <div>
          <Text code style={{ color: "#ff6b6b" }}>
            └
          </Text>
          <Text code>{formatNumber(matrix.m31)}</Text>
          <Text code>{formatNumber(matrix.m32)}</Text>
          <Text code>{formatNumber(matrix.m33)}</Text>
          <Text code style={{ color: "#ff6b6b" }}>
            ┘
          </Text>
        </div>
      </Space>
    </div>
  );
}
