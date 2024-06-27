import React from "react";
export default function Contac(){
    return (
        <section id="Contac">
        <div className="row contac d-flex justify-content-center flex-colum">
          <div className="col1 d-flex flex-column">
            <img src="/img/logo.png" alt="Tadika Mesra" />
            <h4>Go-Smart</h4>
            <p>Bimbingan Belajar Terbaik Se-Indonesia,Join Now!</p>
            <div className="col d-flex" style={{ gap: "20px" }}>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-youtube"></i>
              <i className="bi bi-whatsapp"></i>
              <i className="bi bi-linkedin"></i>
            </div>
          </div>
          <div className="col3 d-flex flex-column">
            <h4>Contact Info</h4>
            <p>Jl. Cempaka Lestari III No.63 Blok G, RT.13/RW.7, Lb. Bulus, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12440</p>
          </div>
        </div>
      </section>
    )
}