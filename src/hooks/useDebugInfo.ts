import { useEffect } from "react";
import { DHParams, DHConvention } from "@/types/dhparams";

export const useDebugInfo = (joints: DHParams[], convention: DHConvention) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("DH Parameters Updated:", {
        convention,
        jointCount: joints.length,
        joints: joints.map((j) => ({
          id: j.id,
          theta: j.theta,
          d: j.d,
          a: j.a,
          alpha: j.alpha,
        })),
      });
    }
  }, [joints, convention]);
};
