import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const {store, actions} = useContext(Context)
	const navigate = useNavigate()

	const handleLogoutButton = (event) => {
        event.preventDefault()
        actions.logout()
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login")
	}
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
					<Link to="/sign-up">
						<button className="btn btn-primary">SIGN UP</button>
					</Link>
				</div>

				<div className="ml-auto">
				{store.isLogged == true ? <span type="button" onClick={handleLogoutButton} className="btn btn-primary">LOGOUT</span> : <Link to="/login"><span className="btn btn-primary">LOGIN</span></Link>}
				</div>
			</div>
		</nav>
	);
};
