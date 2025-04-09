import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const ListadoNoticias = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  if (!store.news) return null;

  return (
    <div className="text-center mt-5">
      <h1>Noticias</h1>
      <ul>
        {store.news.length > 0 ? (
          store.news.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              {item.img_url && <img src={item.img_url} alt={item.title} width="200" />}
              <button onClick={() => {
                actions.setNotice(item);
                navigate("/detalle");
              }}>
                Ver Detalles
              </button>
            </li>
          ))
        ) : (
          <p>No hay noticias disponibles.</p>
        )}
      </ul>

      {store.isProtector && (
        <button onClick={() => navigate("/crear")}>Agregar Noticia Nueva</button>
      )}

      <button onClick={actions.toggleProtector}>
        {store.isProtector ? "Cambiar a Usuario Normal" : "Ingresar como Protectora"}
      </button>
    </div>
  );
};
