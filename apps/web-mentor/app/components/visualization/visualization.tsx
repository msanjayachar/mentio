import BarChart from "./bars";
import DonutChart from "./donut";
import DotChart from "./dots";
import PieChart from "./pie";

type VisualizationProps = {
  items: {
    label: string;
    value: number;
    color: string | undefined;
  }[];
  height?: number;
  size?: number;
  visualizationType: "bar" | "pie" | "split" | "dots" | null;
};

const Visualization = ({
  items,
  height,
  visualizationType,
}: VisualizationProps) => {
  switch (visualizationType) {
    case "bar":
      return <BarChart items={items} height={height} />;

    case "pie":
      return <PieChart items={items} size={height} />;

    case "split":
      return <DonutChart items={items} />;

    case "dots":
      return <DotChart items={items} />;

    default:
      return null;
  }
};

export default Visualization;
