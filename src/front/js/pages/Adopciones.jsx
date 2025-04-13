import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import Fondoadop from "../../img/fadoptados.png";

export const Adopciones = () => {
	const { store, actions } = useContext(Context);

	const host = process.env.BACKEND_URL;
	const rutaImagenes = host + "";
	const [filter, SetFilter] = useState("");

	const changeFilter = (filter) => {
		SetFilter(filter);
	}

	useEffect(() => {
		actions.getAdoptions("all");
	}, []);

	return (
		<div className="mt-2" style={{ backgroundImage:`url(${Fondoadop})`, backgroundSize: "100% 100%", backgroundPosition: "center", backgroundAttachment: "fixed", height:"180vh", width: "100%"}}>
			<h1 className="text-center">Adopciones</h1>
			{store.userRole === "Protector" && (
				<Link to="/new-adoption">
					<button className="btn btn-primary mb-2 mx-5">Nueva adopción</button>
				</Link>
			)}
			<div className="btn-group my-2 mx-5">
				<button className="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Selecciona Ciudad
				</button>
				<ul className="dropdown-menu">
					<li ><a className="dropdown-item" href="#" onClick={() => changeFilter("")}>Todas</a></li>
					{store.adoptions.map((iterator, index) => (
						<div key={index}>
							{/* Aquí va lo que quieras renderizar por cada 'iterator' */}
							<li key={index}><a className="dropdown-item" href="#" onClick={() => changeFilter(iterator.province)}>{iterator.province}</a></li>
						</div>
					))}
				</ul>
			</div>
			<div className="row mx-auto">
				{store.adoptions
					.filter(shelter => filter === "" || shelter.province === filter)
					.map((iterator) => (
						<div className="col-md-4 mb-4" key={iterator.id}>
							<div className="card">
								<div className="card-body">
									<h3 className="card-title mb-3 text-center">{iterator.status}</h3>
									<img className="card-img-top mb-2" src={`${rutaImagenes}/${iterator.img_url}`} alt="Card image cap" />
									<h5 className="card-title mb-2">{iterator.province}</h5>
									<Link to="/adoption-details">
										<button
											type="button"
											className="btn btn-primary mb-2"
											onClick={() => {
												actions.getAdoptions(iterator.id);
											}}>
											Ver Adopción
										</button>
									</Link>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
