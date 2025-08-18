import React, { useMemo } from "react";
import { Typography, Divider } from "antd";
import { ForwardKinematicsResult, Matrix4 } from "@/types/dhparams";
import {
  isNumber,
  isBigNumber,
  isFraction,
  isComplex,
  MathNumericType,
} from "mathjs";

const { Text } = Typography;

interface MatrixDisplayProps {
  matrices: ForwardKinematicsResult;
}

interface MatrixRendererProps {
  matrix: Matrix4;
  bracketColor: string;
  title: string;
  highlighted?: boolean;
}

// mathjs 값을 안전하게 number로 변환하는 헬퍼
function toNumber(val: MathNumericType): number {
  if (isNumber(val)) return val as number;
  if (isBigNumber(val)) return (val as any).toNumber();
  if (isFraction(val)) return (val as any).valueOf();
  if (isComplex(val)) return (val as any).re; // 실수부만 사용
  if (typeof val === "bigint") return Number(val);
  throw new Error("Unsupported MathNumericType");
}

const MatrixRenderer = React.memo(
  ({
    matrix,
    bracketColor,
    title,
    highlighted = false,
  }: MatrixRendererProps) => {
    const formatNumber = (num: number): string =>
      num.toFixed(3).padStart(7, " ");

    // 4x4 행렬을 2차원 배열로 변환 + number로 변환
    const matrixArray = useMemo(() => {
      const arr = matrix.toArray() as MathNumericType[][];
      return arr.map((row) => row.map(toNumber));
    }, [matrix]);

    return (
      <div
        className={`${
          highlighted ? "p-3 border rounded-lg border-gray-500" : ""
        }`}
      >
        <Text strong className="block text-xs mb-2">
          {title}
        </Text>
        <div className="font-mono text-[11px] bg-neutral-950 p-3 rounded-md border border-neutral-700">
          <div className="flex flex-col space-y-1">
            {matrixArray.map((row, i) => (
              <div key={i} className="flex items-center">
                <Text code style={{ color: bracketColor }}>
                  {i === 0 ? "┌" : i === 3 ? "└" : "│"}
                </Text>
                {row.map((val, j) => (
                  <Text
                    key={j}
                    code
                    style={{ color: "#ffffff" }}
                    className="inline-block w-[60px] text-right"
                  >
                    {formatNumber(val)}
                  </Text>
                ))}
                <Text code style={{ color: bracketColor }}>
                  {i === 0 ? "┐" : i === 3 ? "┘" : "│"}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export const MatrixDisplay = React.memo(({ matrices }: MatrixDisplayProps) => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      {matrices.individual.map((matrix, index) => (
        <MatrixRenderer
          key={index}
          matrix={matrix}
          bracketColor="#ff6b6b"
          title={`T${index}_${index + 1}`}
        />
      ))}

      <Divider className="border-gray-600" />

      <MatrixRenderer
        matrix={matrices.final}
        bracketColor="#4096ff"
        title={`최종 변환 T0_${matrices.individual.length}`}
        highlighted
      />
    </div>
  );
});
