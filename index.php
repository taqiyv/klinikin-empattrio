<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Klinikin</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>

    <!-- navbar -->
  <div class="flex justify-between items-center h-16 bg-gradient-to-tr from-[#d31027] via-[#ea384d] to-[#7e0d14] sticky top-0 z-50">
        <h1 class="ml-10 text-white font-bold text-xl">Klinikin</h1>
        <div class="flex space-x-8 mr-10">
          <a href="#" class="text-white font-medium text-xs hover:text-sm transition-all flex items-center">Beranda</a>
          <a href="#rekom" class="text-white font-medium text-xs hover:text-sm transition-all flex items-center">Klinik</a>
          <a href="#form-pasien" class="text-white font-medium text-xs hover:text-sm transition-all flex items-center">Form Pasien</a>
          <div class="relative text-white font-medium text-xs transition-all bg-gradient-to-br from-[#232526] via-[#2b2b2c] to-[#17191a] px-3 py-2 rounded-lg overflow-hidden group flex items-center">
            <span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <a href="login.php" class="relative group-hover:text-[#d31027]">Login</a>
          </div>
        </div>
  </div>

  <!-- main -->
  <div class="p bg-slate-100">
    <!-- home -->
    <section id="home" class="h-72 flex flex-col items-center justify-center text-slate-600 font-bold">
      <h1 class="text-slate-800 font-bold text-4xl mt-10">Selamat datang, <span class="bg-gradient-to-r from-[#fad0c4] via-[#ffd1ff] to-[#f48fb1] text-red-900"><span class="bg-gradient-to-tr from-[#d31027] via-[#ea384d] to-[#7e0d14] text-transparent bg-clip-text italic">Orang sakit</span></span></h1>
      
      <div class="mt-10 text-lg flex justify-center items-center">
        <h1>Lagi sakit ?</h1>
        <a href="#form-pasien" class="px-2 ml-3 rounded-r-lg mt-1 bg-gradient-to-tl from-[#d31027] via-[#ea384d] to-[#ff7c85] hover:shadow-md hover:shadow-pink-300 transition-all duration-200 text-white">
          Periksa sekarang !
          </span>
        </a>
      </div>
    </section>

    <!-- informasi kesehatan -->
    <div class="h-96 flex justify-center -mt-4"> 
      <div class="bg-gradient-to-br from-white to-slate-200 my-5 w-[90%] rounded-xl px-4 border">
        <h1 class="pt-5 font-bold text-xl text-slate-700">Informasi Kesehatan</h1>
        <div class="grid grid-cols-4 gap-4 mt-4">
          <div class="bg-white h-64 max-w-sm border rounded-md overflow-hidden hover:border-slate-400 group">
              <img class=" object-cover w-full h-[50%]" src="kesemutan.jpg" alt="">
              <p class="text-slate-700 font-bold mx-2 mt-1.5 text-sm group-hover:text-[#ea384d]">7 Fakta tentang Kesemutan</p>
              <p class="text-slate-400 text-xs mx-2 mt-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit atque tempora voluptatum delectus temporibus dicta, quisquam ratione?</p>
          </div>
          <div class="bg-white h-64 max-w-sm border rounded-md overflow-hidden hover:border-slate-400 group">
            <img class=" object-cover w-full h-[50%]" src="kesemutan.jpg" alt="">
            <p class="text-slate-700 font-bold mx-2 mt-1.5 text-sm group-hover:text-[#ea384d] ">7 Fakta tentang Kesemutan</p>
            <p class="text-slate-400 text-xs mx-2 mt-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit atque tempora voluptatum delectus temporibus dicta, quisquam ratione?</p>
          </div>
          <div class="bg-white h-64 max-w-sm border rounded-md overflow-hidden hover:border-slate-400 group">
            <img class=" object-cover w-full h-[50%]" src="kesemutan.jpg" alt="">
            <p class="text-slate-700 font-bold mx-2 mt-1.5 text-sm group-hover:text-[#ea384d]">7 Fakta tentang Kesemutan</p>
            <p class="text-slate-400 text-xs mx-2 mt-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit atque tempora voluptatum delectus temporibus dicta, quisquam ratione?</p>
          </div>
          <div class="bg-white h-64 max-w-sm border rounded-md overflow-hidden hover:border-slate-400 group">
            <img class=" object-cover w-full h-[50%]" src="kesemutan.jpg" alt="">
            <p class="text-slate-700 font-bold mx-2 mt-1.5 text-sm group-hover:text-[#ea384d]">7 Fakta tentang Kesemutan</p>
            <p class="text-slate-400 text-xs mx-2 mt-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit atque tempora voluptatum delectus temporibus dicta, quisquam ratione?</p>
          </div>
          
        </div>
      </div>
    </div>

    <!-- rekomendasi klinik -->
    <section id="rekom" class="flex justify-center mt-4 mx-auto"> 
      <div class="bg-gradient-to-br from-white to-slate-200 my-5 w-[90%] rounded-xl px-4 pb-5 border">
        <h1 class="pt-5 font-bold text-xl text-slate-700 mb-2">Rekomendasi Klinik</h1>
        <form class="mb-3">   
          <div class="relative">
              <input type="search" id="search" class="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#ff7c85] focus:border-[#ff7c85] " placeholder="Cari Klinik..."/>
              <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-[#ea384d] hover:bg-[#d31027] focus:ring-2 focus:outline-none focus:ring-[#ff7c85] font-medium rounded-lg text-sm px-4 py-2 ">
                <svg class="w-4 h-4 text-slate-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </button>
          </div>
        </form>

        <div class="flex justify-evenly">
          <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Clinic Card 1 -->
            <div class="w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <img src="kesemutan.jpg" alt="City Medical Center" class="w-full h-32 object-cover">
                <div class="p-3">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900">Kinik Tong Seng</h3>
                        <span class="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">Open</span>
                    </div>
                    <div class="flex items-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        <span class="ml-1 text-xs text-gray-600">4.8 (256 reviews)</span>
                    </div>
                    <p class="text-xs text-gray-600 mb-2">Jl. Raya Darmo No.54, Kec. Wonokromo, Surabaya</p>
                    <div class="flex flex-wrap gap-1 mb-2">
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">General</span>
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">Pediatric</span>
                    </div>
                    <button class="w-full bg-[#ea384d] hover:bg-[#d31027] text-white text-xs font-medium py-1.5 px-3 rounded-lg transition-colors">
                        Book Appointment
                    </button>
                </div>
            </div>
        
            <!-- Clinic Card 2 -->
            <div class="w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <img src="kesemutan.jpg" alt="Wellness Clinic" class="w-full h-32 object-cover">
                <div class="p-3">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900">Klinik Jaya Abadi</h3>
                        <span class="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">Open</span>
                    </div>
                    <div class="flex items-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        <span class="ml-1 text-xs text-gray-600">4.6 (189 reviews)</span>
                    </div>
                    <p class="text-xs text-gray-600 mb-2">Jl. Tunjungan No.81, Kelurahan Genteng, Kecamatan Genteng, Kota Surabaya</p>
                    <div class="flex flex-wrap gap-1 mb-2">
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">Dental</span>
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">Dermatology</span>
                    </div>
                    <button class="w-full bg-[#ea384d] hover:bg-[#d31027] text-white text-xs font-medium py-1.5 px-3 rounded-lg transition-colors">
                        Book Appointment
                    </button>
                </div>
            </div>
        
            <!-- Clinic Card 3 -->
            <div class="w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <img src="kesemutan.jpg" alt="Family Health Center" class="w-full h-32 object-cover">
                <div class="p-3">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900">The Clinic</h3>
                        <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">Closed</span>
                    </div>
                    <div class="flex items-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        <span class="ml-1 text-xs text-gray-600">4.9 (312 reviews)</span>
                    </div>
                    <p class="text-xs text-gray-600 mb-2">Jl. Mayjen Sungkono No.125, Dukuh Pakis, Surabaya</p>
                    <div class="flex flex-wrap gap-1 mb-2">
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">General</span>
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">Cardiology</span>
                    </div>
                    <button class="w-full bg-[#ea384d] hover:bg-[#d31027] text-white text-xs font-medium py-1.5 px-3 rounded-lg transition-colors">
                        Book Appointment
                    </button>
                </div>
            </div>
      
            <!-- Clinic Card 4 -->
            <div class="w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img src="kesemutan.jpg" alt="Family Health Center" class="w-full h-32 object-cover">
              <div class="p-3">
                  <div class="flex justify-between items-start mb-1">
                      <h3 class="text-sm font-bold text-gray-900">Klinik Insyaallah Berkah</h3>
                      <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">Closed</span>
                  </div>
                  <div class="flex items-center mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      <span class="ml-1 text-xs text-gray-600">4.9 (312 reviews)</span>
                  </div>
                  <p class="text-xs text-gray-600 mb-2">Jl. Kapas Krampung No.45, Tambaksari, Surabaya</p>
                  <div class="flex flex-wrap gap-1 mb-2">
                      <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">General</span>
                      <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">Cardiology</span>
                  </div>
                  <button class="w-full bg-[#ea384d] hover:bg-[#d31027] text-white text-xs font-medium py-1.5 px-3 rounded-lg transition-colors">
                      Book Appointment
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- faq -->
    <div>
      <section id="faq" class="py-16">
        <div class="container-custom">
            <div class="text-center mb-12">
                <h2 class="text-xl font-bold text-gray-900 mb-4">FAQ</h2>
                <p class="text-sm text-gray-700 max-w-3xl mx-auto">
                    Temukan jawaban atas pertanyaan umum seputar kesehatan, klinik, dan layanan kami.
                </p>
            </div>
            
            <div class="max-w-3xl mx-auto text-sm">
                <!-- FAQ Item 1 -->
                <div class="mb-6">
                    <button class="flex justify-between items-center w-full text-left font-medium text-white bg-[#ea384d] p-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500" onclick="toggleFAQ(this)">
                        <span>Bagaimana Klinikin merekomendasikan klinik?</span>
                        <svg class="w-5 h-5 text-white transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="hidden mt-2 p-5 bg-white rounded-lg">
                        <p class="text-gray-700">
                            Klinikin menggunakan data lokasi, preferensi, dan ulasan pengguna untuk memberikan rekomendasi klinik yang sesuai. Algoritma kami mempertimbangkan jarak, spesialisasi, ketersediaan, dan penilaian pengguna dalam memberikan rekomendasi terbaik.
                        </p>
                    </div>
                </div>
                
                <!-- FAQ Item 2 -->
                <div class="mb-6">
                    <button class="flex justify-between items-center w-full text-left font-medium text-white bg-[#ea384d] p-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500" onclick="toggleFAQ(this)">
                        <span>Apakah saya bisa membuat janji melalui Klinikin?</span>
                        <svg class="w-5 h-5 text-white transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="hidden mt-2 p-5 bg-white rounded-lg">
                        <p class="text-gray-700">
                            Ya, Anda bisa membuat janji langsung melalui platform kami. Setelah menemukan klinik yang sesuai, Anda dapat melihat ketersediaan jadwal dan melakukan pemesanan dengan mudah. Konfirmasi akan dikirim melalui email dan SMS.
                        </p>
                    </div>
                </div>
                
                <!-- FAQ Item 3 -->
                <div class="mb-6">
                    <button class="flex justify-between items-center w-full text-left font-medium text-white bg-[#ea384d] p-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500" onclick="toggleFAQ(this)">
                        <span>Bagaimana cara mengakses rekam medis saya?</span>
                        <svg class="w-5 h-5 text-white transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="hidden mt-2 p-5 bg-white rounded-lg">
                        <p class="text-gray-700">
                            Anda dapat mengakses rekam medis melalui profil pengguna setelah masuk ke akun Anda. Jika klinik telah terintegrasi dengan Klinikin, Anda bisa melihat riwayat kunjungan, resep, dan hasil tes medis.
                        </p>
                    </div>
                </div>
                
                <!-- FAQ Item 4 -->
                <div class="mb-6">
                    <button class="flex justify-between items-center w-full text-left font-medium text-white bg-[#ea384d] p-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500" onclick="toggleFAQ(this)">
                        <span>Apakah informasi kesehatan saya aman di Klinikin?</span>
                        <svg class="w-5 h-5 text-white transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="hidden mt-2 p-5 bg-white rounded-lg">
                        <p class="text-gray-700">
                            Ya, kami sangat menjaga keamanan data Anda. Semua informasi kesehatan dienkripsi dan disimpan dengan standar keamanan yang tinggi sesuai dengan peraturan privasi kesehatan.
                        </p>
                    </div>
                </div>
                
                <!-- FAQ Item 5 -->
                <div class="mb-6">
                    <button class="flex justify-between items-center w-full text-left font-medium text-white bg-[#ea384d] p-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500" onclick="toggleFAQ(this)">
                        <span>Bisakah saya memberikan ulasan untuk klinik yang saya kunjungi?</span>
                        <svg class="w-5 h-5 text-white transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="hidden mt-2 p-5 bg-white rounded-lg">
                        <p class="text-gray-700">
                            Kami sangat mendorong pengguna untuk berbagi pengalaman dengan memberikan ulasan mengenai klinik yang telah dikunjungi. Ulasan Anda membantu pengguna lain dalam membuat keputusan yang lebih baik.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    </div>
    
    <!-- form Pasien -->
    <section id="form-pasien" class="w-full py-10 bg-gradient-to-bl from-[#d31027] via-[#ea384d] to-[#7e0d14]">
      <form class="max-w-lg mx-auto bg-slate-100 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Formulir Pendaftaran Pasien</h2>
        
        <label class="block text-sm text-gray-800 mb-2" for="nama">Nama</label>
        <input type="text" id="nama" name="nama" class="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#ea384d] focus:outline-none mb-4">
        
        <label class="block text-sm text-gray-800 mb-2" for="telp">Nomor Telepon</label>
        <input type="tel" id="telp" name="telp" class="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#ea384d] focus:outline-none mb-4">
        
        <label class="block text-sm text-gray-800 mb-2" for="keluhan">Keluhan</label>
        <textarea id="keluhan" name="keluhan" rows="4" class="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#ea384d] focus:outline-none mb-6"></textarea>
        
        <button type="submit" class="w-full bg-[#ea384d] text-white py-3 rounded-md text-sm font-medium hover:bg-red-600 transition">Kirim</button>
      </form>
    </section>
  </div>

      <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12">
        <div class="">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center space-x-2 mb-2">
                        <span class="text-xl font-bold ml-5">Klinikin</span>
                    </div>
                    <p class="text-gray-400 mb-6 text-sm ml-5">
                        Finding the right healthcare provider has never been easier.
                    </p>
                    <div class="flex space-x-4 ml-5">
                        <a href="#" class="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <div>
                    <h3 class="text-lg font-semibold mb-2">Tautan Cepat</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Beranda</a></li>
                        <li><a href="#rekom" class="text-gray-400 hover:text-white transition-colors text-sm">Rekomendasi Klinik</a></li>
                        <li><a href="#faq" class="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Tentang Kami</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Kontak</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-lg font-semibold mb-2">Layanan</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Clinic Finder</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Appointment Booking</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Health Articles</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Medical Records</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Telemedicine</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Health Insurance</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-lg font-semibold mb-4">Hubungi Kami</h3>
                    <ul class="space-y-4 text-sm">
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span class="text-gray-400">Rungkut, Surabaya, Jawa Timur</span>
                        </li>
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span class="text-gray-400">info@klinikin.com</span>
                        </li>
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span class="text-gray-400">14022</span>
                        </li>
                    </ul>
                    <div class="mt-6">
                        <h4 class="text-sm font-semibold mb-3">Daftarkan Klinik Kamu Sekarang</h4>
                        <div class="">
                            <a href="register_klinik.php" class="bg-[#ea384d] hover:bg-[#6d1b25] text-white px-4 py-1 rounded-lg transition-colors text-sm font-semibold">
                                Daftar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center px-8">
                <p class="text-gray-400 text-xs mb-4 md:mb-0">
                    &copy; 2025 Klinikin. All rights reserved.
                </p>
                <div class="flex space-x-6">
                    <a href="#" class="text-gray-400 hover:text-white text-xs transition-colors">Privacy Policy</a>
                    <a href="#" class="text-gray-400 hover:text-white text-xs transition-colors">Terms of Service</a>
                    <a href="#" class="text-gray-400 hover:text-white text-xs transition-colors">Cookie Policy</a>
                </div>
            </div>
        </div>
  </footer>

  <script>
    function toggleFAQ(button) {
            const content = button.nextElementSibling;
            const icon = button.querySelector('svg');
            
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.classList.add('rotate-180');
            } else {
                content.classList.add('hidden');
                icon.classList.remove('rotate-180');
            }
        }
  </script>

</body>
</html>