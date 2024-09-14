import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  color: string;
}

export function MetricCard({ title, value, color }: MetricCardProps) {
  return (
    <div className={`bg-${color}-800 p-2 rounded`}>
      <div className="text-sm text-gray-400">{title}</div>
      <div className={`text-lg font-semibold text-${color}-500`}>{value}</div>
    </div>
  );
}