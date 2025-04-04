import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate, Navigate  } from "react-router-dom";

export const Noticias = () => {
	const { store, actions } = useContext(Context);

	const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "";
	console.log(store.notice)
	

	const listarNoticias= () => {

		actions.getNotice("all");
	
	
	
	
 
	  }

	 //  actions.get("all");

	useEffect(() => {
		//   getTodos();
		console.log(store.notice);
		actions.getNotice("all");
		console.log("use effect");
		
	   }, []);
	

	return (
		<div className="container">
			<h1 className="text-center my-4">NOTICIAS</h1>

		    <div className="row">
		  

					  
				{/* recorre el array contact usando la función map(); */}  
				{/* loop through the contact array using the map() function; */}
				{store.notice.map((iterator, index) =>
				<div className="col-md-4 mb-4">
				   
							<div className="card" >
								
							<div className="card-body">
								<h5 className="card-title mb-2">{iterator.title}</h5>
								<img class="card-img-top" src={`${rutaImagenes}/${iterator.img_url}`} alt="Card image cap"/>
						
							
																					  
								<Link to="/detalle-noticia" >
											<button type="button" className="btn btn-primary mb-2" onClick={(event) => actions.getNotice(iterator.id)} >Ver Detalles</button>
								</Link>
								

							
							</div>
							</div>
						</div>
					
					)}

			   
			   
			</div>
	</div>
	);
};
