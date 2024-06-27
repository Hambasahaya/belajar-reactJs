import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [formData, setFormData] = useState({
    Username: "",
    Password: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", formData);
      if (response.data.message === "Login berhasil") {
        sessionStorage.setItem("username", response.data.username);
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          window.location.href='/admin'
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div className="container">
      <div className="registerbox d-flex flex-column">
        <img src="/img/logo.png" alt="Logo" className="rotate-animation" />
        <h4 className="text-center mb-4">Login Admin Go-Smart</h4>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="Username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={formData.Username}
              onChange={handleChange}
              name="Username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.Password}
              onChange={handleChange}
              name="Password"
              required
            />
          </div>
          <div className="btn-form d-flex flex-row justify-content-around">
            <button type="submit" className="btn btn-primary btn-action">Login!</button>
          </div>
        </form>
      </div>
    </div>
  );
}
