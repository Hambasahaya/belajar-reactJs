import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default function AdminGuru() {
  const [formData, setFormData] = useState({
    nama_guru: '',
    jk: '',
    alamat: '',
    nidn: '',
    tgl_lahir: '',
    email: '',
    no_hp: '',
    status: '2'
  });
  const [guruList, setGuruList] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getAllguru');
      setGuruList(response.data);
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
      const response = await axios.post('http://localhost:8080/Addguru', formData);
      if (response.status === 200) {
        Swal.fire('Success', 'Data Guru Berhasil ditambahkan', 'success');
        fetchData();
      }
    } catch (error) {
      Swal.fire('Error', 'Data Guru gagal ditambakan', 'error');
      console.error('Registration Error:', error);
    }
  };

  const handleEditClick = async (guru) => {
    setIsEditMode(true); 
    try {
      const response = await axios.get(`http://localhost:8080/getguru/${guru.Id_guru}`);
      const guruData = response.data;
  
      setSelectedGuru(guruData);
      
      setFormData({
        nama_guru: guruData.Nama_lengkap || '',
        jk: guruData.Jenis_kelamin|| '',
        alamat: guruData.Alamat_rumah || '',
        nidn: guruData.Nidn ? guruData.Nidn.toString():'',
        tgl_lahir: guruData.Tanggal_lahir || '',
        email: guruData.Email || '',
        no_hp: guruData.No_hp ? guruData.No_hp.toString():'',
        status: guruData.status ? guruData.Status.toString() : ''
      });
    } catch (error) {
      console.error('Fetch Guru Data Error:', error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, id_guru: selectedGuru.Id_guru.toString() };
      const response = await axios.put('http://localhost:8080/updateguru', updatedFormData);
      if (response.status === 200) {
        Swal.fire('Success', 'Update data guru successful', 'success');
        setSelectedGuru(null); 
        setIsEditMode(false); 
        fetchData(); 
      }
    } catch (error) {
      Swal.fire('Error', 'Update data guru  failed', 'error');
      console.error('Update Error:', error);
    
    }
  };

  const handleDelete = async (id_guru) => {
    try {
      const response = await axios.delete(`http://localhost:8080/deleteguru/${id_guru}`);
      if (response.status === 200) {
        Swal.fire('Deleted!', 'data guru berhasil di deleted.', 'success');
        fetchData();
      }
    } catch (error) {
      Swal.fire('Error', ' data guru Delete failed', 'error');
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
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Tambah Data Guru
            </button>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Data Guru</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm table-bordered border-primary">
                  <thead>
                    <tr>
                      <th>Nama Lengkap</th>
                      <th>Jenis Kelamin</th>
                      <th>Alamat</th>
                      <th>NIDN</th>
                      <th>Tanggal Lahir</th>
                      <th>Email</th>
                      <th>No WhatsApp</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guruList.map((guru) => (
                      <tr key={guru.id_guru}>
                        <td>{guru.Nama_lengkap}</td>
                        <td>{guru.Jenis_kelamin}</td>
                        <td>{guru.Alamat_rumah}</td>
                        <td>{guru.Nidn}</td>
                        <td>{guru.Tanggal_lahir}</td>
                        <td>{guru.Email}</td>
                        <td>{guru.No_hp}</td>
                        <td>
                          {guru.Status === 1 ? 'ACTIVE' :
                            guru.Status === 2 ? 'INACTIVE' : ''}
                        </td>
                        <td>
                          <div className="d-grid gap-12">
                            <button type="button" className="btn btn-primary btn-tabel"data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEditClick(guru)}>
                              Edit
                            </button>
                            <button className="btn btn-danger btn-tabel" type="button" onClick={() => handleDelete(guru.Id_guru)}>
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
              <h5 className="modal-title" id="exampleModalLabel">{isEditMode ? 'Edit Data Guru' : 'Tambah Data Guru'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="registerbox d-flex flex-column">
                  <img src="/img/logo.png" alt="Logo" className="rotate-animation" />
                  <h4 className="text-center mb-4">{isEditMode ? 'Edit Data Guru' : 'Tambah Data Guru'}t</h4>
                  <form onSubmit={isEditMode ? handleUpdate : handleRegister} className="d-flex flex-column">
                    <div className="row mb-3">
                      <div className="col">
                        <input type="text" className="form-control" placeholder="Nama Lengkap" name="nama_guru" value={formData.nama_guru} onChange={handleChange} required />
                      </div>
                      <div className="col">
                        <select className="form-select" name="jk" value={formData.jk} onChange={handleChange} required>
                          <option value="" disabled>Pilih Jenis Kelamin</option>
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                      <div className="mb-3">
                      <label htmlFor="Layanan" className="form-label">Status </label>
                      <select
                        className="form-select"
                        aria-label="Pilih Layanan"
                        value={formData.status}
                        onChange={handleChange}
                        name="status"
                        required
                      >
                        <option value="1">Active</option>
                        <option value="2">InActive</option>
                      </select>
                    </div>
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" placeholder="Alamat" name="alamat" value={formData.alamat} onChange={handleChange} required />
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <input type="number" className="form-control" placeholder="NIDN" name="nidn" value={formData.nidn} onChange={handleChange} required />
                      </div>
                      <div className="col">
                        <input type="date" className="form-control" name="tgl_lahir" value={formData.tgl_lahir} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input type="email" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="tel" className="form-control" placeholder="No WhatsApp" name="no_hp" value={formData.no_hp} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Daftar</button>
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

      <div className="modal fade" id="modalUpdateData" tabIndex="-1" aria-labelledby="modalUpdateDataLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalUpdateDataLabel">Edit Data Guru</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="registerbox d-flex flex-column">
                  <img src="/img/logo.png" alt="Logo" className="rotate-animation" />
                  <h4 className="text-center mb-4">Edit Data Guru Go-Smart</h4>
                  <form onSubmit={handleUpdate} className="d-flex flex-column">
                    <div className="row mb-3">
                      <div className="col">
                        <input type="text" className="form-control" placeholder="Nama Lengkap" name="nama_guru" value={formData.nama_guru} onChange={handleChange} required />
                      </div>
                      <div className="col">
                        <select className="form-select" name="jk" value={formData.jk} onChange={handleChange} required>
                          <option value="" disabled>Pilih Jenis Kelamin</option>
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                      <div className="mb-3">
                      <label htmlFor="Layanan" className="form-label">Status </label>
                      <select
                        className="form-select"
                        aria-label="Pilih Layanan"
                        value={formData.status}
                        onChange={handleChange}
                        name="status"
                        required
                      >
                        <option value="1">Active</option>
                        <option value="2">InActive</option>
                      </select>
                    </div>
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" placeholder="Alamat" name="alamat" value={formData.alamat} onChange={handleChange} required />
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <input type="text" className="form-control" placeholder="NIDN" name="nidn" value={formData.nidn} onChange={handleChange} required />
                      </div>
                      <div className="col">
                        <input type="date" className="form-control" name="tgl_lahir" value={formData.tgl_lahir} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input type="email" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="tel" className="form-control" placeholder="No WhatsApp" name="no_hp" value={formData.no_hp} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
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
