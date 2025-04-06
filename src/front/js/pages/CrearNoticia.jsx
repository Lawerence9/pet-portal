import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const CrearNoticia = () => {
    const { actions } = useContext(Context);
    const [notice, setNotice] = useState({
        title: "",
        body: "",
        status: "active",
        importance_level: "normal",
        img_url: ""
    });
    const [message, setMessage] = useState(null); // Mensaje de éxito/error

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNotice({
            ...notice,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!notice.title.trim() || !notice.body.trim()) {
            setMessage("El título y el contenido son obligatorios.");
            return;
        }

        const success = await actions.createNotice(notice);
        
        if (success) {
            setMessage("Noticia creada exitosamente.");
            setTimeout(() => navigate("/noticias"), 2000); // Redirige después de 2s
        } else {
            setMessage("Error al crear la noticia. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear Nueva Noticia</h2>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
                <div className="form-group mb-3">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={notice.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="body">Contenido</label>
                    <textarea
                        id="body"
                        name="body"
                        className="form-control"
                        value={notice.body}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="status">Estado</label>
                    <select
                        id="status"
                        name="status"
                        className="form-select"
                        value={notice.status}
                        onChange={handleInputChange}
                    >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="importance_level">Nivel de Importancia</label>
                    <select
                        id="importance_level"
                        name="importance_level"
                        className="form-select"
                        value={notice.importance_level}
                        onChange={handleInputChange}
                    >
                        <option value="low">Baja</option>
                        <option value="medium">Normal</option>
                        <option value="high">Alto</option>
                    </select>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="img_url">URL de Imagen</label>
                    <input
                        type="text"
                        id="img_url"
                        name="img_url"
                        className="form-control"
                        value={notice.img_url}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Crear Noticia</button>
            </form>
        </div>
    );
};
