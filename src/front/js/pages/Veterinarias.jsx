import React, { useContext, useEffect, useSyncExternalStore } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate, useLocation, Navigate  } from "react-router-dom";
import Fondovet from "../../img/fondovet.png";

export const Veterinarias = () => {
	const { store, actions } = useContext(Context);

	const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "";

		

	useEffect(() => {
		//   getTodos();
		console.log(store.animalShelter);
		actions.getVeterinary("all");
		console.log("use effect");
		
	   }, []);
	

	return (

		<div className="container">
			<h1 className="text-center my-4">VETERINARIAS</h1>

		<div className="row">
		  

					  
				{/* recorre el array contact usando la función map(); */}  
				{/* loop through the contact array using the map() function; */}
				{store.veterinary.map((iterator, index) =>
				<div className="col-md-4 mb-4">
				   
							<div className="card" >
								
							<div className="card-body">
								<h5 className="card-title mb-2 text-center">{iterator.veterinary_name}</h5>
								<img class="card-img-top" src={`${rutaImagenes}/${iterator.img_url}`} alt="Card image cap"/>
								<h5 className="card-title mb-2">{iterator.city}</h5>
							
																					  
								<Link to="/vista-detalles" >
											<button type="button" className="btn btn-primary mb-2" onClick={(event) => actions.getVeterinary(iterator.id)} >Ver veterinaria</button>
								</Link>
								
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

		<div className="text-center mt-5" style={{backgroundImage: `url(${Fondovet})`, backgroundSize: "cover", height: "190vh"}}>
			<h1>VETERINARIA</h1>	
						
		</div>
	);
};
