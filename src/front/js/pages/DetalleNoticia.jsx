import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const DetalleNoticia = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.selectedNews) {
      setTimeout(() => navigate("/"), 2000); // Redirige después de 2 segundos
    }
  }, [store.selectedNews, navigate]);

  if (!store.selectedNews) {
    return <h2>Cargando noticia...</h2>; // Mensaje antes de redirigir
  }

  return (
    <div className="text-center mt-5">
      <h1>{store.selectedNews.title}</h1>
      {store.selectedNews.img_url && (
        <img src={store.selectedNews.img_url} alt={store.selectedNews.title} width="300" />
      )}
      <p>{store.selectedNews.content}</p>
      <button onClick={() => navigate("/")}>Volver</button>
    </div>
  );
};
