import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user_name, setUser_name] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")


    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await fetch(`${process.env.BACKEND_URL}/api/sign-up`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_name, email, password })
        });

        const data = await response.json()

        if (response.ok) {
            setSuccess("Account created successfully! Redirecting...");
            setTimeout(() => navigate("/login"), 2000);
        }

        else {
            setError(data.message || "Error signing up. Try again.");
        }

        
    }    

    return (
		<div className="container d-flex justify-content-center">
			<form onSubmit={handleSubmit}>
				<h2 className="text-center mb-3">Sign Up</h2>
				<div className="text-center mt-4">
					<div className="input-group mb-3">
						<span>Username
							<input onChange={(e) => setUser_name(e.target.value)} type="text" value={user_name} className="form-control" placeholder="Username" required />
						</span>
					</div>
					<div className="input-group mb-3">
						<span>Email
							<input onChange={(e) => setEmail(e.target.value)} type="email" value={email} className="form-control" placeholder="Email" required />
						</span>
					</div>
					<div className="input-group mb-3">
						<span>Password
							<input onChange={(e) => setPassword(e.target.value)} type="password" value={password} className="form-control" placeholder="Password" required />
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
	);
}