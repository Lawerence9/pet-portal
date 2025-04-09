import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import LogoURL from "../../img/logo.png";
import "../../styles/home.css";
import Fondo from "../../img/fondop.jpeg";

export const Home = () => {
	

	return (
		<div className="text-center mt-5" style={{backgroundImage: `url(${Fondo})`, backgroundSize: "cover", height: "100vh"}}>
		
		
		<div className="text-center mt-5">
         <p>
         <img src={LogoURL} className="img-fluid" alt="Logo" />
         </p>
        </div>
						
		</div>
	);
};
