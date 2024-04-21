import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import React from "react";
interface BarChartProps{

}
const BarChart: React.FC<BarChartProps> =({},chartRef) => {
  useEffect(() => {
    let ctx;

    if (ctx == null) {
      ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Category A", "Category B", "Category C"],
          datasets: [
            {
              label: "Data 1",
              data: [3, 5, 2, 8],
              backgroundColor: "red",
              borderColor: "red",
              borderWidth: 1,
              borderRadius: 5,
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
              grid: { color: "white" },
              ticks: {
                color:"white"
              },
            },
            y: {
              grid: { color: "white" },
              ticks: {
                color:"white"
              },
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            roundedBars: {},
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, []);

  return (
    <div className="h-full w-full relative">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
const Bar = React.forwardRef(BarChart);
export default Bar;

