import { identity, matrix } from "mathjs";
import { Matrix4, Vector3Tuple, Matrix3x3 } from "@/types/dhparams";

export const matrixUtils = {
  // Matrix에서 위치 추출
  extractPosition: (matrix: Matrix4): Vector3Tuple => [
    matrix.get([0, 3]) as number,
    matrix.get([1, 3]) as number,
    matrix.get([2, 3]) as number,
  ],

  // Matrix에서 회전 추출
  extractRotation: (mat: Matrix4): Matrix3x3 =>
    matrix([
      [mat.get([0, 0]), mat.get([0, 1]), mat.get([0, 2])],
      [mat.get([1, 0]), mat.get([1, 1]), mat.get([1, 2])],
      [mat.get([2, 0]), mat.get([2, 1]), mat.get([2, 2])],
    ]) as Matrix3x3,

  // 숫자 포맷팅
  formatNumber: (num: number, precision = 3, padding = 7): string =>
    num.toFixed(precision).padStart(padding, " "),

  // Matrix 유효성 검사
  isValidTransformMatrix: (matrix: Matrix4): boolean => {
    try {
      const size = matrix.size();
      return size[0] === 4 && size[1] === 4;
    } catch {
      return false;
    }
  },

  // Matrix 복사
  cloneMatrix: (matrix: Matrix4): Matrix4 => matrix.clone() as Matrix4,

  // Identity Matrix 생성
  createIdentity: (): Matrix4 => identity(4) as Matrix4,
};
