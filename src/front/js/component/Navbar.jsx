import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logo.jpeg";

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
		<nav className="navbar navbar-expand-lg navbar-dark light-dark py-2">
			<div className="container">
                
			    <Link to="/">
				    <span className="h-full object-contain" style={{ padding: 0 }}>
					<img alt="" src={logo} style={{height: "6.9rem", verticalAlign: "middle", marginRight: "0" }} />
					</span>
				
				</Link>
				<Link to="/home">
					<span className="navbar-brand mb-0 h1 nav-link-medio">HOME</span>
				</Link>

				<Link to="/noticias">
					<span className="navbar-brand mb-0 h1 nav-link-medio">NOTICIAS</span>
				</Link>

				<Link to="/protectoras">
					<span className="navbar-brand mb-0 h1 nav-link-medio">PROTECTORAS</span>
				</Link>

				<Link to="/veterinarias">
					<span className="navbar-brand mb-0 h1 nav-link-medio">VETERINARIAS</span>
				</Link>

				<Link to="/adopciones">
					<span className="navbar-brand mb-0 h1 nav-link-medio">ADOPCIONES</span>
				</Link>
				
				<Link to="/sos-animal">
					<span className="navbar-brand mb-0 h1 nav-link-medio">SOS</span>
				</Link>

				<Link to="/tiendas">
					<span className="navbar-brand mb-0 h1 nav-link-medio">TIENDAS</span>
				</Link>

				<Link to="/donaciones">
					<span className="navbar-brand mb-0 h1 nav-link-medio">DONACIONES</span>
				</Link>

				<div className="ml-auto">
					<Link to="/sign-up">
						<button className="btn btn-secondary">SIGN UP</button>
					</Link>
				</div>

				<div className="ml-auto">
				{store.isLogged == true ? <span type="button" onClick={handleLogoutButton} className="btn btn-secondary">LOGOUT</span> : <Link to="/login"><span className="btn btn-secondary">LOGIN</span></Link>}
				</div>
			</div>
		</nav>
	);
};
