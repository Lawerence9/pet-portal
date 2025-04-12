import React, { useContext, useEffect,useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import Fondovet from "../../img/fondovet.png";

export const Veterinarias = () => {
	const { store, actions } = useContext(Context);

	const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "";
const [filter, SetFilter] = useState("");

const changeFilter = (filter) => {
	SetFilter(filter);
}


	useEffect(() => {
		actions.getVeterinary("all");
	}, []);


	return (

		<div className="container">
			<h1 className="text-center my-4">VETERINARIAS</h1>
			{store.userRole === "Admin" && (
				<Link to="/new-veterinary">
					<button className="btn btn-primary mb-2">Nueva veterinaria</button>
				</Link>
			)}

			<div className="btn-group my-2">
						<button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Selecciona Ciudad
						</button>
						<ul className="dropdown-menu">
							<li ><a className="dropdown-item" href="#" onClick={() => changeFilter("")}>Todas</a></li>
						{store.veterinary.map((iterator, index) => (
								<div key={index}>
									{/* Aquí va lo que quieras renderizar por cada 'iterator' */}
									<li key={index}><a className="dropdown-item" href="#" onClick={() => changeFilter(iterator.city)}>{iterator.city}</a></li>
								</div>
						))}
						</ul>
			</div>

			<div className="row">
				{/* recorre el array contact usando la función map(); */}
				{/* loop through the contact array using the map() function; */}
				{store.veterinary
								.filter(shelter => filter === "" || shelter.city === filter)
								.map((iterator) =>
					<div className="col-md-4 mb-4">
						<div className="card" >
							<div className="card-body">
								<h3 className="card-title mb-3 text-center">{iterator.veterinary_name}</h3>
								<img class="card-img-top mb-2" src={`${rutaImagenes}/${iterator.img_url}`} alt="Card image cap" />
								<h5 className="card-title mb-2">{iterator.city}</h5>
								<Link to="/vista-detalles" >
									<button type="button" className="btn btn-primary mb-2" onClick={(event) => actions.getVeterinary(iterator.id)} >Ver veterinaria</button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="text-center mt-5" style={{ backgroundImage: `url(${Fondovet})`, backgroundSize: "cover", height: "190vh" }}>
			</div>

		</div>
	);
};
