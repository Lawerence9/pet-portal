import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Donaciones = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
				<h1>DONACIONES</h1>		
						
		</div>
	);
};
