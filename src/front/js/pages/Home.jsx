import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import Fondo from "../../img/fondo_home.png";


export const Home = () => {
	

	return (

		<div className="text-center mt-5" style={{backgroundImage: `url(${Fondo})`, backgroundSize: "cover", height: "190vh",  backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundColor: "#ffffff", display: "center"}}>

						
		</div>
	);
};
