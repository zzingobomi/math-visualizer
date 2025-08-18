import { matrix, Matrix } from "mathjs";

// DH 파라미터 타입 정의
export interface DHParams {
  id: string;
  theta: number; // 관절 각도 (degrees)
  d: number; // 링크 오프셋
  a: number; // 링크 길이
  alpha: number; // 링크 비틀림 (degrees)
}

// DH Convention 타입
export type DHConvention = "standard" | "modified";

// Matrix 관련 타입
export type Matrix4 = Matrix;
export type Vector3Tuple = [number, number, number];
export type Matrix3x3 = Matrix;

// Forward Kinematics 결과 타입
export interface ForwardKinematicsResult {
  positions: Vector3Tuple[];
  matrices: Matrix4[];
  final: Matrix4;
  individual: Matrix4[];
}

// Parameter 범위 타입
export interface ParameterConfig {
  min: number;
  max: number;
  step: number;
  precision: number;
  unit?: string;
  color: string;
}

// DH Parameters 설정
export const DH_PARAM_CONFIGS: Record<
  keyof Omit<DHParams, "id">,
  ParameterConfig
> = {
  theta: {
    min: -180,
    max: 180,
    step: 5,
    precision: 1,
    unit: "°",
    color: "#ff4d4f",
  },
  d: { min: -5, max: 5, step: 0.1, precision: 2, color: "#1890ff" },
  a: { min: -5, max: 5, step: 0.1, precision: 2, color: "#52c41a" },
  alpha: {
    min: -180,
    max: 180,
    step: 15,
    precision: 1,
    unit: "°",
    color: "#faad14",
  },
} as const;

// 기본 조인트
export const DEFAULT_JOINT: Omit<DHParams, "id"> = {
  theta: 0,
  d: 1,
  a: 1,
  alpha: 0,
};

// 변환 행렬 계산 함수
export const calculateTransformMatrix = (
  params: DHParams,
  isModified: boolean
): Matrix4 => {
  const { theta, d, a, alpha } = params;
  const thetaRad = (theta * Math.PI) / 180;
  const alphaRad = (alpha * Math.PI) / 180;

  const ct = Math.cos(thetaRad);
  const st = Math.sin(thetaRad);
  const ca = Math.cos(alphaRad);
  const sa = Math.sin(alphaRad);

  if (isModified) {
    // prettier-ignore
    // Modified DH Parameters
    return matrix([
      [ ct,      -st,      0,       a       ],
      [ st * ca,  ct * ca, -sa,    -sa * d  ],
      [ st * sa,  ct * sa,  ca,     ca * d  ],
      [ 0,        0,       0,       1       ],
    ]);
  } else {
    // prettier-ignore
    // Standard DH Parameters
    return matrix([
      [ ct,  -st * ca,   st * sa,   a * ct ],
      [ st,   ct * ca,  -ct * sa,   a * st ],
      [ 0,     sa,        ca,       d      ],
      [ 0,     0,         0,        1      ],
    ]);
  }
};
