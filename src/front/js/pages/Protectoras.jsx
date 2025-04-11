import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import Fondopr from "../../img/fprotectora.jpeg";

export const Protectoras = () => {
	const { store, actions } = useContext(Context);

	const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "";

	useEffect(() => {
		actions.getAnimalShelter("all");
	}, []);


	return (
		<div className="container" style={{ backgroundImage: `url(${Fondopr})`, backgroundSize: "cover", height: "200vh" }}>
			<h1 className="text-center my-4">PROTECTORAS</h1>
			<div className="row">
				{store.userRole === "Admin" && (
								<Link to="/new-animal-shelter">
									<button className="btn btn-primary mb-2">Nueva protectora</button>
								</Link>
							)}
				{/* recorre el array contact usando la función map(); */}
				{/* loop through the contact array using the map() function; */}
				{store.animalShelter.map((iterator) =>
					<div className="col-md-4 mb-4">
						<div className="card" >
							<div className="card-body">
								<h5 className="card-title mb-2 text-center">{iterator.shelter_name}</h5>
								<img className="card-img-top" src={`${rutaImagenes}/${iterator.img_url}`} alt="Card image cap" />
								<h5 className="card-title mb-2">{iterator.city}</h5>
								<Link to="/animal-shelter-detail" >
									<button type="button" className="btn btn-primary mb-2" onClick={(event) => actions.getAnimalShelter(iterator.id)} >Ver protectora</button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
