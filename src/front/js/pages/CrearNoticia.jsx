import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Fondocrearnoti from "../../img/fondocrearnoti.png";

export const CrearNoticia = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [importance_level, setImportance_level] = useState("low");
    const [img_url, setImg_url] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const importanceLabels = {
        low: "Baja",
        medium: "Normal",
        high: "Alta"
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let uploadedImageUrl = null;

        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            const uploadRes = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadRes.json();

            if (!uploadRes.ok || !uploadData.img_url) {
                setError("Error al subir la imagen.");
                return;
            }

            uploadedImageUrl = uploadData.img_url;
            setImg_url(uploadedImageUrl);
        }

        if (!title.trim() || !body.trim()) {
            setError("El título y el contenido son obligatorios.");
            return;
        }

        const response = await fetch(`${process.env.BACKEND_URL}/api/news`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify({
                title,
                body,
                importance_level,
                status: "active",
                img_url: uploadedImageUrl || img_url,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess("Noticia creada exitosamente. Redirigiendo...");
            setTimeout(() => navigate("/noticias"), 2000);
        } else {
            setError(data.message || "Error al crear la noticia.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center"
            style={{
                backgroundImage: `url(${Fondocrearnoti})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            <form
                className="container d-flex flex-column align-items-center justify-content-center mt-5"
                onSubmit={handleSubmit}
            >
                <div className="text-center mb-3">
                    <h2>Crear Nueva Noticia</h2>
                </div>
                <div>
                    <div className="input-group mb-3">
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {file && <p className="text-white">Imagen lista para subir</p>}
                        {img_url && <img src={img_url} alt="Subida" style={{ maxWidth: "300px" }} />}
                    </div>
                    <div className="input-group mb-3">
                        <span className="text-white">Título
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control"
                                required
                            />
                        </span>
                    </div>
                    <div className="input-group mb-3">
                        <span className="text-white">Contenido
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="form-control"
                                rows="4"
                                required
                            />
                        </span>
                    </div>
                    <div className="input-group mb-3">
                        <span className="text-white">Nivel de importancia
                            <div className="dropdown">
                                <button
                                    className="btn btn-primary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {importanceLabels[importance_level] || "Selecciona"}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><span className="dropdown-item" onClick={() => setImportance_level("low")}>Baja</span></li>
                                    <li><span className="dropdown-item" onClick={() => setImportance_level("medium")}>Normal</span></li>
                                    <li><span className="dropdown-item" onClick={() => setImportance_level("high")}>Alta</span></li>
                                </ul>
                            </div>
                        </span>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary mb-3">Crear Noticia</button>
                    </div>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
            </form>
        </div>
    );
};
