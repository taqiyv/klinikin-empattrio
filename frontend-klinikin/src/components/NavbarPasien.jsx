"use client";
import Link from "next/link";
import API from "@/lib/api";

export default function NavbarPasien() {
  const logout = async () => {
    try {
      await API.post("/logout", {}, { withCredentials: true });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
          href="#rekom"
          className="text-white font-medium text-xs hover:text-sm transition-all flex items-center"
        >
          Cari Klinik
        </a>
        <a
          href="#form-pasien"
          className="text-white font-medium text-xs hover:text-sm transition-all flex items-center"
        >
          Janji Temu
        </a>
        <Link
          href="/"
          className="relative text-white font-medium text-xs transition-all bg-gradient-to-br from-[#232526] via-[#2b2b2c] to-[#17191a] px-3 py-2 rounded-lg overflow-hidden group flex items-center"
        >
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <button
            className="relative group-hover:text-[#d31027]"
            onClick={logout}
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}
