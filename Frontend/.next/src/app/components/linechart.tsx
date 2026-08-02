"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Job Trends",
      data: [33, 45, 28, 50, 42, 60, 55],
      fill: false,
      backgroundColor: "rgba(117, 169, 87, 0.7)",
      borderColor: "rgba(117, 169, 87, 1)",
    },
  ],
};

export default function LineChart() {
  return <Line data={data} />;
}
