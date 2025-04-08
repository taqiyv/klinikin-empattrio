
export default function AuthLayout({ children }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-100 pb-7">
            <h1 className="text-2xl font-bold text-slate-700 mb-4">Selamat datang di KlinikIn</h1>
            <p className="text-slate-600 mb-4">Silahkan pilih masuk sebagai</p>
            {children}
        </div>
    );
}