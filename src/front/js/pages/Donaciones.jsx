import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import Fondodona from "../../img/ffeliz.jpeg";

export const Donaciones = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${Fondodona})`, backgroundSize: "cover", height: "100vh", width:"100%"}}>
				<h1>DONACIONES</h1>		
						
		</div>
	);
};
