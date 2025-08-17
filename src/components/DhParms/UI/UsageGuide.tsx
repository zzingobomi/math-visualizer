import React from "react";
import { Card, Space, Typography } from "antd";

const { Text } = Typography;

const USAGE_TIPS = [
  "• 마우스 드래그로 3D 뷰 회전",
  "• 휠 스크롤로 확대/축소",
  "• 슬라이더로 관절 매개변수 조정",
  "• 실시간 변환 행렬 계산 확인",
] as const;

export const UsageGuide: React.FC = React.memo(() => (
  <Card title="사용 방법" size="small" variant="borderless">
    <Space direction="vertical" size="small">
      {USAGE_TIPS.map((tip) => (
        <Text key={tip}>{tip}</Text>
      ))}
    </Space>
  </Card>
));
