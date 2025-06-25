import SvgComponent from "./SvgComponent";
import Link from "next/link";

export default function ClinicCard({
  image,
  id,
  namaKlinik,
  address,
  acceptedBPJS,
  
}) {
  return (
    <Link href={`/klinik/${id}`}>
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          src={image}
          alt={`gambar ${namaKlinik}`}
          className="w-full h-32 object-cover"
        />
        <div className="p-3">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-bold text-gray-900">{namaKlinik}</h3>
            {acceptedBPJS ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                BPJS✅
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                BPJS❌
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mb-2">{address}</p>
          <button className="w-full bg-[#ea384d] hover:bg-[#d31027] text-white text-xs font-medium py-1.5 px-3 rounded-lg transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </Link>
  );
}
