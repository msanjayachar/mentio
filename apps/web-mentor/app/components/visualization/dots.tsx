type DotChartProps = {
  items: {
    label: string;
    value: number;
    color: string | undefined;
  }[];
};

function generateDots(count: number) {
  const positions: { x: number; y: number }[] = [];
  const size = 80;
  const minDist = 18;

  let attempts = 0;

  while (positions.length < count && attempts < 500) {
    const x = Math.random() * size;
    const y = Math.random() * size;

    const isFarEnough = positions.every(
      (p) => Math.hypot(p.x - x, p.y - y) > minDist,
    );

    if (isFarEnough) {
      positions.push({ x, y });
    }

    attempts++;
  }

  return positions;
}

export default function DotChart({ items }: DotChartProps) {
  return (
    <div className="mb-8 flex w-full items-end justify-between gap-10">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="relative h-24 w-24">
            {generateDots(item.value).map((pos, idx) => (
              <div
                key={idx}
                className={`absolute rounded-full ${item.color}`}
                style={{
                  width: 16,
                  height: 16,
                  left: pos.x,
                  top: pos.y,
                }}
              />
            ))}
          </div>

          <div className="mt-3 text-sm text-gray-700">
            <span className="mr-2 font-semibold">{item.value}</span>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
