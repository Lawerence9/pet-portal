import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import Fondonews from "../../img/fnoti.jpeg";


  export const Noticias = () => {
  const { store, actions } = useContext(Context);
	const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "";

  useEffect(() => {
    actions.getNotice("all")
  }, [])

  return (
    <div className="mt-2" style={{backgroundImage: `url(${Fondonews})`, backgroundSize: "cover", height: "190vh", width:"100%"}}>
      <h1 className="text-center">Noticias</h1>
      {store.userRole=="Protector" ? <Link to="/crear-noticia">
            <button className="btn btn-primary mb-2 mx-5">Nueva noticia</button>
            </Link> : ""}
      <div className="row text-center mx-0">
        {store.notice.map((iterator) =>
          <div className="col-md-4 mb-4" key={iterator.id}>
            <div className="card">
              <div className="card-body">
                <h3 className="card-title mb-3">{iterator.title}</h3>
                <img className="card-img-top" style={{ width: '400px', height: '500px' }} src={`${rutaImagenes}/${iterator.img_url}`} alt="Card image cap" />
                <div className="mt-2">
                  <Link to="/detalle-noticia">
                    <button type="button" className="btn btn-primary mb-2" onClick={() => actions.getNotice(iterator.id)}>Detalles</button>
                  </Link>
                </div>
                {/*} 	<button 
                            className="btn btn-outline-warning"
                            onClick={() => actions.addFavorite(iterator, store.selectedCategory)}
                          >
                            <i className="fas fa-heart"></i> Add to Favorites
                            </button>
                        */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
