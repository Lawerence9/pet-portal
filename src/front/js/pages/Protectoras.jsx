import React, { useContext } from "react";
import { Context } from "../store/appContext.js";

export const Protectoras = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>PROTECTORAS</h1>	
						
		</div>
	);
};
