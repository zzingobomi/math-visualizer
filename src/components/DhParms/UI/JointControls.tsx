import React from "react";
import { Space, Button, Typography } from "antd";
import { PlusOutlined, MinusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDHParameterStore } from "@/stores/dhParameterStore";
import { ParameterSlider } from "@/components/common/ParameterSlider";
import { DH_PARAM_CONFIGS } from "@/types/dhparams";

const { Text } = Typography;

const PARAMETER_LABELS = {
  theta: "θ 회전",
  d: "d 오프셋",
  a: "a 길이",
  alpha: "α 비틀림",
} as const;

export const JointControls: React.FC = React.memo(() => {
  const { joints, addJoint, removeJoint, resetJoints, updateJoint } =
    useDHParameterStore();

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <div className="flex justify-between items-center">
        <Text strong>관절 제어 ({joints.length}개)</Text>
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<PlusOutlined />}
            onClick={addJoint}
          >
            추가
          </Button>
          <Button
            danger
            size="small"
            icon={<MinusOutlined />}
            onClick={removeJoint}
            disabled={joints.length <= 1}
          >
            제거
          </Button>
          <Button size="small" icon={<ReloadOutlined />} onClick={resetJoints}>
            초기화
          </Button>
        </Space>
      </div>

      {joints.map((joint) => (
        <div
          key={joint.id}
          className="p-4 border border-gray-200 rounded-lg bg-gray-50"
        >
          <Text strong className="block mb-3">
            관절 {joint.id}
          </Text>

          {Object.entries(DH_PARAM_CONFIGS).map(([paramKey, config]) => {
            const key = paramKey as keyof typeof DH_PARAM_CONFIGS;
            return (
              <ParameterSlider
                key={key}
                label={PARAMETER_LABELS[key]}
                value={joint[key]}
                config={config}
                onChange={(value) =>
                  value !== null && updateJoint(joint.id, key, value)
                }
              />
            );
          })}
        </div>
      ))}
    </Space>
  );
});
