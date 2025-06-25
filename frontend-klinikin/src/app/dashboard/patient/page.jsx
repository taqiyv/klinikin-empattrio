"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function PatientDashboard() {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, appointmentsRes] = await Promise.all([
          API.get("/patient/me", { withCredentials: true }),
          API.get("/appointment", { withCredentials: true }),
        ]);

        if (profileRes.status === 200) {
          setProfile(profileRes.data.data);
        } else {
          console.error("Gagal ambil profil");
        }

        if (appointmentsRes.status === 200) {
          setAppointments(appointmentsRes.data.data);
        } else {
          console.error("Gagal ambil appointment");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        window.location.href = "/auth/patient/login";
      }
    }

    fetchData();
  }, []);

  if (!profile) return <p>Loading...</p>;
  return (
    <div>
      <div>
        <div className="min-h-screen">
          <section
            id="home"
            className="h-72 flex flex-col items-center justify-center text-slate-600 font-bold"
          >
            <h1 className="text-slate-800 font-bold text-4xl mt-10">
              Selamat datang,{" "}
              <span className="bg-gradient-to-r from-[#fad0c4] via-[#ffd1ff] to-[#f48fb1] text-red-900">
                <span className="bg-gradient-to-tr from-[#d31027] via-[#ea384d] to-[#7e0d14] text-transparent bg-clip-text italic">
                  {profile.name}
                </span>
              </span>
            </h1>
            <div className="mt-10 text-lg flex justify-center items-center">
              <h1>Lagi sakit ?</h1>
              <p className="px-2 ml-3 rounded-r-lg mt-1 bg-gradient-to-tl from-[#d31027] via-[#ea384d] to-[#ff7c85] hover:shadow-md hover:shadow-pink-300 transition-all duration-200 text-white">
                Klinikin aja
              </p>
            </div>
          </section>

          <div className="flex justify-center -mt-4">
          <div className="bg-gradient-to-br from-white to-slate-200 my-5 w-[90%] rounded-xl px-4 pb-5 border border-slate-300">
              <h1 className="pt-5 font-bold text-xl text-slate-700 mx-auto mb-5">
                Janji Temu
              </h1>
              <div>
                <ul>
                  {appointments.map((appointment, index) => (
                    <li key={index} className="text-lg">
                      {appointment.patient.name} - {appointment.clinic.name} -{" "}
                      {new Date(appointment.date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
