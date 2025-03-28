<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard Klinik</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body class="bg-slate-100">
    <!-- Sidebar -->
    <div class="flex">
      <aside class="w-64 bg-slate-700 text-white min-h-screen p-5">
        <h1 class="text-lg font-bold mb-5">Klinik Tong Seng</h1>
        <ul>
          <li class="mb-3">
            <a href="#" class="block p-2 bg-slate-600 rounded">Beranda</a>
          </li>
          <li class="mb-3">
            <a href="#" class="block p-2 hover:bg-slate-600 rounded"
              >Janji Temu</a
            >
          </li>
          <li>
            <a href="#" class="block p-2 hover:bg-slate-600 rounded">Laporan</a>
          </li>
        </ul>
      </aside>

      <!-- Konten utama -->
      <main class="flex-1 p-6">
        <!-- Header -->
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-white p-5 rounded-lg shadow">
            <p class="text-sm text-gray-500">Pasien Hari Ini</p>
            <h2 class="text-lg font-bold">50</h2>
          </div>
          <div class="bg-white p-5 rounded-lg shadow">
            <p class="text-sm text-gray-500">Pasien Bulan Ini</p>
            <h2 class="text-lg font-bold">1200</h2>
          </div>
          <div class="bg-white p-5 rounded-lg shadow">
            <p class="text-sm text-gray-500">Janji Temu Aktif</p>
            <h2 class="text-lg font-bold">30</h2>
          </div>
        </div>

        <!-- Grafik Placeholder -->
        <div
          class="bg-white p-6 mt-6 rounded-lg shadow h-48 items-center justify-center"
        >
          <h1 class="font-bold text-lg">Jumlah Pasien per Bulan</h1>
          <canvas id="myChart" class="w-full h-full"></canvas>
        </div>

        <div
          class="bg-white pt-6 pb-10 px-6 mt-6 rounded-lg shadow h-52 items-center justify-center w-1/2"
        >
          <h1 class="font-bold text-lg">Keluhan Pasien</h1>
          <canvas id="pieChart" class="w-full h-full"></canvas>
        </div>

        <!-- Tabel Janji Temu -->
        <div class="bg-white p-6 mt-6 rounded-lg shadow">
          <h3 class="text-lg font-bold mb-3">Janji Temu Hari Ini</h3>
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-slate-700 text-white">
                <th class="p-2">Nama</th>
                <th class="p-2">Waktu</th>
                <th class="p-2">Keluhan</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="p-2">Budi Santoso</td>
                <td class="p-2">09:00</td>
                <td class="p-2">Batuk</td>
              </tr>
              <tr class="border-b">
                <td class="p-2">Ani Wijaya</td>
                <td class="p-2">10:30</td>
                <td class="p-2">Demam</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>

    <script>
      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Januari", "Februari", "Maret", "April", "Mei"],
          datasets: [
            {
              label: "Jumlah Pasien",
              data: [50, 75, 100, 125, 150],
              backgroundColor: "rgba(30, 64, 175, 0.6)",
              borderColor: "rgba(30, 64, 175, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Supaya grafik bisa menyesuaikan div
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      const ctxPie = document.getElementById("pieChart").getContext("2d");

      new Chart(ctxPie, {
        type: "pie",
        data: {
          labels: ["Batuk", "Demam", "Sakit Kepala", "Flu", "Diare"],
          datasets: [
            {
              data: [30, 25, 20, 15, 10], // Persentase keluhan
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)", // Merah
                "rgba(54, 162, 235, 0.7)", // Biru
                "rgba(255, 206, 86, 0.7)", // Kuning
                "rgba(75, 192, 192, 0.7)", // Hijau
                "rgba(153, 102, 255, 0.7)", // Ungu
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right", // Posisi legenda di kanan
            },
          },
        },
      });
    </script>
  </body>
</html>
