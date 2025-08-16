"use client";

import { Typography, Space, Divider } from "antd";

const { Text } = Typography;

export const MatrixDisplay = ({ matrices }) => {
  const formatNumber = (num) => num.toFixed(3).padStart(7, " ");

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Individual Matrices */}
      {matrices.individual.map((matrix, index) => (
        <div key={index}>
          <Text
            strong
            style={{ fontSize: "12px", marginBottom: "8px", display: "block" }}
          >
            T{index}_{index + 1}
          </Text>
          <div
            style={{
              fontFamily: 'Monaco, Consolas, "Courier New", monospace',
              fontSize: "11px",
              backgroundColor: "#0a0a0a",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #434343",
            }}
          >
            <Space direction="vertical" size={2} style={{ width: "100%" }}>
              {matrix.toArray().map((row, i) => (
                <div key={i}>
                  <Text code style={{ color: "#ff6b6b" }}>
                    {i === 0 ? "┌" : i === 3 ? "└" : "│"}
                  </Text>
                  {row.map((val, j) => (
                    <Text key={j} code style={{ color: "#ffffff" }}>
                      {formatNumber(val)}
                    </Text>
                  ))}
                  <Text code style={{ color: "#ff6b6b" }}>
                    {i === 0 ? "┐" : i === 3 ? "┘" : "│"}
                  </Text>
                </div>
              ))}
            </Space>
          </div>
        </div>
      ))}

      <Divider />

      {/* Final Matrix */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <Text
          strong
          style={{ fontSize: "12px", marginBottom: "8px", display: "block" }}
        >
          최종 변환 T0_{matrices.individual.length}
        </Text>
        <div
          style={{
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: "11px",
            backgroundColor: "#0a0a0a",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #434343",
          }}
        >
          <Space direction="vertical" size={2} style={{ width: "100%" }}>
            {matrices.final.toArray().map((row, i) => (
              <div key={i}>
                <Text code style={{ color: "#4096ff" }}>
                  {i === 0 ? "┌" : i === 3 ? "└" : "│"}
                </Text>
                {row.map((val, j) => (
                  <Text key={j} code style={{ color: "#ffffff" }}>
                    {formatNumber(val)}
                  </Text>
                ))}
                <Text code style={{ color: "#4096ff" }}>
                  {i === 0 ? "┐" : i === 3 ? "┘" : "│"}
                </Text>
              </div>
            ))}
          </Space>
        </div>
      </div>
    </Space>
  );
};
