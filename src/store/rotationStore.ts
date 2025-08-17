import { create } from "zustand";
import * as THREE from "three";
import {
  RotationMatrix,
  RPYAngles,
  EulerAngles,
  ZYZAngles,
} from "@/types/rotation";

interface RotationStore {
  // 현재 상태
  matrix: RotationMatrix;
  rpy: RPYAngles;
  euler: EulerAngles;
  zyz: ZYZAngles;
  rotationMatrix4: THREE.Matrix4;
  isUpdating: boolean;

  // 액션
  updateFromMatrix: (matrix: RotationMatrix) => void;
  updateFromRPY: (rpy: RPYAngles) => void;
  updateFromEuler: (euler: EulerAngles) => void;
  updateFromZYZ: (zyz: ZYZAngles) => void;
  reset: () => void;
}

const initialState = {
  // prettier-ignore
  matrix: {
    m11: 1, m12: 0, m13: 0,
    m21: 0, m22: 1, m23: 0,
    m31: 0, m32: 0, m33: 1,
  },
  rpy: { roll: 0, pitch: 0, yaw: 0 },
  euler: { x: 0, y: 0, z: 0, type: "intrinsic" as const },
  zyz: { phi: 0, theta: 0, psi: 0 },
  rotationMatrix4: new THREE.Matrix4(),
};

export const useRotationStore = create<RotationStore>((set, get) => ({
  ...initialState,
  isUpdating: false,

  updateFromMatrix: (matrix: RotationMatrix) => {
    if (get().isUpdating) return;

    set({ isUpdating: true });

    // prettier-ignore
    const mat4 = new THREE.Matrix4().set(
      matrix.m11, matrix.m12, matrix.m13, 0,
      matrix.m21, matrix.m22, matrix.m23, 0,
      matrix.m31, matrix.m32, matrix.m33, 0,
      0,          0,          0,          1
    );

    // Matrix에서 다른 표현들 계산
    const euler = new THREE.Euler().setFromRotationMatrix(mat4, "ZYX");
    const rpy = {
      roll: THREE.MathUtils.radToDeg(euler.x),
      pitch: THREE.MathUtils.radToDeg(euler.y),
      yaw: THREE.MathUtils.radToDeg(euler.z),
    };

    // ZYZ 계산
    const zyz = matrixToZYZ(mat4);

    set({
      matrix,
      rpy,
      zyz,
      rotationMatrix4: mat4.clone(),
      isUpdating: false,
    });
  },

  updateFromRPY: (rpy: RPYAngles) => {
    if (get().isUpdating) return;

    set({ isUpdating: true });

    const euler = new THREE.Euler(
      THREE.MathUtils.degToRad(rpy.roll),
      THREE.MathUtils.degToRad(rpy.pitch),
      THREE.MathUtils.degToRad(rpy.yaw),
      "ZYX"
    );

    const mat4 = new THREE.Matrix4().makeRotationFromEuler(euler);
    const matrix = matrix4ToMatrix(mat4);
    const zyz = matrixToZYZ(mat4);

    set({
      matrix,
      rpy,
      zyz,
      rotationMatrix4: mat4.clone(),
      isUpdating: false,
    });
  },

  updateFromEuler: (euler: EulerAngles) => {
    if (get().isUpdating) return;

    set({ isUpdating: true });

    const order = euler.type === "intrinsic" ? "XYZ" : "ZYX";
    const threeEuler = new THREE.Euler(
      THREE.MathUtils.degToRad(euler.x),
      THREE.MathUtils.degToRad(euler.y),
      THREE.MathUtils.degToRad(euler.z),
      order
    );

    const mat4 = new THREE.Matrix4().makeRotationFromEuler(threeEuler);
    const matrix = matrix4ToMatrix(mat4);

    // RPY 계산 (ZYX 순서)
    const rpyEuler = new THREE.Euler().setFromRotationMatrix(mat4, "ZYX");
    const rpy = {
      roll: THREE.MathUtils.radToDeg(rpyEuler.x),
      pitch: THREE.MathUtils.radToDeg(rpyEuler.y),
      yaw: THREE.MathUtils.radToDeg(rpyEuler.z),
    };

    const zyz = matrixToZYZ(mat4);

    set({
      matrix,
      rpy,
      euler,
      zyz,
      rotationMatrix4: mat4.clone(),
      isUpdating: false,
    });
  },

  updateFromZYZ: (zyz: ZYZAngles) => {
    if (get().isUpdating) return;

    set({ isUpdating: true });

    const mat4 = zyzToMatrix4(zyz);
    const matrix = matrix4ToMatrix(mat4);

    const rpyEuler = new THREE.Euler().setFromRotationMatrix(mat4, "ZYX");
    const rpy = {
      roll: THREE.MathUtils.radToDeg(rpyEuler.x),
      pitch: THREE.MathUtils.radToDeg(rpyEuler.y),
      yaw: THREE.MathUtils.radToDeg(rpyEuler.z),
    };

    set({
      matrix,
      rpy,
      zyz,
      rotationMatrix4: mat4.clone(),
      isUpdating: false,
    });
  },

  reset: () => {
    set(initialState);
  },
}));

// 유틸리티 함수들
function matrix4ToMatrix(mat4: THREE.Matrix4): RotationMatrix {
  const m = mat4.elements;
  // prettier-ignore
  return {
    m11: m[0], m12: m[4], m13: m[8],
    m21: m[1], m22: m[5], m23: m[9],
    m31: m[2], m32: m[6], m33: m[10],
  };
}

function matrixToZYZ(mat4: THREE.Matrix4): ZYZAngles {
  const m = mat4.elements;

  const theta = Math.acos(Math.max(-1, Math.min(1, m[10]))); // m33

  if (Math.abs(Math.sin(theta)) < 1e-6) {
    // Gimbal lock case
    const phi = 0;
    const psi = Math.atan2(m[1], m[0]); // m21, m11
    return {
      phi: THREE.MathUtils.radToDeg(phi),
      theta: THREE.MathUtils.radToDeg(theta),
      psi: THREE.MathUtils.radToDeg(psi),
    };
  } else {
    const phi = Math.atan2(m[6], -m[2]); // m32, -m31
    const psi = Math.atan2(m[9], m[8]); // m23, m13
    return {
      phi: THREE.MathUtils.radToDeg(phi),
      theta: THREE.MathUtils.radToDeg(theta),
      psi: THREE.MathUtils.radToDeg(psi),
    };
  }
}

function zyzToMatrix4(zyz: ZYZAngles): THREE.Matrix4 {
  const phi = THREE.MathUtils.degToRad(zyz.phi);
  const theta = THREE.MathUtils.degToRad(zyz.theta);
  const psi = THREE.MathUtils.degToRad(zyz.psi);

  const c1 = Math.cos(phi),
    s1 = Math.sin(phi);
  const c2 = Math.cos(theta),
    s2 = Math.sin(theta);
  const c3 = Math.cos(psi),
    s3 = Math.sin(psi);

  // prettier-ignore
  return new THREE.Matrix4().set(
    c1 * c2 * c3 - s1 * s3,    -c1 * c2 * s3 - s1 * c3,    c1 * s2,    0,
    s1 * c2 * c3 + c1 * s3,    -s1 * c2 * s3 + c1 * c3,    s1 * s2,    0,
    -s2 * c3,                   s2 * s3,                   c2,         0,
    0,                          0,                         0,          1
  );
}
