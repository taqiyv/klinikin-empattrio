"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function PatientDashboard() {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchData() {
      try {
        const [profileRes, appointmentsRes] = await Promise.all([
        API.get("/patient/dashboard", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          API.get("/appointment", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ]);

        const profileData = await profileRes.data;
        const appointmentsData = await appointmentsRes.data;

        if (profileRes.status === 200) {
          setProfile(profileData.data);
        } else {
          console.error("Gagal ambil profil");
        }

        if (appointmentsRes.status === 200) {
          setAppointments(appointmentsData.data);
        } else {
          console.error("Gagal ambil appointment");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (token) {
      fetchData();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/patient/login";
  };

  if (!profile) return <p>Loading...</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-700 mb-4">Dashboard Pasien</h1>
      <p className="text-slate-600 mb-4">Selamat datang di dashboard pasien KlinikIn. Anda dapat melihat jadwal, riwayat kesehatan, dan melakukan booking klinik.</p>
      <div className="flex flex-col space-y-4">
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-sm text-gray-500">Nama</p>
          <h2 className="text-lg font-bold">{profile.name}</h2>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-sm text-gray-500">Appointments</p>
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index} className="text-lg">
                {appointment.patient.name} - {appointment.clinic.name} - {new Date(appointment.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="px-7 bg-red-500 py-2" onClick={logout}>logout</button>
    </div>
  );
}