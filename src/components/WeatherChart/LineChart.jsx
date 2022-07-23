import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ chartData }) => {
  let color = "#87CEEB";
  return <Line data={chartData} fill={color} />;
};

export default LineChart;
