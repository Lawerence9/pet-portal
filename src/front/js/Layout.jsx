import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom pages or views
import { Home } from "./pages/Home.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { Adopciones } from "./pages/Adopciones.jsx";
import { Donaciones } from "./pages/Donaciones.jsx";
import { Login } from "./pages/Login.jsx";
import { Noticias } from "./pages/Noticias.jsx";
import { Protectoras } from "./pages/Protectoras.jsx";
import { SitiosInteres } from "./pages/SitiosInteres.jsx";
import { SosAnimal } from "./pages/SosAnimal.jsx";
import { Tiendas } from "./pages/Tiendas.jsx";
import { Veterinarias } from "./pages/Veterinarias.jsx";
import { VistaDetalles } from "./pages/VistaDetalles.jsx";

const basename = process.env.BASENAME || "";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  

    // if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
    

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/home" />
                        <Route element={<Error404 />} path="*" />
                        <Route element={<Adopciones />} path="/adopciones" />
                        <Route element={<Donaciones />} path="/donaciones" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Noticias />} path="/noticias" />
                        <Route element={<Protectoras />} path="/Protectoras" />
                        <Route element={<SitiosInteres />} path="/sitios-interes" />
                        <Route element={<SosAnimal />} path="/sos-animal" /> 
                        <Route element={<Tiendas />} path="/Tiendas" />
                        <Route element={<Veterinarias />} path="/veterinarias" />
                        <Route element={<VistaDetalles />} path="/vista-detalles" />
                      
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
