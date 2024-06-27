import React from "react";

import axios from 'axios';
export default function User() {
    
  return (
    <div className="userpages d-flex justify-content-bettween">
      <div className="users-menu d-flex flex-column">
        <div className="user-img d-flex flex-column">
          <img src="/img/logo.png" alt="" srcset="" />
          <h4>Tadika mesra Sch</h4>
          <p className="text-center">{localStorage.getItem('email')}</p>
        </div>
        <div className="menus d-flex flex-column">
          <h6>Menu</h6>
          <a href="/user/data_lengkap">
            <i className="bi bi-clipboard-data-fill"></i>Data Lengkap
          </a>
        </div>
        <a href="/logout">
          <i className="bi bi-door-open-fill"></i> Log Out
        </a>
      </div>
      <div className="usersmain d-flex flex-column">
      </div>
    </div>
  );
}
