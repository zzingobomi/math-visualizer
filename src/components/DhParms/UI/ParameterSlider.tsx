import React from "react";
import { Row, Slider, InputNumber, Typography } from "antd";
import { ParameterConfig } from "@/types/dhparams";

const { Text } = Typography;

interface ParameterSliderProps {
  label: string;
  value: number;
  config: ParameterConfig;
  onChange: (value: number | null) => void;
}

export const ParameterSlider = React.memo(
  ({ label, value, config, onChange }: ParameterSliderProps) => {
    const { min, max, step, precision, unit, color } = config;

    const handleChange = (newValue: number | null) => {
      if (newValue !== null) {
        onChange(newValue);
      }
    };

    return (
      <div className="mb-4">
        <Row justify="space-between" align="middle" className="mb-2">
          <Text strong style={{ color }}>
            {label}
          </Text>
          <InputNumber
            size="small"
            value={value}
            min={min}
            max={max}
            step={step}
            precision={precision}
            onChange={handleChange}
            className="w-24"
            addonAfter={unit}
          />
        </Row>
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          styles={{
            track: { backgroundColor: color },
            handle: { borderColor: color },
          }}
        />
      </div>
    );
  }
);
