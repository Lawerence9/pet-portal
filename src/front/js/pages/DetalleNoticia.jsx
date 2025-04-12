import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import Fondodet from "../../img/fondonoticias.png";

export const DetalleNoticia = () => {
  const { store, actions } = useContext(Context);
  const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "";

  useEffect(() => {
    actions.clearSelectedNews();
  }, []);

  const isLoading = !store.selectedNews || Object.keys(store.selectedNews).length === 0;

  return (
    <div className="mt-2" style={{ backgroundImage: `url(${Fondodet})`, backgroundSize: "cover", height: "190vh",width:"100%" }}>
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
                <img className="card-img-top" src={`${rutaImagenes}/${store.selectedNews.img_url}`} alt="Imagen noticia" />
                <h5 className="card-title mb-2">{store.selectedNews.body}</h5>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
