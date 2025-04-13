"use client";

import { useEffect, useState } from "react";
import PatientCharts from "@/components/PatientCharts";
import API from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const [clinic, setClinic] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    async function fetchClinic() {
      try {
        const [profileRes, appointmentsRes] = await Promise.all([
          API.get("/klinik/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          API.get("/appointment-klinik", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ])
        

        const profileData = await profileRes.data;
        const appointmentsData = await appointmentsRes.data;

        if (profileRes.status === 200) {
          setClinic(profileData.data);
        } else {
          console.warn("Gagal ambil profil klinik:", data.message);
        }

        if (appointmentsRes.status === 200) {
          setAppointments(appointmentsData.data);
        }
        else {
          console.warn("Gagal ambil janji temu:", data.message);
        }
        
      } catch (err) {
        console.error("Error fetch clinic:", err);
      }
    }

    fetchClinic();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/klinik/login";
  }

  if (!clinic) return <p>Memuat profil klinik...</p>;

  return (
    <div className="flex">
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
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr className="border-b" key={index}>
                  <td className="p-2">{appointment.patient.name}</td>
                  <td className="p-2">{new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="p-2">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="px-5 py-3 bg-red-500" onClick={logout}>logout</button>
      </main>
    </div>
  );
}
