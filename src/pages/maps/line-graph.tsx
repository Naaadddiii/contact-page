import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchHistoricalData } from "../../services/data";

// Register the necessary Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph: React.FC = () => {
  const { data, isLoading, error } = useQuery(
    "historicalData",
    fetchHistoricalData
  );

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading data</p>;

  const chartData = {
    labels: Object.keys(data.cases), // X-axis data (categories)
    datasets: [
      {
        label: "Cases",
        data: Object.values(data.cases), // Y-axis data for cases
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Recovered",
        data: Object.values(data.recovered), // Y-axis data for recovered cases
        borderColor: "rgba(75,192,75,1)",
        fill: false,
      },
      {
        label: "Deaths",
        data: Object.values(data.deaths), // Y-axis data for deaths
        borderColor: "rgba(192,75,75,1)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category" as const, // Use the specific string 'category'
      },
    },
  };

  return <Line data={chartData} options={options} className="w-full h-96" />;
};

export default LineGraph;
