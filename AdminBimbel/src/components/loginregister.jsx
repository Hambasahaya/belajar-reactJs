import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Register() {
  const [formData, setFormData] = useState({
    nama_siswa: '',
    jk: '',
    asal_sekolah: '',
    jenjang_sekolah: '',
    kelas_sekolah: '',
    tp_lahir: '',
    tgl_lahir: '',
    email: '',
    no_hp: '',
    Layanan: '2', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      jenjang_sekolah:
        name === 'Layanan'
          ? value === '2' ? 'SD' :
            value === '3' ? 'SMP' :
              value === '4' ? 'SMA' :
                value === '5' ? 'SMK' :
                  prevData.jenjang_sekolah // Maintain previous value if not Layanan
          : prevData.jenjang_sekolah,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Addsiswa', formData);
      if (response.status === 200) {
        Swal.fire('Success', 'Registration successful', 'success');
        window.location.href = '/finis'
        console.log(response.data); 
      }
    } catch (error) {
      Swal.fire('Error', 'Registration failed', 'error');
      console.error('Registration Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="registerbox d-flex flex-column">
        <img src="/img/logo.png" alt="Logo" className="rotate-animation" />
        <h4 className="text-center mb-4">Daftar Go-Smart</h4>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">Nama Lengkap</label>
            <input
              type="text"
              className="form-control"
              value={formData.nama_siswa}
              onChange={handleChange}
              name="nama_siswa"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jk" className="form-label">Jenis Kelamin</label>
            <select
              className="form-select form-select-sm"
              aria-label="Jenis Kelamin"
              value={formData.jk}
              onChange={handleChange}
              name="jk"
              required
            >
              <option value="" disabled>Pilih jenis kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="asl_sklh" className="form-label">Asal Sekolah</label>
            <input
              type="text"
              className="form-control"
              value={formData.asal_sekolah}
              onChange={handleChange}
              name="asal_sekolah"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="kelas_sekolah" className="form-label">Kelas Sekolah</label>
            <input
              type="number"
              className="form-control"
              value={formData.kelas_sekolah}
              onChange={handleChange}
              name="kelas_sekolah"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tpl_lahir" className="form-label">Tempat Lahir</label>
            <input
              type="text"
              className="form-control"
              name="tp_lahir"
              value={formData.tp_lahir}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tgl_lahir" className="form-label">Tanggal Lahir</label>
            <input
              type="date"
              className="form-control"
              name="tgl_lahir"
              value={formData.tgl_lahir}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Layanan" className="form-label">Pilih Layanan</label>
            <select
              className="form-select"
              aria-label="Pilih Layanan"
              value={formData.Layanan}
              onChange={handleChange}
              name="Layanan"
              required
            >
              <option value="2">Program SD</option>
              <option value="3">Program SMP</option>
              <option value="4">Program SMA</option>
              <option value="5">Program SMK</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="No" className="form-label">No WhatsApp</label>
            <input
              type="number"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
              className="form-control"
              required
            />
            <div className="invalid-feedback mt-4"></div>
          </div>
          <div className="btn-form d-flex flex-row justify-content-around">
            <button type="submit" className="btn btn-primary btn-action">Daftar!</button>
          </div>
        </form>
      </div>
    </div>
  );
}
