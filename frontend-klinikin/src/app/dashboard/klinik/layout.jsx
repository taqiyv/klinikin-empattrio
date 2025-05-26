import Link from "next/link";

export default function KlinikLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
        <h1 className="text-lg font-bold mb-5">Klinik Tong Seng</h1>
        <ul>
          <li className="mb-3">
            <Link href="/dashboard/klinik" className="block p-2 hover:bg-slate-600 focus:bg-[#ea384d] rounded">
              Beranda
            </Link>
          </li>
          {/* <li className="mb-3">
            <a href="" className="block p-2 hover:bg-slate-600 focus:bg-[#ea384d] rounded">
              Janji Temu
            </a>
          </li> */}
          <li>
            <Link
              href="/dashboard/klinik/profile"
              className="block p-2 hover:bg-slate-600 focus:bg-[#ea384d] rounded"
            >
              Profile
            </Link>
          </li>
        </ul>
      </aside>
        <div className="flex-1">
        <main className="p-6 bg-slate-100">{children}</main>
        </div>
    </div>
  );
}
