import React, { useContext } from "react";
import { Context } from "../store/appContext.js";

export const Tiendas = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>TIENDAS</h1>	
						
		</div>
	);
};
