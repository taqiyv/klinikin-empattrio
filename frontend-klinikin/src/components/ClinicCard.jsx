import SvgComponent from "./SvgComponent";
import Link from "next/link";

export default function ClinicCard({
  image,
  id,
  namaKlinik,
  rating,
  reviews,
  address,
  acceptedBPJS,
  spesialisasi,
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
          <div className="flex items-center mb-1">
            <SvgComponent
              className="h-4 w-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </SvgComponent>
            <span className="ml-1 text-xs text-gray-600">
              {rating} ({reviews} reviews)
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-2">{address}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {spesialisasi?.map((spesialis, index) => (
              <span
                key={index}
                className="bg-blue-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded"
              >
                {spesialis.name}
              </span>
            ))}
          </div>
          <button className="w-full bg-[#ea384d] hover:bg-[#d31027] text-white text-xs font-medium py-1.5 px-3 rounded-lg transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </Link>
  );
}
