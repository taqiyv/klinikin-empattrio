"use client";

import { useState, useEffect, use } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function KlinikPage({ params }) {
  const { id } = use(params);
  const [klinik, setKlinik] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Cek status autentikasi
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/auth-check", { withCredentials: true });
        setIsAuthenticated(res.data?.isAuthenticated || false);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Ambil data klinik
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
    if (!isAuthenticated) {
      alert("Anda harus login terlebih dahulu!");
      router.push("/auth/patient/login");
      return;
    }

    try {
      const res = await API.post(
        "/appointment",
        { clinicId: id },
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Janji temu berhasil dibuat!");
      } else {
        alert("Gagal membuat janji temu: " + (res.data?.message || ""));
      }
    } catch (error) {
      console.error("Failed to create appointment:", error);
      alert("Gagal membuat janji temu: " + (error.response?.data?.message || ""));
      
      // Jika token tidak valid, redirect ke login
      if (error.response?.status === 401) {
        router.push("/auth/patient/login");
      }
    }
  };

  if (isLoading || !klinik) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 py-10">
      <h1 className="text-2xl font-bold text-slate-700 mb-4">Detail Klinik</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            {klinik.data.name}
          </h2>
          <p className="text-slate-600 mt-2">
            <span className="font-medium">Alamat:</span> {klinik.data.address}
          </p>
          <p className="text-slate-600 mt-2">
            <span className="font-medium">Lokasi:</span> {klinik.data.location}
          </p>
          {klinik.data.description && (
            <p className="text-slate-600 mt-2">
              <span className="font-medium">Deskripsi:</span> {klinik.data.description}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className={`bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200 ${
              !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={createAppointment}
            disabled={!isAuthenticated}
          >
            Buat Janji Temu
          </button>
        </div>
        {!isAuthenticated && (
          <p className="text-sm text-red-500 mt-2 text-center">
            Anda harus login terlebih dahulu untuk membuat janji temu
          </p>
        )}
      </div>
    </div>
  );
}