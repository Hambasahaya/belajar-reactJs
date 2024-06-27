import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Adminsiwa() {
  const [formData, setFormData] = useState({
    nama_siswa: '',
    jk: '',
    asal_sekolah: '',
    kelas_sekolah: '',
    tp_lahir: '',
    tgl_lahir: '',
    jenjang_sekolah: '',
    email: '',
    no_hp: '',
    Layanan: '2',
    status: '2'
  });
  const [siswaList, setSiswaList] = useState([]);
  const [layananList, setLayananList] = useState([]);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); 

  useEffect(() => {
    fetchData();
    fetchLayanan();
  }, []);

  const fetchLayanan = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getAlllayanan'); // Ganti URL dengan endpoint API Anda
      setLayananList(response.data);
    } catch (error) {
      console.error('Fetch Layanan Error:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getAllsiswa');
      setSiswaList(response.data);
    } catch (error) {
      console.error('Fetch Data Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      jenjang_sekolah:
        name === 'Layanan'
          ? value === '2' ? 'SD' :
            value === '4' ? 'SMP' :
              value === '5' ? 'SMA' :
                value === '6' ? 'SMK' :
                  prevData.jenjang_sekolah
          : prevData.jenjang_sekolah,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:8080/Addsiswa', formData);
      if (response.status === 200) {
        Swal.fire('Success', 'Registration successful', 'success');
        fetchData();
        window.location.href='/adminsiwa'
      }
    } catch (error) {
      Swal.fire('Error', 'Registration failed', 'error');
      console.error('Registration Error:', error);
      window.location.href='/adminsiwa'
    }
  };

  const handleEditClick = async (siswa) => {
    setIsEditMode(true); 
    try {
      const response = await axios.get(`http://localhost:8080/getsiswa/${siswa.Id_siswa}`);
      const siswaData = response.data;
  
      setSelectedSiswa(siswaData);
      
      setFormData({
        nama_siswa: siswaData.Nama_siswa || '',
        jk: siswaData.JK || '',
        asal_sekolah: siswaData.Asal_sekolah || '',
        kelas_sekolah: siswaData.Kelas_Sekolah ? siswaData.Kelas_Sekolah.toString() : '',
        tp_lahir: siswaData.Tempat_lahir || '',
        tgl_lahir: siswaData.Tanggal_lahir || '',
        jenjang_sekolah: siswaData.Jenjang_sekolah || '',
        email: siswaData.Email || '',
        no_hp: siswaData.No_hp ? siswaData.No_hp.toString() : '',
        layanan: siswaData.Layanan_dipilih ? siswaData.Layanan_dipilih.toString() : '',
        status: siswaData.Status ? siswaData.Status.toString() : ''
      });
    } catch (error) {
      console.error('Fetch Siswa Data Error:', error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, id_siswa: selectedSiswa.Id_siswa.toString() };
      const response = await axios.put('http://localhost:8080/updatesiswa', updatedFormData);
      if (response.status === 200) {
        Swal.fire('Success', 'Update successful', 'success');
        setSelectedSiswa(null);
        setIsEditMode(false); 
        window.location.href='/adminsiwa'
      }
    } catch (error) {
      Swal.fire('Error', 'Update failed', 'error');
      console.error('Update Error:', error);
      window.location.href='/adminsiwa'
    }
  };

  const handleDelete = async (id_siswa) => {
    try {
      const response = await axios.delete(`http://localhost:8080/deletesiswa/${id_siswa}`);
      if (response.status === 200) {
        Swal.fire('Deleted!', 'The record has been deleted.', 'success');
        fetchData();
      }
    } catch (error) {
      Swal.fire('Error', 'Delete failed', 'error');
      console.error('Delete Error:', error);
    }
  };

  const handleCloseModal = () => {
    setFormData({
      nama_siswa: '',
      jk: '',
      asal_sekolah: '',
      kelas_sekolah: '',
      tp_lahir: '',
      tgl_lahir: '',
      jenjang_sekolah: '',
      email: '',
      no_hp: '',
      Layanan: '2',
      status: '2'
    });
    setSelectedSiswa(null);
    setIsEditMode(false); 
  };

  return (
    <div className="userpages d-flex">
      <Sidebar/>
      <div className="adminmain d-flex flex-column w-100">
        <Navbar/>
        <div className="datasiswa d-flex flex-column p-4">
          <div className="d-grid gap-2 d-md-block">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleCloseModal}>
              Tambah Data Siswa
            </button>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Datasiswa</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm table-bordered border-primary" >
                  <thead>
                    <tr>
                      <th>Nama Lengkap</th>
                      <th>Jenis Kelamin</th>
                      <th>Asal Sekolah</th>
                      <th>Kelas</th>
                      <th>Tempat Lahir</th>
                      <th>Tanggal Lahir</th>
                      <th>Email</th>
                      <th>No WhatsApp</th>
                      <th>Layanan dipilih</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siswaList.map((siswa) => (
                      <tr key={siswa.Id_siswa}>
                        <td>{siswa.Nama_siswa}</td>
                        <td>{siswa.JK}</td>
                        <td>{siswa.Asal_sekolah}</td>
                        <td>{siswa.Kelas_Sekolah}</td>
                        <td>{siswa.Tempat_lahir}</td>
                        <td>{siswa.Tanggal_lahir}</td>
                        <td>{siswa.Email}</td>
                        <td>{siswa.No_hp}</td>
                        <td>
                          {siswa.Layanan_dipilih === 2 ? 'Program SD' :
                            siswa.Layanan_dipilih === 4 ? 'Program SMP' :
                              siswa.Layanan_dipilih === 5 ? 'Program SMA' :
                                siswa.Layanan_dipilih === 6 ? 'Program SMK' : ''}
                        </td>
                        <td>
                          {siswa.Status === 1 ? 'ACTIVE' :
                            siswa.Status === 2 ? 'INACTIVE' : ''}
                        </td>
                        <td>
                          <div className="d-grid gap-12">
                            <button type="button" className="btn btn-primary btn-tabel" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEditClick(siswa)}>
                              Edit
                            </button>
                            <button className="btn btn-danger btn-tabel" type="button" onClick={() => handleDelete(siswa.Id_siswa)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{isEditMode ? 'Edit Data Siswa' : 'Tambah Data Siswa'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="registerbox d-flex flex-column">
                  <img src="/img/logo.png" alt="Logo" className="rotate-animation" />
                  <h4 className="text-center mb-4">{isEditMode ? 'Edit Data Siswa' : 'Tambah Data Siswa'}</h4>
                  <form onSubmit={isEditMode ? handleUpdate : handleRegister}>
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
                        <option value="">Pilih Layanan</option>
                        {layananList.map((layanan) => (
                          <option key={layanan.Id_layanan} value={layanan.Id_layanan}>
                            {layanan.Nama_layanan}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">Status Pendaftaran</label>
                      <select
                        className="form-select"
                        aria-label="Pilih Status"
                        value={formData.status}
                        onChange={handleChange}
                        name="status"
                        required
                      >
                        <option value="1">Active</option>
                        <option value="2">InActive</option>
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
                      <button type="submit" className="btn btn-primary btn-action">{isEditMode ? 'Update' : 'Daftar!'}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
