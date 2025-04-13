"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api"; // pastiin path-nya sesuai ya

export default function ProfilePage() {
  const [dataForm, setDataForm] = useState({
    name: "",
    address: "",
    location: "",
    acceptsBPJS: false,
    specializationIds: [],
    description: "",
    whatsappLink: "",
    images: "",
  });

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchProfile() {
      try {
        const res = await API.get("/klinik/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          const data = res.data;
          setProfile(data.data);
        } else {
          console.error("Gagal ambil profil klinik:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }

    if (token) {
      fetchProfile();
    }
  }, []);

  // Sinkronisasi profile ke dataForm saat profile pertama kali didapat
  useEffect(() => {
    if (profile) {
      setDataForm({
        name: profile.name || "",
        address: profile.address || "",
        location: profile.location || "",
        acceptsBPJS: profile.acceptsBPJS || false,
        specializationIds: profile.specializationIds || [],
        description: profile.description || "",
        whatsappLink: profile.whatsappLink || "",
        images: profile.images || "",
      });
    }
  }, [profile]);

  function handleChange(e) {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: checked }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await API.put(`/klinik/${profile.id}`, dataForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        alert("Profil klinik berhasil diperbarui!");
        setProfile(res.data.data); // update profile dengan data terbaru dari server
      } else {
        alert("Gagal memperbarui profil klinik.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100 pb-7">
      <h1 className="text-2xl font-bold text-slate-700 mb-4">Profil Klinik</h1>
      <p className="text-slate-600 mb-4">Silahkan lengkapi data profil klinik Anda</p>
      <form className="flex flex-col space-y-4 w-full max-w-md" onSubmit={handleUpdate}>
        <label className="text-slate-700 font-semibold mb-2">Nama Klinik</label>
        <input
          type="text"
          name="name"
          placeholder="Nama Klinik"
          value={dataForm.name}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg px-4 py-2"
          required
        />
        <label className="text-slate-700 font-semibold mb-2">Alamat Klinik</label>
        <input
          type="text"
          name="address"
          placeholder="Alamat Klinik"
          value={dataForm.address}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg px-4 py-2"
          required
        />
        <label className="text-slate-700 font-semibold mb-2">Lokasi Klinik</label>
        <input
          type="text"
          name="location"
          placeholder="Lokasi Klinik"
          value={dataForm.location}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg px-4 py-2"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="acceptsBPJS"
            checked={dataForm.acceptsBPJS}
            onChange={handleCheckboxChange}
          />
          <span>Terima BPJS</span>
        </label>
        <label className="text-slate-700 font-semibold mb-2">Spesialisasi</label>
        <textarea
          name="description"
          placeholder="Deskripsi Klinik"
          value={dataForm.description}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg px-4 py-2"
          required
        ></textarea>
        <label className="text-slate-700 font-semibold mb-2">Link wa</label>
        <input
          type="text"
          name="whatsappLink"
          placeholder="Link WhatsApp Klinik"
          value={dataForm.whatsappLink}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg px-4 py-2"
          required
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
