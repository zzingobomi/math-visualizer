import React, { useMemo } from "react";
import { Typography, Space, Divider } from "antd";
import { ForwardKinematicsResult, Matrix4 } from "@/types/dhparams";

const { Text } = Typography;

interface MatrixDisplayProps {
  matrices: ForwardKinematicsResult;
}

const MATRIX_STYLES = {
  container: {
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    fontSize: "11px",
    backgroundColor: "#0a0a0a",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #434343",
  },
  bracket: {
    individual: "#ff6b6b",
    final: "#4096ff",
  },
  text: "#ffffff",
} as const;

const MatrixRenderer: React.FC<{
  matrix: Matrix4;
  bracketColor: string;
  title: string;
  highlighted?: boolean;
}> = React.memo(({ matrix, bracketColor, title, highlighted = false }) => {
  const formatNumber = (num: number): string => num.toFixed(3).padStart(7, " ");

  const matrixArray = useMemo(() => matrix.toArray(), [matrix]);

  return (
    <div className={highlighted ? "p-3 border rounded-lg" : ""}>
      <Text
        strong
        style={{ fontSize: "12px", marginBottom: "8px", display: "block" }}
      >
        {title}
      </Text>
      <div style={MATRIX_STYLES.container}>
        <Space direction="vertical" size={2} style={{ width: "100%" }}>
          {matrixArray.map((row, i) => (
            <div key={i}>
              <Text code style={{ color: bracketColor }}>
                {i === 0 ? "┌" : i === 3 ? "└" : "│"}
              </Text>
              {(row as number[]).map((val, j) => (
                <Text key={j} code style={{ color: MATRIX_STYLES.text }}>
                  {formatNumber(val)}
                </Text>
              ))}
              <Text code style={{ color: bracketColor }}>
                {i === 0 ? "┐" : i === 3 ? "┘" : "│"}
              </Text>
            </div>
          ))}
        </Space>
      </div>
    </div>
  );
});

export const MatrixDisplay: React.FC<MatrixDisplayProps> = React.memo(
  ({ matrices }) => {
    return (
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Individual Matrices */}
        {matrices.individual.map((matrix, index) => (
          <MatrixRenderer
            key={index}
            matrix={matrix}
            bracketColor={MATRIX_STYLES.bracket.individual}
            title={`T${index}_{index + 1}`}
          />
        ))}

        <Divider />

        {/* Final Matrix */}
        <MatrixRenderer
          matrix={matrices.final}
          bracketColor={MATRIX_STYLES.bracket.final}
          title={`최종 변환 T0_${matrices.individual.length}`}
          highlighted
        />
      </Space>
    );
  }
);
