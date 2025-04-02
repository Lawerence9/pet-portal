import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";

export const Adopciones = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAdoptions()
	}, []);


	return (
		<div className="container">
			<h1 className="text-center my-4">ADOPCIONES</h1>
			<div className="row">
				{store.adoptions.map((iterator, index) =>
					<div className="col-md-4 mb-4">
						<div className="card" >
							<div className="card-body">
								<h5 className="card-title mb-2">{iterator.status}</h5>
								<img class="card-img-top" src={iterator.img_url} alt="Card image cap" />
								<h5 className="card-title mb-2">{iterator.province}</h5>
								<Link to="/" >
									<button type="button" className="btn btn-primary mb-2" onClick={(event) => actions.getAdoptions(iterator.id)} >Ver adopcion</button>
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
