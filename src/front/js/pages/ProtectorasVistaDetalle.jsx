import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import MapEmbed from '../component/GoogleMaps.jsx';  // Asegúrate de tener la ruta correcta
import GoogleMaps from "../component/GoogleMaps.jsx";

export const ProtectorasVistaDetalle = () => {
	const { store, actions } = useContext(Context);
	const host = process.env.BACKEND_URL;

	const rutaImagenes = host + "/";


	let map;

			async function initMap() {
			// The location of Uluru
			const position = { lat: -25.344, lng: 131.031 };
			// Request needed libraries.
			//@ts-ignore
			const { Map } = await google.maps.importLibrary("maps");
			const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

			// The map, centered at Uluru
			map = new Map(document.getElementById("map"), {
				zoom: 4,
				center: position,
				mapId: "DEMO_MAP_ID",
			});

			// The marker, positioned at Uluru
			const marker = new AdvancedMarkerElement({
				map: map,
				position: position,
				title: "Uluru",
			});
			}


			
			
initMap();


	
			

	const listarAnimalShelters = () => {

		const a = actions.getAnimalShelter(store.animalShelterSelected.id);
		console.log(store.animalShelterSelected)
	
 
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



				   
							<div className="card" >
								
								<div className="card-body">
									<h5 className="card-title mb-2">{store.animalShelterSelected.shelter_name}</h5>
									<img class="card-img-top" src={`${rutaImagenes}${store.animalShelterSelected.web_url}`} alt="Card image cap"/>
									<h5 className="card-title mb-2">{store.animalShelterSelected.city}</h5>
									<h5 className="card-title mb-2">{store.animalShelterSelected.address}</h5>
									<h5 className="card-title mb-2">{store.animalShelterSelected.email}</h5>
									<h5 className="card-title mb-2">{store.animalShelterSelected.phone_number}</h5>
									<div className="container">{initMap}</div>
									<GoogleMaps></GoogleMaps>																			
															
							
								
								</div>
							</div>
						</div>
					}
				</div>





			</div>

		</div>

	);
};

