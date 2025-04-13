import Link from "next/link";

export default function KlinikLayout({ children }) {
  return (
    <div>
      <aside className="w-64 bg-slate-700 text-white min-h-screen p-5">
        <h1 className="text-lg font-bold mb-5">Klinik Tong Seng</h1>
        <ul>
          <li className="mb-3">
            <a href="#" className="block p-2 bg-slate-600 rounded">
              Beranda
            </a>
          </li>
          <li className="mb-3">
            <a href="#" className="block p-2 hover:bg-slate-600 rounded">
              Janji Temu
            </a>
          </li>
          <li>
            <Link
              href="/dashboard/klinik/profile"
              className="block p-2 hover:bg-slate-600 rounded"
            >
              Profile
            </Link>
          </li>
        </ul>
      </aside>
        <main className="flex-1 p-6 bg-slate-100 min-h-screen">{children}</main>
    </div>
  );
}
