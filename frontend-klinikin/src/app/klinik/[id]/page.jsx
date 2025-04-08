import axios from "axios";

export default async function KlinikPage(context) {
  const { id } = await context.params;
  const response = await axios.get(`http://localhost:4001/api/klinik/${id}`);
  const klinik = response.data;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <h1 className="text-2xl font-bold text-slate-700 mb-4">Klinik Detail</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-slate-800">
          {klinik.data.name}
        </h2>
        <p className="text-slate-600 mt-2">{klinik.data.address}</p>
        <p className="text-slate-600 mt-2">{klinik.data.location}</p>
      </div>
      <section
        id="form-pasien"
        className="w-full py-10 bg-gradient-to-bl from-[#d31027] via-[#ea384d] to-[#7e0d14]"
      >
        <form className="max-w-lg mx-auto bg-slate-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Formulir Pendaftaran Pasien
          </h2>
          <label className="block text-sm text-gray-800 mb-2" htmlFor="nama">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#ea384d] focus:outline-none mb-4"
          />
          <label className="block text-sm text-gray-800 mb-2" htmlFor="telp">
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="telp"
            name="telp"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#ea384d] focus:outline-none mb-4"
          />
          <label className="block text-sm text-gray-800 mb-2" htmlFor="keluhan">
            Keluhan
          </label>
          <textarea
            id="keluhan"
            name="keluhan"
            rows={4}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#ea384d] focus:outline-none mb-6"
            defaultValue={""}
          />
          <button
            type="submit"
            className="w-full bg-[#ea384d] text-white py-3 rounded-md text-sm font-medium hover:bg-red-600 transition"
          >
            Kirim
          </button>
        </form>
      </section>
    </div>
  );
}
