import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logo.jpeg";
import "../../styles/index.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogoutButton = (event) => {
    event.preventDefault();
    actions.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Estilo para los enlaces de navegación
  const navLinkStyle = {
    boxShadow: "2px 0px 4px rgba(212, 7, 212, 0.6)",
    borderRadius: "10px",
    textDecoration: "none",
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark light-dark">
      <div className="container">
        {/* Logo enlazado al home */}
        <Link to="/home" className="navbar-brand" style={{ padding: 0 }}>
          <img
            alt="Logo"
            src={logo}
            style={{
              height: "6.9rem",
              verticalAlign: "middle",
              marginRight: "0",
              borderRadius: "25px",
            }}
          />
        </Link>

        {/* Botón toggler para móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Contenido colapsable: menú y opciones de usuario */}
        <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarContent">
          {/* Menú central */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link
                to="/home"
                className="nav-link d-flex justify-content-center align-items-center"
                style={navLinkStyle}
              >
                <span className="navbar-brand mb-0 h1">HOME</span>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                to="/noticias"
                className="nav-link d-flex justify-content-center align-items-center"
                style={navLinkStyle}
              >
                <span className="navbar-brand mb-0 h1">NOTICIAS</span>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                to="/protectoras"
                className="nav-link d-flex justify-content-center align-items-center"
                style={navLinkStyle}
              >
                <span className="navbar-brand mb-0 h1">PROTECTORAS</span>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                to="/veterinarias"
                className="nav-link d-flex justify-content-center align-items-center"
                style={navLinkStyle}
              >
                <span className="navbar-brand mb-0 h1">VETERINARIAS</span>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                to="/adopciones"
                className="nav-link d-flex justify-content-center align-items-center"
                style={navLinkStyle}
              >
                <span className="navbar-brand mb-0 h1">ADOPCIONES</span>
              </Link>
            </li>
          </ul>

          {/* Sección de autenticación a la derecha */}
          <div className="d-flex align-items-center">
            {Object.keys(store.user).length === 0 && (
              <Link to="/sign-up" className="me-2">
                <button className="btn btn-secondary">SIGN UP</button>
              </Link>
            )}
            {store.isLogged ? (
              <div className="d-flex align-items-center gap-2">
                <span className="me-2 text-white">Hola, {store.user}</span>
                <button
                  type="button"
                  onClick={handleLogoutButton}
                  className="btn btn-secondary"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn btn-secondary">LOGIN</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
