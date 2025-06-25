"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NavbarUmum() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await API.get("/auth-check", { withCredentials: true });
        setIsAuthenticated(res.data?.isAuthenticated || false);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [router]); // Tambahkan router sebagai dependency

  // ... (kode JSX tetap sama)

  if (isLoading) {
    return (
      <div className="flex justify-between items-center h-16 bg-gradient-to-tr from-[#d31027] via-[#ea384d] to-[#7e0d14] sticky top-0 z-50">
        <Link href="/" className="ml-10 text-white font-bold text-xl">
          Klinikin
        </Link>
        <div className="mr-10">
          <div className="h-8 w-20 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center h-16 bg-gradient-to-tr from-[#d31027] via-[#ea384d] to-[#7e0d14] sticky top-0 z-50">
      <Link href="/" className="ml-10 text-white font-bold text-xl">
        Klinikin
      </Link>
      <div className="flex space-x-8 mr-10">
        <a
          href="#home"
          className="text-white font-medium text-xs hover:text-sm transition-all flex items-center"
        >
          Beranda
        </a>
        <a
          href="#artikel"
          className="text-white font-medium text-xs hover:text-sm transition-all flex items-center"
        >
          Artikel
        </a>
        <a
          href="#rekom"
          className="text-white font-medium text-xs hover:text-sm transition-all flex items-center"
        >
          Klinik
        </a>
        {isAuthenticated ? (
          <Link
            href="/dashboard/patient"
            className="relative text-white font-medium text-xs transition-all bg-gradient-to-br from-[#232526] via-[#2b2b2c] to-[#17191a] px-3 py-2 rounded-lg overflow-hidden group flex items-center"
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Dashboard</span>
          </Link>
        ) : (
          <Link
            href="/patient/login"
            className="relative text-white font-medium text-xs transition-all bg-gradient-to-br from-[#232526] via-[#2b2b2c] to-[#17191a] px-3 py-2 rounded-lg overflow-hidden group flex items-center"
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
