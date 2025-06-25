'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, PieController, CategoryScale, LinearScale, ArcElement, BarElement, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(BarController, PieController, CategoryScale, LinearScale, ArcElement, BarElement, Legend);

export default function PatientCharts()  {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize bar chart
    const barChart = new Chart(chartRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        datasets: [{
          label: 'Jumlah Pasien',
          data: [50, 75, 100, 125, 150, 200, 175, 225, 250, 300, 275, 350, 400],
          backgroundColor: 'rgba(30, 64, 175, 0.6)',
          borderColor: 'rgba(30, 64, 175, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      barChart.destroy();
    };
  }, []);

  return (
    <>
      <div className="bg-white p-6 mt-6 rounded-lg shadow h-48 items-center justify-center">
        <h1 className="font-bold text-lg">Jumlah Pasien per Bulan</h1>
        <canvas ref={chartRef} className="w-full h-full" />
      </div>
    </>
  );
};
