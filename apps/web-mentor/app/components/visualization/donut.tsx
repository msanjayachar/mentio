import { DonutChartProps } from "@shared/types";

export default function DonutChart({
  items,
  size = 200,
  strokeWidth = 40,
}: DonutChartProps) {
  const values = items.map((item) => item.value);
  const colors = items.map((item) => item.color);

  const total = values.reduce((a, b) => a + b, 0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  const colorMap = {
    "bg-blue-500": "#3b82f6",
    "bg-rose-400": "#fb7185",
    "bg-indigo-300": "#a5b4fc",
    "bg-indigo-900": "#312e81",
    "bg-red-800": "#991b1b",
  } as const;

  return (
    <svg width={size} height={size}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {values.map((val, i) => {
          const fraction = val / total;
          const dash = fraction * circumference;

          const circle = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={
                colors[i]
                  ? colorMap[colors[i] as keyof typeof colorMap]
                  : "#ccc"
              }
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset={-offset}
            />
          );

          offset += dash;
          return circle;
        })}
      </g>

      {/* Numbers inside segments */}
      {values.map((val, i) => {
        const angle =
          ((values.slice(0, i).reduce((a, b) => a + b, 0) + val / 2) / total) *
          2 *
          Math.PI;

        const x = size / 2 + Math.cos(angle - Math.PI / 2) * radius * 0.7;
        const y = size / 2 + Math.sin(angle - Math.PI / 2) * radius * 0.7;

        return (
          <text
            key={`text-${i}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="16"
          >
            {val}
          </text>
        );
      })}
    </svg>
  );
}
