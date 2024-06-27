import React from "react";

export default function Program(){
    return(
        <section className="about d-flex flex-column" id="Program">
    <h4 className="text-center">Berbagai Macam Pilihan Program Sesuai dengan Kebutuhanmu</h4>
    <div className="feature d-flex">
        <div className="card" style={{ width: "22rem" }}>
            <img src="/img/online.jpg" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title mb-2 text-center">Program SD (Sekolah Dasar)</h5>
                <p className="card-text">Program bimbingan belajar untuk siswa Sekolah Dasar (SD) dirancang untuk membantu siswa memahami pelajaran di sekolah dengan lebih baik. Program ini mencakup semua mata pelajaran inti seperti Matematika, Bahasa Indonesia, IPA, dan IPS, serta pelajaran tambahan seperti Bahasa Inggris</p>
                <div class="d-grid gap-2 col-6 mx-auto btnF" >
                <a href="/register" class="btn btn-primary" type="button">Daftar!</a>
                </div>
            </div>
        </div>
        <div className="card" style={{ width: "22rem" }}>
            <img src="/img/teacher.jpg" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title mb-2 text-center"> Program SMP(Sekolah Menengah Pertama)</h5>
                <p className="card-text">Program bimbingan belajar untuk siswa Sekolah Menengah Pertama (SMP) difokuskan pada pendalaman materi pelajaran serta persiapan menghadapi Ujian akhir Sekolah. Program ini mencakup mata pelajaran Matematika, IPA, IPS, Bahasa Indonesia, dan Bahasa Inggris.</p>
                <div class="d-grid gap-2 col-6 mx-auto btnF">
                <a href="register" class="btn btn-primary" type="button">Daftar!</a>
                </div>
            </div>
        </div>
        <div className="card" style={{ width: "22rem" }}>
            <img src="/img/life.jpg" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title mb-2 text-center">Program SMA (Sekolah Menengah Atas)</h5>
                <p className="card-text">Program bimbingan belajar untuk siswa Sekolah Menengah Atas (SMA) dirancang untuk membantu siswa mempersiapkan diri menghadapi Ujian Akhir Sekolah (UAS), Ujian Tulis Berbasis Komputer (UTBK), dan seleksi masuk perguruan tinggi. Program ini mencakup mata pelajaran Matematika, Fisika, Kimia, Biologi, Bahasa Indonesia, Bahasa Inggris, dan mata pelajaran IPS seperti Ekonomi, Geografi, dan Sosiologi.</p>
                <div class="d-grid gap-2 col-6 mx-auto">
                <a href="/register" class="btn btn-primary" type="button">Daftar!</a>
                </div>
            </div>
        </div>
        <div className="card" style={{ width: "22rem" }}>
            <img src="/img/smk.jpg" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title mb-2 text-center">Program SMA (Sekolah Menengah Kejuruan)</h5>
                <p className="card-text">Program bimbingan belajar untuk siswa Sekolah Menengah Atas (SMK) dirancang untuk membantu siswa mempersiapkan diri menghadapi Ujian Akhir Sekolah (UAS), Ujian Tulis Berbasis Komputer (UTBK), dan seleksi masuk perguruan tinggi. Program ini mencakup mata pelajaran Matematika, Fisika, Kimia, Biologi, Bahasa Indonesia, Bahasa Inggris, dan mata pelajaran IPS seperti Ekonomi, Geografi, dan Sosiologi.</p>
                <div class="d-grid gap-2 col-6 mx-auto">
                <a href="/register" class="btn btn-primary" type="button">Daftar!</a>
                </div>
            </div>
        </div>
    </div>
   
</section>
    )
}