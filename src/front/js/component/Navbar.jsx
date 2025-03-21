import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">

				<Link to="/home">
					<span className="navbar-brand mb-0 h1">HOME</span>
				</Link>

				<Link to="/noticias">
					<span className="navbar-brand mb-0 h1">NOTICIAS</span>
				</Link>

				<Link to="/protectoras">
					<span className="navbar-brand mb-0 h1">PROTECTORAS</span>
				</Link>

				<Link to="/veterinarias">
					<span className="navbar-brand mb-0 h1">VETERINARIAS</span>
				</Link>

				<Link to="/adopciones">
					<span className="navbar-brand mb-0 h1">ADOPCIONES</span>
				</Link>
				
				<Link to="/sos-animal">
					<span className="navbar-brand mb-0 h1">SOS</span>
				</Link>

				<Link to="/tiendas">
					<span className="navbar-brand mb-0 h1">TIENDAS</span>
				</Link>

				<Link to="/donaciones">
					<span className="navbar-brand mb-0 h1">DONACIONES</span>
				</Link>

				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">LOGIN</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
