import { BarChartProps } from "@shared/types";

export default function BarChart({ items, height = 200 }: BarChartProps) {
  const max = Math.max(...items.map((i) => i.value));

  return (
    <div className="flex items-end gap-6">
      {items.map((item, i) => {
        const barHeight = (item.value / max) * height;

        return (
          <div key={i} className="flex flex-col items-center">
            <div className="mb-2 text-sm text-gray-700">{item.value}</div>

            <div
              className={`w-28 rounded-xl ${item.color}`}
              style={{
                height: barHeight,
              }}
            />

            <div className={`mt-2 text-sm text-gray-500`}>{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}
