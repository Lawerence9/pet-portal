import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import Fondosos from "../../img/fondosos.jpeg";


export const SosAnimal = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="mt-2" style={{backgroundImage: `url(${Fondosos})`, backgroundSize: "cover", height: "100vh", width: "100%"}}>
			<h1>SOS ANIMAL</h1>	
						
		</div>
	);
};
