import React from "react";
import { Row, Slider, InputNumber, Typography } from "antd";
import { debounce } from "lodash";
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

    const debouncedChange = React.useMemo(
      () => debounce((val: number) => onChange(val), 16), // 16ms ≈ 60FPS
      [onChange]
    );

    const handleChange = (newValue: number | null) => {
      if (newValue !== null) {
        debouncedChange(newValue);
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
