"use client";

import { useState, useEffect } from "react";
import API from "@/lib/api";
import { use } from "react";

export default function KlinikPage({ params }) {
  const { id } = use(params);
  const [klinik, setKlinik] = useState(null);

  useEffect(() => {
    const fetchKlinik = async () => {
      try {
        const response = await API.get(`/klinik/${id}`);
        setKlinik(response.data);
      } catch (error) {
        console.error("Failed to fetch klinik data:", error);
      }
    };

    fetchKlinik();
  }, [id]);

  const createAppointment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda belum log in!");
      return;
    }

    try {
      const res = await API.post("/appointment", {
        clinicId: id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 201) {
        alert("Appointment created successfully!");
      } else {
        alert("Failed to create appointment!");
      }
    } catch (error) {
      console.error("Failed to create appointment:", error.response?.data || error);
      alert("Gagal membuat appointment!");
    }
  };

  if (!klinik) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <h1 className="text-2xl font-bold text-slate-700 mb-4">Klinik Detail</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-slate-800">
          {klinik.data.name}
        </h2>
        <p className="text-slate-600 mt-2">{klinik.data.address}</p>
        <p className="text-slate-600 mt-2">{klinik.data.location}</p>
      </div>
      <section
        id="form-pasien"
        className="w-full py-10 bg-gradient-to-bl from-[#d31027] via-[#ea384d] to-[#7e0d14]"
      >
        <button
          className="bg-white text-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 hover:text-white transition duration-200"
          onClick={createAppointment}
        >
          Daftar Janji Temu
        </button>
      </section>
    </div>
  );
}
