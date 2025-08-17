import React from "react";
import { Card, Radio, Space, Typography } from "antd";
import { useDHParameterStore } from "@/stores/dhParameterStore";
import { DHConvention } from "@/types/dhparams";

const { Text } = Typography;

export const DHConventionSelector: React.FC = React.memo(() => {
  const { convention, setConvention } = useDHParameterStore();

  const handleConventionChange = (e: any) => {
    setConvention(e.target.value as DHConvention);
  };

  return (
    <Card title="DH 표기법" size="small" variant="borderless">
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Radio.Group
          value={convention}
          onChange={handleConventionChange}
          size="small"
        >
          <Radio.Button value="standard">Standard DH</Radio.Button>
          <Radio.Button value="modified">Modified DH</Radio.Button>
        </Radio.Group>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          <strong>Standard:</strong> 일반적인 DH 매개변수
          <br />
          <strong>Modified:</strong> 수정된 DH 매개변수
        </Text>
      </Space>
    </Card>
  );
});
