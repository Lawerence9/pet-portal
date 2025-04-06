import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const NewAdoption = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const [img_url, setImg_url] = useState("")
    const [status, setStatus] = useState("")
    const [is_active, setIs_active] = useState("")
    const [how_old, setHow_old] = useState("")
    const [specie, setSpecie] = useState("")
    const [race, setRace] = useState("")
    const [sex, setSex] = useState("")
    const [unadopted_time, setUnadopted_time] = useState("")
    const [province, setProvince] = useState("")
    const [description, setDescription] = useState("")
    const [adoption_priority, setAdoption_priority] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await fetch(`${process.env.BACKEND_URL}/api/adoptions`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`
            },
            body: JSON.stringify({ status, is_active, how_old, specie, race, sex, unadopted_time, province, description })
        });

        const data = await response.json()

        if (response.ok) {
            setSuccess("Adoption created successfully! Redirecting...");
            setTimeout(() => navigate("/Adopciones"), 2000);
        }

        else {
            setError(data.message || "Error creating an adoption, be sure all fields are correct.");
        }
    }
    return (

        <form className="container d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit}>
            <div className="text-center mb-3">
                <h2>Nueva adopción</h2>
            </div>
            <div>
                <div className="input-group mb-3">
                    <span>Url imagen
                        <input onChange={(e) => setImg_url(e.target.value)} type="text" value={img_url} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Estado
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {status || " "}
                            </button>
                            <ul className="dropdown-menu">
                                <li><span className="dropdown-item" onClick={() => setStatus("Recently rescued")}>{"Recently rescued"}</span></li>
                                <li><span className="dropdown-item" onClick={() => setStatus("Adoption in process")}>{"Adoption in process"}</span></li>
                                <li><span className="dropdown-item" onClick={() => setStatus("Waiting for you <3")}>{"Waiting for you <3"}</span></li>
                                <li><span className="dropdown-item" onClick={() => setStatus("Adopted :)")}>{"Adopted :)"}</span></li>
                            </ul>
                        </div>
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Activo
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {is_active || " "}
                            </button>
                            <ul className="dropdown-menu">
                                <li><span className="dropdown-item" onClick={() => setIs_active("true")}>{"Si"}</span></li>
                                <li><span className="dropdown-item" onClick={() => setIs_active("false")}>{"No"}</span></li>
                            </ul>
                        </div>
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Edad
                        <input onChange={(e) => setHow_old(e.target.value)} type="number" min="0" step="1" value={how_old} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Especie
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {specie || " "}
                            </button>
                            <ul className="dropdown-menu">
                                <li><span className="dropdown-item" onClick={() => setSpecie("Dog")}>{"Dog"}</span></li>
                                <li><span className="dropdown-item" onClick={() => setSpecie("Cat")}>{"Cat"}</span></li>
                                <li><span className="dropdown-item" onClick={() => setSpecie("Other")}>{"Other"}</span></li>
                            </ul>
                        </div>
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Raza
                        <input onChange={(e) => setRace(e.target.value)} type="text" value={race} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Sexo
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {sex || " "}
                            </button>
                            <ul className="dropdown-menu">
                                <li><span className="dropdown-item" onClick={() => setSex("Male")}>{"Male"}</span></li>
                                <li><span className="dropdown-item" onClick={() => setSex("Female")}>{"Female"}</span></li>
                            </ul>
                        </div>
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Sin adoptar desde
                        <input onChange={(e) => setUnadopted_time(e.target.value)} type="date" value={unadopted_time} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Provincia
                        <input onChange={(e) => setProvince(e.target.value)} type="text" value={province} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Descripción
                        <textarea onChange={(e) => setDescription(e.target.value)} type="text" value={description} className="form-control" required />
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span>Prioridad de adopción
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {adoption_priority || " "}
                            </button>
                            <ul className="dropdown-menu">
                                <li><span className="dropdown-item" onClick={() => setAdoption_priority("true")}>{"Si"}</span></li>
                                <li><span className="dropdown-item" onClick={() => setAdoption_priority("false")}>{"No"}</span></li>
                            </ul>
                        </div>
                    </span>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
        </form >

    )
}