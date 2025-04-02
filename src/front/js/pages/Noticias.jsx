import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Noticias = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1>Noticias</h1>

      
      <button onClick={() => navigate("/listado-noticias")}>
        Listado de Noticias
      </button>

     
      {store?.news?.length > 0 ? (
        <ul>
          {store.news.map((item, index) => (
            <li key={item.id || index}> 
              <h3>{item.title}</h3>
              <p>{item.body}</p> 
              <button
                onClick={() => {
                  actions.setNotice(item); 
                  navigate(`/detalle/${item.id}`); 
                }}
              >
                Ver Detalles
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay noticias disponibles.</p>
      )}

      {store?.isProtector && (
        <button onClick={() => navigate("/crear")}>Agregar Noticia Nueva</button>
      )}
      <button onClick={actions.toggleProtector}>
        {store?.isProtector ? "Cambiar a Usuario Normal" : "Ingresar como Protectora"}
      </button>
      <button onClick={() => navigate("/")}>Volver a Inicio</button>
    </div>
  );
};
