import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

interface LineProps {
  lineColor: string;
  gridDisplay?: boolean;
  fill?: boolean;
  fillColors?: string[];
  curve?: number;
  showPointer?: number;
  id: string;
  data: { x: string; y: number }[];
  data2?: { x: string; y: number }[];
}

const Line: React.FC<LineProps> = (
  {
    lineColor,
    gridDisplay,
    fill,
    fillColors,
    curve,
    showPointer,
    id,
    data,
    data2
  },
  chartRef
) => {
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!data2) return;

    const ctx = chartRef?.current?.getContext("2d");

    if (ctx && chartInstanceRef.current) {
      chartInstanceRef.current.data.labels = data.map((item) => item.x);
      chartInstanceRef.current.data.datasets[0].data = data.map((item) => item.y);

      if (chartInstanceRef.current.data.datasets.length === 1) {
        chartInstanceRef.current.data.datasets.push({
          label: "Data2",
          data: data2.map((item) => item.y),
          borderColor: "blue",
          borderWidth: 2,
          pointRadius: showPointer ?? 0,
          pointBackgroundColor: "white",
          fill: fill,
          backgroundColor: "white",
          tension: curve ?? 0.4,
        });
      } else {
        chartInstanceRef.current.data.datasets[1].data = data2.map((item) => item.y);
      }

      chartInstanceRef.current.update();
    }
  }, [data, data2, curve, fill, showPointer]);

  useEffect(() => {
    const ctx = chartRef?.current?.getContext("2d");

    if (ctx && !chartInstanceRef.current) {
      const labels = data.map((item) => item.x);

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Data",
              data: data.map((item) => item.y),
              borderColor: "red",
              borderWidth: 2,
              pointRadius: showPointer ?? 0,
              pointBackgroundColor: "white",
              fill: fill,
              backgroundColor: "white",
              tension: curve ?? 0.4,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: gridDisplay ?? true,
              grid: { color: "white" },
              ticks: {
                color: "white",
              },
            },
            y: {
              display: gridDisplay ?? true,
              grid: { color: "white" },
              ticks: {
                color: "white",
              },
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
      });
    }
  }, [chartRef, data, curve, fill, gridDisplay, showPointer]);

  return (
    <div className="h-full w-full relative">
      <canvas id={id} ref={chartRef} style={{ color: "white" }}>
        {" "}
      </canvas>
    </div>
  );
};

const LineChart = React.forwardRef(Line);
export default LineChart;
