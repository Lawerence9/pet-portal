import React, { useContext, useEffect, useSyncExternalStore } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate, useLocation, Navigate  } from "react-router-dom";

export const Protectoras = () => {
	const { store, actions } = useContext(Context);

	const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "";
	console.log(store.animalShelterSelected)
		

	const listarAnimalShelters = () => {

		actions.getAnimalShelter("all");
	
	
	//	console.log(store.Protectoras)
	
 
	  }

	 //  actions.getAnimalShelter("all");

	useEffect(() => {
		//   getTodos();
		console.log(store.animalShelter);
		actions.getAnimalShelter("all");
		console.log("use effect");
		
	   }, []);
	

	return (
		<div className="container">
			<h1 className="text-center my-4">PROTECTORAS</h1>

		<div className="row">
		  

					  
				{/* recorre el array contact usando la función map(); */}  
				{/* loop through the contact array using the map() function; */}
				{store.animalShelter.map((iterator, index) =>
				<div className="col-md-4 mb-4">
				   
							<div className="card" >
								
							<div className="card-body">
								<h5 className="card-title mb-2 text-center">{iterator.shelter_name}</h5>
								<img class="card-img-top" src={`${rutaImagenes}/${iterator.web_url}`} alt="Card image cap"/>
								<h5 className="card-title mb-2">{iterator.city}</h5>
							
																					  
								<Link to="/animal-shelter-detail" >
											<button type="button" className="btn btn-primary mb-2" onClick={(event) => actions.getAnimalShelter(iterator.id)} >Ver protectora</button>
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
	);
};
