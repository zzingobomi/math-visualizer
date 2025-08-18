import { Card, Radio, Space, Typography } from "antd";
import { useDHParameterStore } from "@/stores/dhParameterStore";
import { DHConvention } from "@/types/dhparams";

const { Text } = Typography;

export default function DHConventionSelector() {
  const { convention, setConvention } = useDHParameterStore();

  const handleConventionChange = (e: any) => {
    setConvention(e.target.value as DHConvention);
  };

  return (
    <Card title="DH 표기법" size="small" variant="borderless">
      <Space direction="vertical" size="small" className="w-full">
        <Radio.Group
          value={convention}
          onChange={handleConventionChange}
          size="small"
        >
          <Radio.Button value="standard">Standard DH</Radio.Button>
          <Radio.Button value="modified">Modified DH</Radio.Button>
        </Radio.Group>
        <Text type="secondary" className="text-xs">
          <strong>Standard:</strong> 일반적인 DH 매개변수
          <br />
          <strong>Modified:</strong> 수정된 DH 매개변수
        </Text>
      </Space>
    </Card>
  );
}
