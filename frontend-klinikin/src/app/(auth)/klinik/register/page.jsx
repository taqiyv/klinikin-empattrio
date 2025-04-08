"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import API from "@/lib/api";

export default function RegisterKlinik() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        location: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/register/klinik", formData);
            router.push("/auth/klinik/login");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please check your details.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Register Klinik</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Nama Klinik" className="w-full border border-gray-300 rounded-md p-2" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" className="w-full border border-gray-300 rounded-md p-2" onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Alamat" className="w-full border border-gray-300 rounded-md p-2" onChange={handleChange} required />
                    <input type="text" name="location" placeholder="Lokasi" className="w-full border border-gray-300 rounded-md p-2" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" className="w-full border border-gray-300 rounded-md p-2" onChange={handleChange} required />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">Register</button>
                </form>
            </div>
        </div>
    )
}