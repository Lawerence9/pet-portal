import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";

export const DetalleNoticia = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.clearSelectedNews();
  }, []);

  const isLoading = !store.selectedNews || Object.keys(store.selectedNews).length === 0;

  return (
    <div className="container">
      <h1 className="text-center my-4">Detalles</h1>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-2">{store.selectedNews.title}</h5>
                <img className="card-img-top" src={store.selectedNews.img_url} alt="Imagen noticia" />
                <h5 className="card-title mb-2">{store.selectedNews.body}</h5>
                <div>
                  <Link to="/noticias">
                    <button className="btn btn-primary">Atrás</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
