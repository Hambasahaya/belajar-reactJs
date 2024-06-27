import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default function AdminLayanan() {
  const [formData, setFormData] = useState({
    nama_layanan: '',
    Deskripsi_layanan: '',
    Harga_layanan: '',
    Durasi_layanan: '',
  });
  const [layananList, setLayananList] = useState([]);
  const [selectedLayanan, setSelectedLayanan] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getAlllayanan');
      setLayananList(response.data);
    } catch (error) {
      console.error('Fetch Data Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Addlayanan', formData);
      if (response.status === 200) {
        Swal.fire('Success', 'Layanan Berhasil Ditambahkan', 'success');
        fetchData();
        setFormData({
          nama_layanan: '',
          Deskripsi_layanan: '',
          Harga_layanan: '',
          Durasi_layanan: '',
        });
      }
    } catch (error) {
      Swal.fire('Error', 'Layanan gagal di tambahkan', 'error');
      console.error('Registration Error:', error);
    }
  };

  const handleEditClick = async (layanan) => {
    setIsEditMode(true);
    try {
      const response = await axios.get(`http://localhost:8080/getlayanan/${layanan.Id_layanan}`);
      const layananData = response.data;

      setSelectedLayanan(layananData);
      setFormData({
        nama_layanan: layananData.Nama_layanan || '',
        Deskripsi_layanan: layananData.Deskripsi_layanan || '',
        Harga_layanan: layananData.Harga_layanan ? layananData.Harga_layanan.toString() : '',
        Durasi_layanan: layananData.Durasi_layanan ? layananData.Durasi_layanan.toString() : '',
      });
    } catch (error) {
      console.error('Fetch Layanan Data Error:', error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, id_layanan: selectedLayanan.Id_layanan.toString() };
      const response = await axios.put('http://localhost:8080/updatelayanan', updatedFormData);
      if (response.status === 200) {
        Swal.fire('Success', 'Update data layanan successful', 'success');
        setSelectedLayanan(null);
        setIsEditMode(false);
        fetchData();
      }
    } catch (error) {
      Swal.fire('Error', 'Update data layanan failed', 'error');
      console.error('Update Error:', error);
    }
  };

  const handleDelete = async (id_layanan) => {
    try {
      const response = await axios.delete(`http://localhost:8080/deletelayanan/${id_layanan}`);
      if (response.status === 200) {
        Swal.fire('Deleted!', 'The record has been deleted.', 'success');
        fetchData();
      }
    } catch (error) {
      Swal.fire('Error', ' hapus data layanan  failed', 'error');
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
        <div className="dataLayanan d-flex flex-column p-4">
          <div className="d-grid gap-2 d-md-block">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Tambah Data Layanan
            </button>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Data Layanan</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm table-bordered border-primary">
                  <thead>
                    <tr>
                      <th>Nama Layanan</th>
                      <th>Deskripsi Layanan</th>
                      <th>Harga Layanan</th>
                      <th>Durasi Layanan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {layananList.map((layanan) => (
                      <tr key={layanan.Id_layanan}>
                        <td>{layanan.Nama_layanan}</td>
                        <td>{layanan.Deskripsi_layanan}</td>
                        <td>{layanan.Harga_layanan}</td>
                        <td>{layanan.Durasi_layanan}</td>
                        <td>
                          <div className="d-grid gap-2">
                            <button type="button" className="btn btn-primary btn-tabel" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEditClick(layanan)}>
                              Edit
                            </button>
                            <button className="btn btn-danger btn-tabel" type="button" onClick={() => handleDelete(layanan.Id_layanan)}>
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
              <h5 className="modal-title" id="exampleModalLabel">{isEditMode ? 'edit data layanan' : 'Tambah Data layanan'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="registerbox d-flex flex-column">
                  <img src="/img/logo.png" alt="Logo" className="rotate-animation" />
                  <h4 className="text-center mb-4">Layanan Siswa Go-Smart</h4>
                  <form onSubmit={isEditMode ? handleUpdate : handleRegister}>
                    <div className="mb-3">
                      <label htmlFor="nama_layanan" className="form-label">Nama Layanan</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.nama_layanan}
                        onChange={handleChange}
                        name="nama_layanan"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Deskripsi_layanan" className="form-label">Deskripsi Layanan</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Deskripsi_layanan}
                        onChange={handleChange}
                        name="Deskripsi_layanan"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Harga_layanan" className="form-label">Harga Layanan</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.Harga_layanan}
                        onChange={handleChange}
                        name="Harga_layanan"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Durasi_layanan" className="form-label">Durasi Layanan</label>
                      <input
                        type="number"
                        name="Durasi_layanan"
                        value={formData.Durasi_layanan}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="btn-form d-flex flex-row justify-content-around">
                      <button type="submit" className="btn btn-primary btn-action">Daftar!</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
