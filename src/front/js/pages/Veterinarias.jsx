import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import Fondovet from "../../img/fondocrearvet.png";

export const Veterinarias = () => {
	const { store, actions } = useContext(Context);
	

	const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "";
	const [filter, SetFilter] = useState("");

	const changeFilter = (filter) => {
		SetFilter(filter);
	};

	useEffect(() => {
		actions.getVeterinary("all");
	}, []);

	return (
		<div className="mt-2" style={{ backgroundImage: `url(${Fondovet})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundAttachment: "fixed", height: "100vh", width: "100%" }}>
			<h1 className="text-center">Veterinarias</h1>
			{store.userRole === "Admin" && (
				<Link to="/new-veterinary">
					<button className="btn btn-primary mb-2 mx-3">Nueva veterinaria</button>
				</Link>
			)}

			<div className="btn-group my-2 mx-5">
				<button className="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Selecciona Ciudad
				</button>
				<ul className="dropdown-menu">
					<li><a className="dropdown-item" href="#" onClick={() => changeFilter("")}>Todas</a></li>
					{store.veterinary.map((iterator) => (
						<li key={iterator.id}>
							<a className="dropdown-item" href="#" onClick={() => changeFilter(iterator.city)}>
								{iterator.city}
							</a>
						</li>
					))}
				</ul>
			</div>

			{/* Añadimos un contenedor alrededor de los elementos JSX adyacentes */}
			<div className="row mx-auto">
				{store.veterinary
					.filter(shelter => filter === "" || shelter.city === filter)
					.map((iterator) => (
						<div key={iterator.id} className="col-md-4 mb-4">
							<div className="card">
								<div className="card-body">
									<h3 className="card-title mb-3 text-center">{iterator.veterinary_name}</h3>
									<img className="card-img-top mb-2" style={{ width: '400px', height: '500px' }} src={`${rutaImagenes}/${iterator.img_url}`} alt="Card image cap" />
									<h5 className="card-title mb-2">{iterator.city}</h5>
									<Link to="/vista-detalles" >
										<button type="button" className="btn btn-primary mb-2" onClick={() => actions.getVeterinary(iterator.id)} >Ver veterinaria</button>
									</Link>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
