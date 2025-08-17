import { useMemo } from "react";
import * as math from "mathjs";
import {
  DHParams,
  DHConvention,
  ForwardKinematicsResult,
  calculateTransformMatrix,
  Vector3Tuple,
  Matrix4,
} from "@/types/dhparams";

export const useForwardKinematics = (
  joints: DHParams[],
  convention: DHConvention
): ForwardKinematicsResult => {
  return useMemo(() => {
    const positions: Vector3Tuple[] = [[0, 0, 0]];
    const matrices: Matrix4[] = [];
    const individual: Matrix4[] = [];
    let currentMatrix = math.identity(4) as Matrix4;

    joints.forEach((joint) => {
      const T = calculateTransformMatrix(joint, convention === "modified");
      individual.push(T);
      currentMatrix = math.multiply(currentMatrix, T) as Matrix4;
      matrices.push(currentMatrix.clone() as Matrix4);

      // 위치 추출
      const pos: Vector3Tuple = [
        currentMatrix.get([0, 3]) as number,
        currentMatrix.get([1, 3]) as number,
        currentMatrix.get([2, 3]) as number,
      ];
      positions.push(pos);
    });

    return { positions, matrices, final: currentMatrix, individual };
  }, [joints, convention]);
};
