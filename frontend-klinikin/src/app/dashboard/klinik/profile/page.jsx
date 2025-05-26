"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await API.get("/klinik/me", { withCredentials: true });
        
        if (res.status === 200) {
          const data = res.data.data;
          setProfile(data);
          setDataForm({
            name: data.name || "",
            address: data.address || "",
            location: data.location || "",
            acceptsBPJS: data.acceptsBPJS || false,
            specializationIds: data.specializationIds || [],
            description: data.description || "",
            whatsappLink: data.whatsappLink || "",
            images: data.images || "",
          });
        } else {
          console.error("Gagal ambil profil klinik:", res.data.message);
          if (res.status === 401) {
            window.location.href = "/auth/klinik/login";
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        window.location.href = "/auth/klinik/login";
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

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
    setIsUpdating(true);
    
    try {
      const res = await API.put(`/klinik/${profile.id}`, dataForm, { 
        withCredentials: true 
      });
      
      if (res.status === 200) {
        alert("Profil klinik berhasil diperbarui!");
        setProfile(res.data.data);
      } else {
        alert("Gagal memperbarui profil klinik: " + (res.data.message || ""));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Terjadi kesalahan saat memperbarui profil");
    } finally {
      setIsUpdating(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!profile) {
    return <p className="text-center py-10">Tidak dapat memuat data klinik. Silakan coba lagi.</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-slate-700 mb-4">Profil Klinik</h1>
        <p className="text-slate-600 mb-6">Lengkapi data profil klinik Anda</p>
        
        <form className="space-y-4" onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-slate-700 font-semibold">Nama Klinik</label>
              <input
                type="text"
                name="name"
                value={dataForm.name}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-slate-700 font-semibold">Alamat Klinik</label>
              <input
                type="text"
                name="address"
                value={dataForm.address}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-700 font-semibold">Lokasi (Koordinat)</label>
            <input
              type="text"
              name="location"
              value={dataForm.location}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
              placeholder="Contoh: -6.175392,106.827153"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="acceptsBPJS"
              checked={dataForm.acceptsBPJS}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-red-600 rounded focus:ring-red-500"
            />
            <label className="text-slate-700">Menerima BPJS</label>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-700 font-semibold">Deskripsi Klinik</label>
            <textarea
              name="description"
              value={dataForm.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-700 font-semibold">Link WhatsApp</label>
            <input
              type="url"
              name="whatsappLink"
              value={dataForm.whatsappLink}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
              placeholder="https://wa.me/6281234567890"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isUpdating}
              className={`w-full bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200 ${
                isUpdating ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}