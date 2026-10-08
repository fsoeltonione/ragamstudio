import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Menu, Globe, Star } from "lucide-react";
import Image from "next/image";
import { format, isSameDay } from "date-fns";
import { id } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  // Fetch dynamic data
  const [
    { data: classes },
    { data: packages },
    { data: schedules },
    { data: locations }
  ] = await Promise.all([
    supabase.from("classes").select("*").eq("is_active", true).limit(3),
    supabase.from("packages").select("*").eq("is_active", true).order("price", { ascending: true }).limit(3),
    supabase.from("class_schedules").select("*, classes(name, duration), trainers(name), locations(name)").gte("start_time", new Date().toISOString()).order("start_time", { ascending: true }).limit(4),
    supabase.from("locations").select("*").eq("is_active", true).limit(1)
  ]);

  // Fallback mock data if DB is empty to ensure UI renders
  const displayClasses = classes?.length ? classes : [
    { id: 1, name: "Reformer Flow - Group Class", type: "Flow", category: "Group - Reformer / Tower / Mix", duration: 50, rating: 4.8, reviews: 4, desc: "Reformer Flow is a dynamic Pilates class..." },
    { id: 2, name: "Reformer Beginner - Group Class", type: "Beginner", category: "Group - Reformer", duration: 50, rating: 5.0, reviews: 2, desc: "Perfect for beginners." },
    { id: 3, name: "Mat Pilates - Group Class", type: "All Level", category: "Group - Yoga & Mat Pilates", duration: 50, rating: 5.0, reviews: 1, desc: "Mat based pilates." }
  ];

  const displayPackages = packages?.length ? packages : [
    { id: 1, name: "1 Sesi Yoga / Pilates (Mat)", price: 98000, credits: 1 },
    { id: 2, name: "1 Sesi Reformer, Tower & Mix", price: 220000, credits: 1, popular: true },
    { id: 3, name: "1 Sesi Pilates Reformer ... Prenatal & Lansia", price: 250000, credits: 1 }
  ];

  const todayStr = format(new Date(), "EEEE, d MMM", { locale: id });

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 selection:bg-[#3f3c64] selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#3f3c64] flex items-center justify-center font-bold text-white tracking-wider">RS</div>
                <span className="font-bold text-xl tracking-tight text-gray-900">RagamStudio</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-900 font-medium hover:text-[#3f3c64] transition-colors">Beranda</Link>
              <Link href="/classes" className="text-gray-500 font-medium hover:text-[#3f3c64] transition-colors">Kelas</Link>
              <Link href="/schedule" className="text-gray-500 font-medium hover:text-[#3f3c64] transition-colors">Jadwal</Link>
              <Link href="/packages" className="text-gray-500 font-medium hover:text-[#3f3c64] transition-colors">Paket</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <Link href="/admin/login" className="px-5 py-2.5 bg-[#3f3c64] text-white font-medium hover:bg-[#312e81] transition-colors">
                Masuk / Daftar
              </Link>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button className="text-gray-500">
                <Globe className="w-5 h-5" />
              </button>
              <button className="text-gray-900">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Placeholder for background image */}
        <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-[#3f3c64] to-gray-900"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <h2 className="text-white text-sm md:text-base font-medium tracking-widest uppercase letter-spacing-2 mb-2">A New Way to Be Well</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Selamat datang di Ragam Studio
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light">
            Ragam Gerak, Satu Rasa
          </p>
          <div className="pt-8">
            <Link href="/schedule" className="px-8 py-4 bg-white text-[#3f3c64] font-bold hover:bg-gray-100 transition-colors inline-block">
              Pesan Kelas
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tentang Studio Kami</h2>
            <p className="text-lg text-gray-500">Tempat transformasi dan gerakan dinamis</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tentang Kami</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Ragam Studio, yang dibuka untuk umum pada 1 Juni 2026, adalah ruang di mana gerak, jeda, dan pemulihan menyatu dalam satu pengalaman yang utuh.
                </p>
                <p>
                  Kami percaya bahwa setiap individu memiliki ragam cara yang berbeda dalam menemukan satu rasa, yaitu keseimbangan tubuh, pikiran, dan energi. Melalui kurasi aktivitas yang menyeluruh—dari mindful movement hingga high-energy training—Ragam Studio menghadirkan pengalaman yang memungkinkan Anda bergerak bebas.
                </p>
              </div>
              <Link href="/about" className="inline-block mt-8 text-[#3f3c64] font-bold hover:underline">
                Pelajari Lebih Lanjut tentang kami &rarr;
              </Link>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Perhatian Personal</h3>
                <p className="text-gray-600">Kelas kami memastikan Anda mendapat instruksi dan koreksi individual sesuai kebutuhan Anda.</p>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Instruktur Ahli</h3>
                <p className="text-gray-600">Semua instruktur kami adalah profesional bersertifikat dengan pengalaman luas.</p>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Pendekatan Holistik</h3>
                <p className="text-gray-600">Kami fokus pada koneksi antara pikiran dan tubuh untuk kesehatan optimal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lokasi Kami</h2>
            <p className="text-lg text-gray-500">Perjalanan kesehatan Anda dimulai di sini.</p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{locations?.[0]?.name || "RagamStudio"}</h3>
              <p className="text-gray-600 max-w-sm">
                {locations?.[0]?.address || "Jl. Jatianom No.202, RT.015/RW.007, Jaticempaka, Pondok Gede, Kota Bekasi"}
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/locations/ragamstudio" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Detail
              </Link>
              <Link href="/locations" className="px-6 py-3 bg-[#3f3c64] text-white font-medium hover:bg-[#312e81] transition-colors">
                Lihat Semua Lokasi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kelas Kami</h2>
            <p className="text-lg text-gray-500">Temukan pengalaman sempurna untuk kebutuhan Anda</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayClasses.map((cls: any) => (
              <div key={cls.id} className="border border-gray-200 group hover:shadow-lg transition-all bg-white flex flex-col">
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                  {/* Placeholder Image */}
                  <div className="absolute inset-0 bg-gray-200"></div>
                  <span className="relative z-10 text-gray-400 font-medium">Image: {cls.name}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cls.name}</h3>
                  <div className="flex items-center gap-1 text-orange-500 mb-4">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-gray-900 ml-1">{cls.rating || "5.0"}</span>
                    <span className="text-sm text-gray-500">({cls.reviews || 0} reviews)</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-1">
                    {cls.description || cls.desc || "Bergabunglah dengan kelas ini untuk meningkatkan fleksibilitas dan kekuatan tubuh Anda."}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2.5 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded-sm">
                      {cls.category || "Group Class"}
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded-sm">
                      {cls.duration || 50} menit
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <Link 
                      href={`/schedule?classesName=${encodeURIComponent(cls.name)}`}
                      className="w-full py-3 bg-[#3f3c64] text-white text-center font-bold hover:bg-[#312e81] transition-colors"
                    >
                      Pesan Sekarang
                    </Link>
                    <Link 
                      href={`/classes/${cls.id}`}
                      className="w-full py-3 border border-gray-300 text-gray-700 text-center font-bold hover:bg-gray-50 transition-colors"
                    >
                      Detail Lebih Lanjut
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-12">Apa kata member kami</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-800 p-8 border border-gray-700">
              <div className="flex text-yellow-400 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-300 mb-6 italic">"Flow dengan coach Octa, gerakannya simpel tapi makin lama makin pedaaasss 😹 mantabs, makasih banyak coach, gumawo!"</p>
              <div className="font-bold">E** P.</div>
              <div className="text-sm text-gray-500">Reformer Flow - Group Class</div>
            </div>
            <div className="bg-gray-800 p-8 border border-gray-700">
              <div className="flex text-yellow-400 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-300 mb-6 italic">"Coachnya oke, cueingnya lumayan bisa diikuti. Gerakannya oke. Semoga pilihan mat nya tetap ada yaaa"</p>
              <div className="font-bold">I**** P.</div>
              <div className="text-sm text-gray-500">Mat Pilates - Group Class</div>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/classes" className="inline-block px-8 py-3 border border-white text-white font-bold hover:bg-white hover:text-gray-900 transition-colors">
              Lihat Semua Kelas
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Paket Kami</h2>
            <p className="text-lg text-gray-500">Temukan rencana sempurna untuk latihan Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {displayPackages.map((pkg: any) => (
              <div key={pkg.id} className={`bg-white border p-8 flex flex-col ${pkg.popular || pkg.name.includes("Tower") ? 'border-[#3f3c64] shadow-xl relative scale-105' : 'border-gray-200 hover:shadow-md'}`}>
                {(pkg.popular || pkg.name.includes("Tower")) && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3f3c64] text-white text-xs font-bold px-4 py-1 uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">IDR {pkg.price.toLocaleString('id-ID')}</span>
                </div>
                <div className="mb-8 flex-1">
                  <p className="text-gray-600 font-medium pb-4 border-b border-gray-100">{pkg.credits || 1} kredit kelas</p>
                </div>
                <button className={`w-full py-3 font-bold transition-colors ${pkg.popular || pkg.name.includes("Tower") ? 'bg-[#3f3c64] text-white hover:bg-[#312e81]' : 'border border-gray-300 text-gray-900 hover:bg-gray-50'}`}>
                  Lihat Detail
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Link href="/packages" className="inline-block px-8 py-3 bg-[#3f3c64] text-white font-bold hover:bg-[#312e81] transition-colors">
              Lihat Semua Paket
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Classes */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kelas Mendatang</h2>
            <p className="text-lg text-gray-500">Bergabunglah dengan kami untuk sesi berikutnya</p>
          </div>

          <div className="mb-8 border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold text-gray-900">Hari ini, {todayStr} <span className="text-sm font-normal text-gray-500 ml-2">({schedules?.length || 4} kelas)</span></h3>
          </div>

          <div className="space-y-4">
            {(schedules?.length ? schedules : [
              { id: 1, start_time: "08:00", classes: { name: "HAPPY HOUR - 1 sesi Reformer FLOW", duration: 50 }, trainers: { name: "Coach Ragamstudio" }, locations: { name: "RagamStudio" }, capacity: 10, booked: 6 },
              { id: 2, start_time: "10:00", classes: { name: "Reformer Beginner - Group Class", duration: 50 }, trainers: { name: "Coach Sarah" }, locations: { name: "RagamStudio" }, capacity: 10, booked: 10 },
            ]).map((sched: any, idx: number) => {
               const time = sched.start_time.includes("T") ? format(new Date(sched.start_time), "HH:mm") : sched.start_time;
               const spotsLeft = (sched.capacity || 10) - (sched.booked || 0);
               return (
                 <div key={idx} className="border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                   <div className="flex items-start md:items-center gap-6">
                     <div className="text-2xl font-bold text-[#3f3c64] min-w-[80px]">{time}</div>
                     <div>
                       <h4 className="font-bold text-gray-900 mb-1">{sched.classes?.name || "Class Name"}</h4>
                       <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                         <span className="bg-gray-100 px-2 py-1">{sched.classes?.duration || 50} menit</span>
                         <span className="bg-gray-100 px-2 py-1">by {sched.trainers?.name || "Coach"}</span>
                         <span className="bg-gray-100 px-2 py-1">{sched.locations?.name || "Studio"}</span>
                       </div>
                     </div>
                   </div>
                   <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                     <div className={`text-sm font-medium ${spotsLeft > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                       {spotsLeft > 0 ? `${spotsLeft} tempat tersisa` : 'Penuh'}
                     </div>
                     <Link href="/admin/login" className="px-6 py-2.5 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
                       Masuk untuk Booking
                     </Link>
                   </div>
                 </div>
               )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA / Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="py-20 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Siap untuk latihan? Mulai perjalanan Anda hari ini.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/schedule" className="px-8 py-4 bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors">
              Pesan Sekarang
            </Link>
            <Link href="/contact" className="px-8 py-4 border border-white text-white font-bold hover:bg-gray-800 transition-colors">
              Hubungi Kami
            </Link>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors">Tentang</Link>
            <Link href="/locations" className="hover:text-white transition-colors">Lokasi</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Kontak</Link>
            <Link href="/faqs" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/blogs" className="hover:text-white transition-colors">Blog</Link>
          </div>
          <div className="text-sm text-gray-500">
            &copy; 2026 RagamStudio. All rights reserved. Powered by Quikpl.
          </div>
        </div>
      </footer>
    </div>
  );
}
