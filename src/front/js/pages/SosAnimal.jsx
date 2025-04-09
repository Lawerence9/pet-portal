import React, { useContext } from "react";
import { Context } from "../store/appContext.js";

export const SosAnimal = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>SOS ANIMAL</h1>	
						
		</div>
	);
};
