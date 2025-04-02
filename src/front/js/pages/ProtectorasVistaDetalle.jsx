import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";

export const ProtectorasVistaDetalle = () => {
	const { store, actions } = useContext(Context);

	const listarAnimalShelters = () => {

		const a = actions.getAnimalShelter(1);
		
	
 
	  }

	//  actions.getAnimalShelter("all");

	useEffect(() => {
		//   getTodos();
		listarAnimalShelters()
	//	console.log(store.Protectoras)
	  
	   }, []);
	

	return (
		<div className="container">
			<h1 className="text-center my-4">PROTECTORAS</h1>

		<div className="row">
		  

					  
				{/* recorre el array contact usando la función map(); */}  
				{/* loop through the contact array using the map() function; */}
			
				<div className="col-md-4 mb-4">
				   {
							<div className="card" >
								
							<div className="card-body">
								<h5 className="card-title mb-2">{store.animalShelter.shelter_name}</h5>
								<img class="card-img-top" src={store.animalShelter.web_url} alt="Card image cap"/>
								<h5 className="card-title mb-2">{store.animalShelter.city}</h5>
								<h5 className="card-title mb-2">{store.animalShelter.address}</h5>
								<h5 className="card-title mb-2">{store.animalShelter.email}</h5>
								<h5 className="card-title mb-2">{store.animalShelter.phone_number}</h5>
							
							
																					  
															
							} 	<button 
									className="btn btn-outline-warning"
									onClick={() => actions.addFavorite(iterator, store.selectedCategory)}
								>
									<i className="fas fa-heart"></i> Add to Favorites
									</button>
						
							
							</div>
							</div>
							}	
						</div>
					
				

			   
			   
			</div>
	</div>
	);
};
