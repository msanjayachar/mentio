import { BarChartProps, PieChartProps } from "@shared/types";
import { useEffect, useState } from "react";

export default function PieChart({ items, size = 200 }: PieChartProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const values = items.map((item) => item.value);
  const colors = items.map((item) => item.color);

  const total = values.reduce((a, b) => a + b, 0);
  const center = size / 2;
  const radius = center;

  let startAngle = 0;

  const getCoordinates = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  const colorMap = {
    "bg-blue-500": "#3b82f6",
    "bg-rose-400": "#fb7185",
    "bg-indigo-300": "#a5b4fc",
    "bg-indigo-900": "#312e81",
    "bg-red-800": "#991b1b",
  } as const;

  return (
    <div className="my-12 flex w-full items-center justify-center">
      <svg width={size} height={size}>
        {values.map((val, i) => {
          const sliceAngle = (val / total) * 360;
          const endAngle = startAngle + sliceAngle;

          const start = getCoordinates(startAngle - 90);
          const end = getCoordinates(endAngle - 90);

          const largeArcFlag = sliceAngle > 180 ? 1 : 0;

          const pathData = `
          M ${center} ${center}
          L ${start.x} ${start.y}
          A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
          Z
        `;

          const midAngle = startAngle + sliceAngle / 2;
          const labelPos = getCoordinates(midAngle - 90);

          const labelX = center + (labelPos.x - center) * 0.6;
          const labelY = center + (labelPos.y - center) * 0.6;

          const slice = (
            <g
              key={i}
              style={{
                transform: `scale(${animate ? 1 : 0})`,
                transformOrigin: `${center}px ${center}px`,
              }}
              className="transition-transform duration-700 ease-out"
            >
              transformOrigin={`${center}px ${center}px`}
              <path
                d={pathData}
                fill={
                  colors[i]
                    ? colorMap[colors[i] as keyof typeof colorMap]
                    : "#ccc"
                }
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={i === 1 ? "black" : "white"}
                fontSize="16"
              >
                {val}
              </text>
            </g>
          );

          startAngle = endAngle;
          return slice;
        })}
      </svg>
    </div>
  );
}
