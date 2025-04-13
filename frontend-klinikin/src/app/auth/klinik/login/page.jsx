"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import API from "@/lib/api";

export default function LoginPage() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login/klinik", {
        email,
        password
      })

      const data = await res.data;

      if (res.status === 200) {
        localStorage.setItem("token", data.token); // Simpan token klinik
        router.push("/dashboard/klinik"); // Arahkan ke dashboard klinik
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-100 pb-7">
        <h1 className="text-2xl font-bold text-slate-700 mb-4">Login Klinik</h1>
        <p className="text-slate-600 mb-4">Silahkan login untuk melanjutkan</p>
        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <input
            name="email"
            type="email"
            value={email}
            placeholder="Email"
            className="border border-slate-300 rounded-lg px-4 py-2"
            onChange={e => setEmail(e.target.value)}
            required
            />
            <input
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            className="border border-slate-300 rounded-lg px-4 py-2"
            onChange={e => setPassword(e.target.value)}
            required
            />
            <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
            >
            Login
            </button>
        </form>
        <p className="text-slate-600 mt-4">Belum punya akun? <Link href="/auth/klinik/register" className="text-blue-500 hover:underline">Daftar di sini</Link></p>
        </div>
    );
}