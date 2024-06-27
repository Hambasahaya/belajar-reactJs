import React from "react";
import '../js/script.js'
export default function Sidebar(){
    return(
        <div className="sidebar d-flex flex-column">
        <nav className="sidebar locked">
      <div className="logo_items flex">
        <span className="nav_image">
          <img src='/img/logo.png' alt="logo_img" />
        </span>
        <span className="logo_name">Go-Smart</span>
      </div>
      <div className="menu_container">
        <div className="menu_items">
          <ul className="menu_item">
            <div className="menu_title flex">
              <span className="title">Dashboard</span>
              <span className="line"></span>
            </div>
          </ul>
          <ul className="menu_item">
            <div className="menu_title flex">
              <span className="title">Menu</span>
              <span className="line"></span>
            </div>
            <li className="item">
              <a href="/adminsiwa" className="link flex">
                <i><img src="/img/siswa.png" alt="" srcset="" width={20} /></i>
                <span>Data siswa</span>
              </a>
            </li>
            <li className="item">
              <a href="/adminguru" className="link flex">
              <i><img src="/img/guru.png" alt="" srcset="" width={20} /></i>
                <span>Data Guru</span>
              </a>
            </li>
            <li className="item">
              <a href="/adminlayanan" className="link flex">
              <i><img src="/img/layanan.png" alt="" srcset="" width={20} /></i>
                <span>Layanan Bimbel</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      </div>
    )
}