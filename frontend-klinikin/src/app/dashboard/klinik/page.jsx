import PatientCharts from "@/components/PatientCharts";

export default function DashboardPage() {
  return (
    <div className="flex">
      <aside className="w-64 bg-slate-700 text-white min-h-screen p-5">
        <h1 className="text-lg font-bold mb-5">Klinik Tong Seng</h1>
        <ul>
          <li className="mb-3"><a href="#" className="block p-2 bg-slate-600 rounded">Beranda</a></li>
          <li className="mb-3"><a href="#" className="block p-2 hover:bg-slate-600 rounded">Janji Temu</a></li>
          <li><a href="#" className="block p-2 hover:bg-slate-600 rounded">Laporan</a></li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500">Pasien Hari Ini</p>
            <h2 className="text-lg font-bold">50</h2>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500">Pasien Bulan Ini</p>
            <h2 className="text-lg font-bold">1200</h2>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <p className="text-sm text-gray-500">Janji Temu Aktif</p>
            <h2 className="text-lg font-bold">30</h2>
          </div>
        </div>

        <PatientCharts />

        <div className="bg-white p-6 mt-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-3">Janji Temu Hari Ini</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-700 text-white">
                <th className="p-2">Nama</th>
                <th className="p-2">Waktu</th>
                <th className="p-2">Keluhan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Budi Santoso</td>
                <td className="p-2">09:00</td>
                <td className="p-2">Batuk</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Ani Wijaya</td>
                <td className="p-2">10:30</td>
                <td className="p-2">Demam</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}