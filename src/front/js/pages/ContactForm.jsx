import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ContactForm = () => {
    const { store } = useContext(Context);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comments, setComments] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();       

        const response = await fetch(process.env.BACKEND_URL + "/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                comments,
                shelter_email: store.animalShelterEmail
            })
        });

        if (response.ok) {
            alert("Mensaje enviado correctamente");
            setName("");
            setEmail("");
            setComments("");
        } else {
            alert("Error al enviar el mensaje");
        }
    };

    return (
        <form className="container d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit}>
            <div className="text-center mb-3">
                <h2>Formulario de contacto</h2>
            </div>
            <div>
                <div className="input-group mb-3">
                    <span>Nombre
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Email
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Comentarios
                        <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3 justify-content-center">
                    <button type="submit" className="form-control btn btn-primary">Enviar</button>
                </div>
            </div>
        </form>
    );
};
