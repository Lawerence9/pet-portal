import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import Fondologin from "../../img/fondo2.png";


export const Login = () => {
	const { actions } = useContext(Context);

	const navigate = useNavigate();

	const [user, setUser] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");

		const dataToSend = { user, email, password };
		const success = await actions.login(dataToSend);

		if (success) {
			navigate("/home");
		} else {
			setError("Incorrect username, password or email");
		}
	};


	return (
		<div 	className="d-flex justify-content-center align-items-center"
		style={{
			backgroundImage: `url(${Fondologin})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			minHeight: "100vh",}}>
				
		<div
			className="p-4"
			style={{
				backgroundColor: "#f2f2f2",
				color: "#000",
				width: "100%",
				maxWidth: "400px",
				borderRadius: "10px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.3)",}}>	
				<form onSubmit={handleSubmit}>
				<h2 className="text-center mb-4">Login</h2>
				<div className="text-center mb-4">
					<div className="form-group mb-4">
						<span>Email
							<input onChange={(e) => setEmail(e.target.value)} type="email" value={email} className="form-control" placeholder="Email" required />
						</span>
					</div>
					<div className="form-group mb-4">
						<span>Password
							<input onChange={(e) => setPassword(e.target.value)} type="password" value={password} className="form-control" placeholder="Password" required />
						</span>
					</div>
					<div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
				</div>
				{error && (<div className="container mt-2 alert alert-danger text-center custom-alert">{error}</div>)}
			</form>
		</div>
		</div>
	);
};
