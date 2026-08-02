"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Frontend", "Backend", "DevOps", "QA"],
  datasets: [
    {
      label: "# of Jobs",
      data: [12, 19, 7, 3],
      backgroundColor: [
        "rgba(117, 169, 87, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(255, 99, 132, 0.7)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart() {
  return <Pie data={data} />;
}
