import React from "react";
import Chart from "react-apexcharts";

const AreaChart = () => {
  return (
    <div className="container-fluid mb-3 mt-3">
      <Chart
        type="area"
        height={250}
        series={[
          {
            name: "Commits",
            data: [10, 50, 10],
          },
        ]}
        options={{
          colors: ["#F7CD5D"],
          stroke: { width: 0, curve: "smooth" },
          xaxis: {
            categories: ["5:00 AM", "2:00 PM", "7:00 PM"],
          },
          yaxis: {
            enabled: false,
          },
        }}
      />
    </div>
  );
};

export default AreaChart;
