import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import Fondovet from "../../img/fondovet.png";

export const Veterinarias = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5" style={{backgroundImage: `url(${Fondovet})`, backgroundSize: "cover", height: "190vh"}}>
			<h1>VETERINARIA</h1>	
						
		</div>
	);
};
