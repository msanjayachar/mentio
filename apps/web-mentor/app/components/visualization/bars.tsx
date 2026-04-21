import { BarChartProps } from "@shared/types";
import { useEffect, useState } from "react";

export default function BarChart({ items, height = 200 }: BarChartProps) {
  const max = Math.max(...items.map((i) => i.value));
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="flex w-full items-end justify-between gap-6">
      {items.map((item, i) => {
        const barHeight = (item.value / max) * height;

        return (
          <div key={i} className="flex flex-1 flex-col items-center">
            <div className="mb-2 text-sm text-gray-700">{item.value}</div>

            <div
              className={`w-full max-w-56 min-w-28 rounded-[3px] rounded-tr-xl ${item.color} transition-all duration-700 ease-out`}
              style={{
                height: animate ? barHeight : 0,
              }}
            />

            <div className={`mt-2 text-sm text-gray-500`}>{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}
