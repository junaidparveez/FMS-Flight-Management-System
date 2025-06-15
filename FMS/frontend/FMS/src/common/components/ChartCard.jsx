import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import DropdownMenu from "./DropdownMenu";

const ChartCard = ({ title, chartId, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy previous chart instance if exists (prevents duplicate rendering)
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      // Create new Chart instance
      chartRef.current.chartInstance = new Chart(ctx, {
        type: "bar", // Change to 'line', 'pie', etc.
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [data]);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
        <DropdownMenu />
      </div>
      <div className="card-body">
        <div className="chart-area" style={{ height: "300px" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
