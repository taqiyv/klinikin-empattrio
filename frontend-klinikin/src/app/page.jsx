import axios from "axios";
import ClinicCard from "../components/ClinicCard";
import FaqCard from "../components/FaqCard";
import ArticlesCard from "../components/ArticlesCard";
import SvgComponent from "../components/SvgComponent";
import API from "@/lib/api";

export default async function Home() {
  const response = await API.get("/all-klinik");
  const kliniks = response.data;
  const response2 = await API.get("/articles");
  const articles = response2.data;

  return (
    <main>
      {/* main */}
      <div className="p bg-slate-100">
        {/* home */}
        <section
          id="home"
          className="h-72 flex flex-col items-center justify-center text-slate-600 font-bold"
        >
          <h1 className="text-slate-800 font-bold text-4xl mt-10">
            Selamat datang,{" "}
            <span className="bg-gradient-to-r from-[#fad0c4] via-[#ffd1ff] to-[#f48fb1] text-red-900">
              <span className="bg-gradient-to-tr from-[#d31027] via-[#ea384d] to-[#7e0d14] text-transparent bg-clip-text italic">
                Orang sakit
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
        {/* informasi kesehatan */}
        <div className="h-96 flex justify-center -mt-4">
          <div className="bg-gradient-to-br from-white to-slate-200 my-5 w-[90%] rounded-xl px-4">
            <h1 className="pt-5 font-bold text-xl text-slate-700">
              Informasi Kesehatan
            </h1>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {articles?.data?.map((article) => (
                <ArticlesCard
                  key={article.id}
                  image={article.image}
                  title={article.title}
                  content={article.content}
                />
              ))}
            </div>
          </div>
        </div>
        {/* rekomendasi klinik */}
        <section id="rekom" className="flex justify-center mt-4 mx-auto">
          <div className="bg-gradient-to-br from-white to-slate-200 my-5 w-[90%] rounded-xl px-4 pb-5">
            <h1 className="pt-5 font-bold text-xl text-slate-700 mb-2">
              Rekomendasi Klinik
            </h1>
            <form className="mb-3">
              <div className="relative">
                <input
                  type="search"
                  id="search"
                  className="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#ff7c85] focus:border-[#ff7c85] "
                  placeholder="Cari Klinik..."
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-[#ea384d] hover:bg-[#d31027] focus:ring-2 focus:outline-none focus:ring-[#ff7c85] font-medium rounded-lg text-sm px-4 py-2 "
                >
                  <SvgComponent>
                    <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </SvgComponent>
                </button>
              </div>
            </form>
            <div className="flex justify-evenly">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kliniks?.data?.map((klinik) => (
                  <ClinicCard
                    key={klinik.id}
                    id={klinik.id}
                    image={klinik.images}
                    namaKlinik={klinik.name}
                    rating={klinik.rating}
                    reviews={klinik._count.reviews}
                    address={klinik.address}
                    acceptedBPJS={klinik.acceptsBPJS}
                    spesialisasi={klinik.specialization}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* faq */}
        <div>
          <section id="faq" className="py-16">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4">FAQ</h2>
                <p className="text-sm text-gray-700 max-w-3xl mx-auto">
                  Temukan jawaban atas pertanyaan umum seputar kesehatan,
                  klinik, dan layanan kami.
                </p>
              </div>
              <div className="max-w-3xl mx-auto text-sm">
                {/* FAQ Item 1 */}
                <FaqCard
                  question={"Bagaimana Klinikin merekomendasikan klinik?"}
                  answer="Klinikin menggunakan data lokasi, preferensi, dan ulasan pengguna untuk memberikan rekomendasi klinik yang sesuai. Algoritma kami mempertimbangkan jarak, spesialisasi, ketersediaan, dan penilaian pengguna dalam memberikan rekomendasi terbaik."
                />
                {/* FAQ Item 2 */}
                <FaqCard
                  question={"Apakah saya bisa membuat janji melalui Klinikin?"}
                  answer="Ya, Anda bisa membuat janji langsung melalui platform kami. Setelah menemukan klinik yang sesuai, Anda dapat melihat ketersediaan jadwal dan melakukan pemesanan dengan mudah. Konfirmasi akan dikirim melalui email dan SMS."
                />
                {/* FAQ Item 3 */}
                <FaqCard
                  question={"Bagaimana cara mengakses rekam medis saya?"}
                  answer="Anda dapat mengakses rekam medis melalui profil pengguna setelah masuk ke akun Anda. Jika klinik telah terintegrasi dengan Klinikin, Anda bisa melihat riwayat kunjungan, resep, dan hasil tes medis."
                />
                {/* FAQ Item 4 */}
                <FaqCard
                  question={"Apakah informasi kesehatan saya aman di Klinikin?"}
                  answer="Ya, kami sangat menjaga keamanan data Anda. Semua informasi kesehatan dienkripsi dan disimpan dengan standar keamanan yang tinggi sesuai dengan peraturan privasi kesehatan."
                />
                {/* FAQ Item 5 */}
                <FaqCard
                  question={
                    "Apa yang harus saya lakukan jika saya mengalami masalah?"
                  }
                  answer="Jika Anda mengalami masalah, Anda dapat menghubungi tim dukungan pelanggan kami melalui fitur 'Bantuan' di aplikasi atau situs web. Kami siap membantu Anda 24/7."
                />
                <FaqCard
                  question={
                    "Bisakah saya memberikan ulasan untuk klinik yang saya kunjungi?"
                  }
                  answer="Kami sangat mendorong pengguna untuk berbagi pengalaman dengan memberikan ulasan mengenai klinik yang telah dikunjungi. Ulasan Anda membantu pengguna lain dalam membuat keputusan yang lebih baik."
                />
              </div>
            </div>
          </section>
        </div>
        {/* form Pasien */}
      </div>
    </main>
  );
}
