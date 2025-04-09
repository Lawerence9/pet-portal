import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import Fondoadop from "../../img/fadop.jpeg";

export const Adopciones = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAdoptions("all")
	}, []);


	return (
		<div className="container"  style={{backgroundImage: `url(${Fondoadop})`, backgroundSize: "cover", height: "190vh"}}>
			<h1 className="text-center my-4">ADOPCIONES</h1>
			{store.userRole=="Protector" ? <Link to="/new-adoption">
			<button className="btn btn-primary mb-2">Nueva adopción</button>
			</Link> : ""}
			<div className="row">
				{store.adoptions.map((iterator) =>
					<div className="col-md-4 mb-4" key={iterator.id}>
						<div className="card">
							<div className="card-body">
								<h5 className="card-title mb-2">{iterator.status}</h5>
								<img className="card-img-top" src={iterator.img_url} alt="Card image cap" />
								<h5 className="card-title mb-2">{iterator.province}</h5>
								<Link to="/adoption-details" >
									<button type="button" className="btn btn-primary mb-2" onClick={() => actions.getAdoptions(iterator.id)} >Ver adopcion</button>
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
