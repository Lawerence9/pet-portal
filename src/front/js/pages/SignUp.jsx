import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fondologin from "../../img/fondo2.png";


export const SignUp = () => {
	const navigate = useNavigate();
	const devMode = "true";
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user_name, setUser_name] = useState("");
	const [role, setRole] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [showRoleError, setShowRoleError] = useState(false);

	const roleType = {
		User: "Usuario",
		Protector: "Protectora",
		Veterinary: "Veterinaria"
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!role) {
			setShowRoleError(true);
			setError("Debes elegir un rol.");
			return;
		}

		setShowRoleError(false);
		setError("");

		const response = await fetch(`${process.env.BACKEND_URL}/api/sign-up`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_name, email, password, role })
		});

		const data = await response.json();

		if (response.ok) {
			setSuccess("¡Cuenta creada con éxito! Redirigiendo...");
			setTimeout(() => navigate("/login"), 2000);
		} else {
			setError(data.message || "Error al registrarse. Inténtalo de nuevo.");
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${Fondologin})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "70vh",}}>
						
         <div className="p-4" style={{backgroundColor: "#f2f2f2", color: "#000", width: "100%", maxWidth: "400px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)",}}>	
			<form onSubmit={handleSubmit}>
				<h2 className="text-center mb-3">Sign Up</h2>
				<div className="text-center mt-4">
					<div className="form-group mb-3">
						<span>Username
							<input onChange={(e) => setUser_name(e.target.value)} type="text" value={user_name} className="form-control" placeholder="Username" required />
						</span>
					</div>
					<div className="form-group mb-3">
						<span>Email
							<input onChange={(e) => setEmail(e.target.value)} type="email" value={email} className="form-control" placeholder="Email" required />
						</span>
					</div>
					<div className="form-group mb-3">
						<span>Password
							<input onChange={(e) => setPassword(e.target.value)} type="password" value={password} className="form-control" placeholder="Password" required />
						</span>
					</div>
					<div className="input-group mb-3 justify-content-center">
						<span>Rol
							<div className="dropdown">
								<button
									className={`btn dropdown-toggle ${showRoleError ? 'btn-danger' : 'btn-primary'}`}
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{roleType[role] || "Selecciona"}
								</button>
								<ul className="dropdown-menu">
									<li><span className="dropdown-item" onClick={() => setRole("User")}>Usuario</span></li>
									<li><span className="dropdown-item" onClick={() => setRole("Protector")}>Protectora</span></li>
									<li><span className="dropdown-item" onClick={() => setRole("Veterinary")}>Veterinaria</span></li>
									{devMode ? (
										<li>
											<span className="dropdown-item" onClick={() => setRole("Admin")}>
												Administrador
											</span>
										</li>
									) : null}
								</ul>
							</div>
							{showRoleError && <div className="text-danger mt-1">* Este campo es obligatorio</div>}
						</span>
					</div>
					<div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
				</div>
				{error && <p className="text-danger">{error}</p>}
				{success && <p className="text-success">{success}</p>}
			</form>
		</div>
		</div>
	);
};
