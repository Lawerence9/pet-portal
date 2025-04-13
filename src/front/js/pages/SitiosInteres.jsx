import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import Fondositios from "../../img/fprotectora.jpeg";


export const SitiosInteres = () => {
	const { store, actions } = useContext(Context);

	return (
	<div className="mt-2" style={{backgroundImage: `url(${Fondositios})`, backgroundSize: "cover", height: "190vh", width:"100%"}}>
			<h1>SITIOS DE INTERES</h1>	
						
		</div>
	);
};
