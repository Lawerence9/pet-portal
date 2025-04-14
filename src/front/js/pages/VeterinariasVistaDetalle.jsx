import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Mapa } from '../component/Mapa.jsx';
import { Link } from "react-router-dom";
import Fondovetvista from "../../img/fondovet.png";

const libraries = ["places"];
const API_KEY = API_GOOGLE_GEOCODING;


export const VeterinariasVistaDetalle = () => {
	const { store, actions } = useContext(Context);
	const host = process.env.BACKEND_URL;

	const rutaImagenes = host + "/";


	const listarAnimalShelters = () => {

		const a = actions.getVeterinary(store.veterinarySelected.id);
	}
	useEffect(() => {
		listarAnimalShelters()
	}, []);


	return (
		<div className="mt-2" style={{backgroundImage: `url(${Fondovetvista})`, backgroundSize: "cover", height: "100vh", width: "100%"}}>
			<div className="container">
				<h1 className="text-center my-4 py-4">Localización y contacto</h1>
				<div className="row">
					{/* recorre el array contact usando la función map(); */}
					{/* loop through the contact array using the map() function; */}
					<div className="col-md-12 mb-4 d-flex align-items-start">
						<div className="card me-4" style={{ width: '30%', height: '600px' }}>
							<div className="card-body">
								<h3 className="card-title mb-2 text-center">{store.veterinarySelected.veterinary_name}</h3>
								<img
									className="card-img-top mb-2"
									src={`${rutaImagenes}${store.veterinarySelected.img_url}`}
									alt="Card image cap"
								/>
								<h5 className="card-title mb-2">Ciudad: {store.veterinarySelected.city}</h5>
								<h5 className="card-title mb-2">Dirección: {store.veterinarySelected.address}</h5>
								<h5 className="card-title mb-2">Email: {store.veterinarySelected.email}</h5>
								<h5 className="card-title mb-2">Teléfono: {store.veterinarySelected.phone_number}</h5>
							</div>
							<div>
								<Link to="/contact-form">
									<button className="btn btn-primary">Contactar</button>
								</Link>
							</div>
						</div>
						{/* Mapa */}
						{store.veterinarySelected.address ? (
							<div className="mapa" style={{ width: '70%', height: '600px' }}>
								<Mapa direccion={store.veterinarySelected.address + " " + store.veterinarySelected.city} />
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

