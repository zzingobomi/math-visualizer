export interface RotationMatrix {
  m11: number;
  m12: number;
  m13: number;
  m21: number;
  m22: number;
  m23: number;
  m31: number;
  m32: number;
  m33: number;
}

export interface RPYAngles {
  roll: number; // X축 회전 (도)
  pitch: number; // Y축 회전 (도)
  yaw: number; // Z축 회전 (도)
}

export interface EulerAngles {
  x: number;
  y: number;
  z: number;
  type: "intrinsic" | "extrinsic";
}

export interface ZYZAngles {
  phi: number; // 첫 번째 Z 회전 (도)
  theta: number; // Y 회전 (도)
  psi: number; // 두 번째 Z 회전 (도)
}

export type RotationSource = "matrix" | "rpy" | "euler" | "zyz";
