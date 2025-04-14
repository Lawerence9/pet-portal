import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logo.jpeg";
import "../../styles/index.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()

	const handleLogoutButton = (event) => {
		event.preventDefault()
		actions.logout()
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		navigate("/login")
	}


	return (
		<nav className="navbar navbar-expand-lg navbar-dark light-dark">
			<div className="container">
					<span className="h-full object-contain" style={{ padding: 0 }}>
						<img alt="" src={logo} style={{ height: "6.9rem", verticalAlign: "middle", marginRight: "0" , borderRadius:"25px"}} />
					</span>
				<Link to="/home" className="nav-link " style={{boxShadow:"2px 0px 4px rgba(212, 7, 212, 0.6)" , borderRadius:"10px", textDecoration: "none"}}>
					<span className="navbar-brand mb-0 h1 mx-auto">HOME</span>
				</Link>

				<Link to="/noticias" className="nav-link" style={{boxShadow:"2px 0px 4px rgba(212, 7, 212, 0.6)" , borderRadius:"10px", textDecoration: "none"}}>
					<span className="navbar-brand mb-0 h1 mx-auto">NOTICIAS</span>
				</Link>

				<Link to="/protectoras" className="nav-link " style={{boxShadow:"2px 0px 4px rgba(212, 7, 212, 0.6)" , borderRadius:"10px", textDecoration: "none"}}>
					<span className="navbar-brand mb-0 h1 mx-auto">PROTECTORAS</span>
				</Link>

				<Link to="/veterinarias" className="nav-link" style={{boxShadow:"2px 0px 4px rgba(212, 7, 212, 0.6)" , borderRadius:"10px", textDecoration: "none"}}>
					<span className="navbar-brand mb-0 h1 mx-auto">VETERINARIAS</span>
				</Link>

				<Link to="/adopciones" className="nav-link" style={{boxShadow:"2px 0px 4px rgba(212, 7, 212, 0.6)" , borderRadius:"10px" ,textDecoration: "none"}}>
					<span className="navbar-brand mb-0 h1 mx-auto">ADOPCIONES</span>
				</Link>


				{Object.keys(store.user).length === 0 && (
					<div className="ml-auto">
						<Link to="/sign-up">
							{/* Botones para Login / SignUp u otra cosa */}
							<button className="btn btn-secondary">SIGN UP</button>
						</Link>
					</div>
				)}

			
				<div className="ml-auto">
				{store.isLogged == true ? 
				

				<div className="d-flex align-items-center gap-2">
					<span className="me-2 text-white">Hola, {store.user}</span>
					<span type="button" onClick={handleLogoutButton} className="btn btn-secondary">
						LOGOUT
					</span>
				</div> : <Link to="/login"><span className="btn btn-secondary">LOGIN</span></Link>}
						</div>

			</div>

		
			

		</nav >
	);
};
