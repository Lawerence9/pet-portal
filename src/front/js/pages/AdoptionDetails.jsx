import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Fondoadop from "../../img/fadoption.jpeg";


export const AdoptionDetails = () => {
	const { store } = useContext(Context)
	const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "";

	return (
		<div className="mt-2" style={{ backgroundImage: `url(${Fondoadop})`, backgroundSize: "cover", height: "190vh", width: "100%" }}>
			<h1 className="text-center">Detalles</h1>
			<div className="row">
				<div className="col-md-6 mb-4 mx-auto">
					{<div className="card" >
						<div className="card-body">
							<img
								className="card-img-top mb-2"
								src={`${rutaImagenes}/${store.selectedAdoption.img_url}`}
								alt="Imagen de adopción" />
							{/*<h5 className="card-title mb-2">Estado: {store.selectedAdoption.status}</h5>*/}
							{/*<h5 className="card-title mb-2">{store.selectedAdoption.is_active}</h5>*/}
							<h5 className="card-title mb-2">Edad: {store.selectedAdoption.how_old > 1 ? store.selectedAdoption.how_old + " años" : store.selectedAdoption.how_old + " año"}</h5>
							<h5 className="card-title mb-2">
								Especie: {{
									Dog: "Perro",
									Cat: "Gato",
									Other: "Otros"
								}[store.selectedAdoption.specie]}
							</h5>
							<h5 className="card-title mb-2">Sexo: {{
									Female: "Hembra",
									Male: "Macho"
								}[store.selectedAdoption.sex]}</h5>
							{/*<h5 className="card-title mb-2">Tiempo sin familia: {store.selectedAdoption.unadopted_time}</h5>*/}
							<h5 className="card-title mb-2">Provincia: {store.selectedAdoption.province}</h5>
							<h5 className="card-title mb-2">Descripción: {store.selectedAdoption.description}</h5>
							{/*<h5 className="card-title mb-2">{store.selectedAdoption.adoption_priority}</h5>*/}
							<div className="">
								<Link to="/contact-form">
									<button className="btn btn-primary">Contactar</button>
								</Link>
							</div>
						</div>
					</div>
					}
				</div>
			</div>
		</div>
	);
}