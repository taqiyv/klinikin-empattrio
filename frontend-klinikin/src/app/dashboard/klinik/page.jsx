"use client";

import { useEffect, useState } from "react";
import PatientCharts from "@/components/PatientCharts";
import API from "@/lib/api";

export default function DashboardPage() {
  const [clinic, setClinic] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchClinic() {
      try {
        const [profileRes, appointmentsRes] = await Promise.all([
          API.get("/klinik/me", { withCredentials: true }),
          API.get("/appointment-klinik", { withCredentials: true })
        ]);
        
        if (profileRes.status === 200) {
          setClinic(profileRes.data.data);
        } else {
          console.warn("Gagal ambil profil klinik:", profileRes.data.message);
          // Redirect ke login jika unauthorized
          if (profileRes.status === 401) {
            window.location.href = "/auth/klinik/login";
          }
        }

        if (appointmentsRes.status === 200) {
          setAppointments(appointmentsRes.data.data);
        } else {
          console.warn("Gagal ambil janji temu:", appointmentsRes.data.message);
        }
      } catch (err) {
        console.error("Error fetch clinic:", err);
        window.location.href = "/auth/klinik/login";
      } finally {
        setIsLoading(false);
      }
    }

    fetchClinic();
  }, []);

  const logout = async () => {
    try {
      await API.post("/logout", {}, { withCredentials: true });
      window.location.href = "/auth/klinik/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!clinic) {
    return <p className="text-center py-10">Tidak dapat memuat data klinik. Silakan coba lagi.</p>;
  }

  return (
    <div className="">
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard Klinik {clinic.name}</h1>
          <button 
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-700 text-white">
                  <th className="p-3 text-left">Nama Pasien</th>
                  <th className="p-3 text-left">Waktu</th>
                  <th className="p-3 text-left">Keluhan</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr className="border-b hover:bg-gray-50" key={index}>
                    <td className="p-3">{appointment.patient.name}</td>
                    <td className="p-3">
                      {new Date(appointment.date).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-3">{appointment.complaint || '-'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : appointment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {appointments.length === 0 && (
            <p className="text-center py-4 text-gray-500">Tidak ada janji temu hari ini</p>
          )}
        </div>
      </main>
    </div>
  );
}