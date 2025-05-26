"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import API from "@/lib/api";
import NavbarUmum from "@/components/NavbarUmum";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login/klinik", formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        router.push("/dashboard/klinik");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <NavbarUmum />
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100 pb-7">
        <h1 className="text-2xl font-bold text-slate-700 mb-4">Login Klinik</h1>
        <p className="text-slate-600 mb-4">Silahkan login untuk melanjutkan</p>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border border-slate-300 rounded-lg px-4 py-2"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border border-slate-300 rounded-lg px-4 py-2"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-slate-600 mt-4">
          Belum punya akun?{" "}
          <Link
            href="/auth/klinik/register"
            className="text-blue-500 hover:underline"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
