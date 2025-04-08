'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, PieController, CategoryScale, LinearScale, ArcElement, BarElement, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(BarController, PieController, CategoryScale, LinearScale, ArcElement, BarElement, Legend);

export default function PatientCharts()  {
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    // Initialize bar chart
    const barChart = new Chart(chartRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei'],
        datasets: [{
          label: 'Jumlah Pasien',
          data: [50, 75, 100, 125, 150],
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

    // Initialize pie chart
    const pieChart = new Chart(pieChartRef.current.getContext('2d'), {
      type: 'pie',
      data: {
        labels: ['Batuk', 'Demam', 'Sakit Kepala', 'Flu', 'Diare'],
        datasets: [{
          data: [30, 25, 20, 15, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });

    return () => {
      barChart.destroy();
      pieChart.destroy();
    };
  }, []);

  return (
    <>
      <div className="bg-white p-6 mt-6 rounded-lg shadow h-48 items-center justify-center">
        <h1 className="font-bold text-lg">Jumlah Pasien per Bulan</h1>
        <canvas ref={chartRef} className="w-full h-full" />
      </div>

      <div className="bg-white pt-6 pb-10 px-6 mt-6 rounded-lg shadow h-52 items-center justify-center w-1/2">
        <h1 className="font-bold text-lg">Keluhan Pasien</h1>
        <canvas ref={pieChartRef} className="w-full h-full" />
      </div>
    </>
  );
};
