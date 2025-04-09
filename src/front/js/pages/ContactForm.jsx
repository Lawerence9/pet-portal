import React, { useState } from "react";

export const ContactForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [comments, setComments] = useState("")

    const handleSubmit = (event) =>{
        event.preventDefault()
    }
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
                        <input  type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Comentarios
                        <textarea type="text" value={comments} onChange={(e) => setComments(e.target.value)} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3 justify-content-center">
                    <span>
                        <button type="submit" className="form-control btn btn-primary" required>Enviar</button>
                    </span>
                </div>
            </div>
        </form>
    )
}