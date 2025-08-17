import * as math from "mathjs";

// DH 파라미터 타입 정의
export interface DHParams {
  id: string;
  theta: number; // 관절 각도 (degrees)
  d: number; // 링크 오프셋
  a: number; // 링크 길이
  alpha: number; // 링크 비틀림 (degrees)
}

// 변환 행렬 계산 함수
export const calculateTransformMatrix = (
  params: DHParams,
  isModified: boolean
) => {
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
    return math.matrix([
      [ ct,      -st,      0,       a       ],
      [ st * ca,  ct * ca, -sa,    -sa * d  ],
      [ st * sa,  ct * sa,  ca,     ca * d  ],
      [ 0,        0,       0,       1       ],
    ]);
  } else {
    // prettier-ignore
    // Standard DH Parameters
    return math.matrix([
      [ ct,  -st * ca,   st * sa,   a * ct ],
      [ st,   ct * ca,  -ct * sa,   a * st ],
      [ 0,     sa,        ca,       d      ],
      [ 0,     0,         0,        1      ],
    ]);
  }
};
