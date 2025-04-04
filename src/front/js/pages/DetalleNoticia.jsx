import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const DetalleNoticia = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const noticia = store.currentNotice;

  if (!noticia) {
    return (
      <div className="container text-center mt-5">
        <h2>No hay información para mostrar</h2>
        <button className="btn btn-outline-primary mt-3" onClick={() => navigate("/noticias")}>
          Volver a Noticias
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="card mb-3">
        <img
          src={noticia.web_url}
          className="card-img-top"
          alt="Imagen de noticia"
        />
        <div className="card-body">
          <h3 className="card-title">{noticia.notice_name}</h3>
          <h5 className="text-muted mb-3">{noticia.city}</h5>
          <p className="card-text">{noticia.description}</p>
        </div>
      </div>
    </div>
  );
};
