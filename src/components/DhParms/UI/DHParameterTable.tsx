import { useState } from "react";
import { Table, Tag, Button } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { useDHParameterStore } from "@/stores/dhParameterStore";
import { DH_PARAM_CONFIGS, DHParams } from "@/types/dhparams";

export default function DHParameterTable() {
  const { joints, convention } = useDHParameterStore();
  const [collapsed, setCollapsed] = useState(false);

  const formatValue = (value: number, param: keyof Omit<DHParams, "id">) => {
    const config = DH_PARAM_CONFIGS[param];
    return `${value.toFixed(config.precision)}${config.unit || ""}`;
  };

  const columns = [
    {
      title: "Joint",
      dataIndex: "joint",
      key: "joint",
      width: 60,
      render: (text: string, record: any, index: number) => (
        <div className="flex items-center">
          <div
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: index === 0 ? "#ff6b6b" : "#4ecdc4" }}
          />
          <span className="font-medium text-white">{text}</span>
        </div>
      ),
    },
    {
      title: "θ",
      dataIndex: "theta",
      key: "theta",
      width: 60,
      align: "center" as const,
      render: (value: number) => (
        <span
          style={{ color: DH_PARAM_CONFIGS.theta.color }}
          className="font-mono font-medium text-xs"
        >
          {formatValue(value, "theta")}
        </span>
      ),
    },
    {
      title: "d",
      dataIndex: "d",
      key: "d",
      width: 50,
      align: "center" as const,
      render: (value: number) => (
        <span
          style={{ color: DH_PARAM_CONFIGS.d.color }}
          className="font-mono font-medium text-xs"
        >
          {formatValue(value, "d")}
        </span>
      ),
    },
    {
      title: "a",
      dataIndex: "a",
      key: "a",
      width: 50,
      align: "center" as const,
      render: (value: number) => (
        <span
          style={{ color: DH_PARAM_CONFIGS.a.color }}
          className="font-mono font-medium text-xs"
        >
          {formatValue(value, "a")}
        </span>
      ),
    },
    {
      title: "α",
      dataIndex: "alpha",
      key: "alpha",
      width: 60,
      align: "center" as const,
      render: (value: number) => (
        <span
          style={{ color: DH_PARAM_CONFIGS.alpha.color }}
          className="font-mono font-medium text-xs"
        >
          {formatValue(value, "alpha")}
        </span>
      ),
    },
  ];

  const dataSource = joints.map((joint, index) => ({
    key: joint.id,
    joint: `J${index + 1}`,
    theta: joint.theta,
    d: joint.d,
    a: joint.a,
    alpha: joint.alpha,
  }));

  return (
    <div className="absolute top-4 right-4 z-10 bg-gray-900 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-white">DH Parameters</h3>
            <Tag
              color={convention === "standard" ? "blue" : "green"}
              className="text-xs"
            >
              {convention.toUpperCase()}
            </Tag>
          </div>
          <Button
            type="text"
            size="small"
            icon={collapsed ? <DownOutlined /> : <UpOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-6 h-6 p-0 text-white hover:text-blue-400"
          />
        </div>
      </div>

      {/* Table */}
      {!collapsed && (
        <div className="p-2">
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            size="small"
            className="dh-parameter-table bg-transparent"
            style={{
              fontSize: "11px",
              backgroundColor: "transparent",
            }}
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    className="bg-gray-800 text-gray-300 border-gray-700 text-xs font-medium"
                  />
                ),
              },
              body: {
                row: (props: any) => (
                  <tr
                    {...props}
                    className="bg-gray-850 hover:bg-gray-800 border-gray-700"
                  />
                ),
                cell: (props: any) => (
                  <td {...props} className="border-gray-700" />
                ),
              },
            }}
          />
        </div>
      )}

      {/* Footer Info */}
      {!collapsed && (
        <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 border-t border-gray-700">
          {joints.length} joint{joints.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
