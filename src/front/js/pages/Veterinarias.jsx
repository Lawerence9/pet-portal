import React, { useContext } from "react";
import { Context } from "../store/appContext.js";

export const Veterinarias = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>VETERINARIA</h1>	
						
		</div>
	);
};
