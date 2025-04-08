import Link from "next/link";

export default function AuthChoice() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-100 pb-7">
            <h1 className="text-2xl font-bold text-slate-700 mb-4">Selamat datang di KlinikIn</h1>
            <p className="text-slate-600 mb-4">Silahkan pilih masuk sebagai</p>
            <div className="flex space-x-4">
                <Link href="/auth/klinik/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">Klinik</Link>
                <Link href="/auth/patient/login" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200">Pasien</Link>
            </div>
        </div>
    );
}