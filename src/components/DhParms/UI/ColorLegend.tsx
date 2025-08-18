import { Card, Space, Typography } from "antd";

const { Text } = Typography;

const LEGEND_ITEMS = [
  { color: "bg-red-500", label: "X축 (빨강)" },
  { color: "bg-green-500", label: "Y축 (초록)" },
  { color: "bg-blue-500", label: "Z축 (파랑)" },
  { color: "bg-teal-500", label: "관절 (청록)" },
];

export default function ColorLegend() {
  return (
    <Card title="색상 범례" size="small" variant="borderless">
      <Space direction="vertical" size="small">
        {LEGEND_ITEMS.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div className={`w-5 h-1 ${color} rounded-sm`} />
            <Text>{label}</Text>
          </div>
        ))}
      </Space>
    </Card>
  );
}
