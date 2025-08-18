import { create } from "zustand";
import { DHParams, DHConvention, DEFAULT_JOINT } from "@/types/dhparams";

interface DHParameterStore {
  joints: DHParams[];
  convention: DHConvention;

  setConvention: (convention: DHConvention) => void;
  updateJoint: (
    id: string,
    field: keyof Omit<DHParams, "id">,
    value: number
  ) => void;
  addJoint: () => void;
  removeJoint: () => void;
  resetJoints: () => void;
}

export const useDHParameterStore = create<DHParameterStore>((set, get) => ({
  joints: [{ id: "1", ...DEFAULT_JOINT }],
  convention: "standard",

  setConvention: (convention) => set({ convention }),

  updateJoint: (id, field, value) =>
    set((state) => ({
      joints: state.joints.map((joint) =>
        joint.id === id ? { ...joint, [field]: value } : joint
      ),
    })),

  addJoint: () =>
    set((state) => {
      const newId = String(state.joints.length + 1);
      return {
        joints: [...state.joints, { id: newId, ...DEFAULT_JOINT, d: 0.5 }],
      };
    }),

  removeJoint: () =>
    set((state) => ({
      joints:
        state.joints.length > 1 ? state.joints.slice(0, -1) : state.joints,
    })),

  resetJoints: () => set({ joints: [{ id: "1", ...DEFAULT_JOINT }] }),
}));
