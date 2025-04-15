import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Mapa } from '../../js/component/Mapa.jsx';
import { Link } from "react-router-dom";
import Fondoprodt from "../../img/fondoadopcion.png";

const libraries = ["places"];
const API_KEY = process.env.API_GOOGLE_GEOCODING;


export const ProtectorasVistaDetalle = () => {
	const { store, actions } = useContext(Context);
	const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "/";


	const listarAnimalShelters = () => {

		const a = actions.getAnimalShelter(store.animalShelterSelected.id);
	}
	useEffect(() => {
		listarAnimalShelters()
	}, []);


	return (
		<div className="mt-2" style={{ backgroundImage: `url(${Fondoprodt})`, backgroundSize: "cover", height: "190vh", width: "100%" }}>
			<div className="container">
				<h1 className="text-center py-4">Localización y contacto</h1>
				<div className="row">
					{/* recorre el array contact usando la función map(); */}
					{/* loop through the contact array using the map() function; */}
					<div className="col-md-12 mb-4 d-flex align-items-start">
						<div className="card me-4" style={{ width: '30%', height: '600px' }}>
							<div className="card-body">
								<h3 className="card-title mb-2 text-center">{store.animalShelterSelected.shelter_name}</h3>
								<img
									className="card-img-top mb-4 "
									src={`${rutaImagenes}${store.animalShelterSelected.img_url}`}
									alt="Card image cap"
								/>
								<h5 className="card-title mb-2">Ciudad: {store.animalShelterSelected.city}</h5>
								<h5 className="card-title mb-2">Dirección: {store.animalShelterSelected.address}</h5>
								<h5 className="card-title mb-2">Email: {store.animalShelterSelected.email}</h5>
								<h5 className="card-title mb-2">Teléfono: {store.animalShelterSelected.phone_number}</h5>
							</div>
							<div>
								<Link to="/contact-form">
									<button className="btn btn-primary">Contactar</button>
								</Link>
							</div>
						</div>
						{store.animalShelterSelected.address ? (
							<div className="mapa" style={{ width: '70%', height: '600px' }}>
								<Mapa direccion={store.animalShelterSelected.address + " " + store.animalShelterSelected.city} />
							</div>
						) : null}

					</div>
					{/* Mapa */}
				</div>
			</div>
		</div>
	);
};

