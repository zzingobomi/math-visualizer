"use client";

import { Typography, Space } from "antd";
import { useRotationStore } from "@/stores/rotationStore";

const { Text } = Typography;

export default function MatrixDisplay() {
  const { matrix } = useRotationStore();

  const formatNumber = (num: number) => {
    const formatted = num.toFixed(3);
    return (num >= 0 ? ` ${formatted}` : formatted).padEnd(7, " ");
  };

  interface MatrixRowProps {
    values: [number, number, number];
    leftBracket: string;
    rightBracket: string;
  }

  const MatrixRow = ({ values, leftBracket, rightBracket }: MatrixRowProps) => (
    <div className="flex items-center">
      <Text code className="text-blue-400 text-base mr-2">
        {leftBracket}
      </Text>
      {values.map((value, index) => (
        <Text
          key={index}
          code
          className="text-green-300 font-mono text-sm"
          style={{ display: "inline-block", width: "60px", textAlign: "right" }}
        >
          {formatNumber(value)}
        </Text>
      ))}
      <Text code className="text-blue-400 text-base ml-2">
        {rightBracket}
      </Text>
    </div>
  );

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 shadow-lg">
      <Space direction="vertical" size={2} className="w-full">
        <MatrixRow
          values={[matrix.m11, matrix.m12, matrix.m13]}
          leftBracket="┌"
          rightBracket="┐"
        />
        <MatrixRow
          values={[matrix.m21, matrix.m22, matrix.m23]}
          leftBracket="│"
          rightBracket="│"
        />
        <MatrixRow
          values={[matrix.m31, matrix.m32, matrix.m33]}
          leftBracket="└"
          rightBracket="┘"
        />
      </Space>
    </div>
  );
}
