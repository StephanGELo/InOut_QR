import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "/public/styles/login.css";

function AdminLogin() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const  [message, setMessage ] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const result = await fetch("/api/admin/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password}),
            });
            const data = await result.json();
            if (result.status === 200) {
                setMessage("Login Successful");
                // Optionallu, redirect to admin dashboard or save user info in local storage
                navigate("/admin-dashboard");
            } else {
                setMessage(`❌ ${data.error} - Please try again`);
                // Clear the password field
                setPassword("");
            }
        } catch(err) {
            setMessage(`❌ Server Error - Please try again`);
        };
    };

    return (
        <div className="login">
            <header>
                <Link to="/">
                    <img src="/assets/logo.png" alt="InOut QR Logo" className="logo" />
                </Link>
                <h1>Welcome to InOut QR</h1>
                <p>Admin access - Please log in to manage attendance.</p>
            </header>

            <form onSubmit={handleLogin} className="login-form">
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Login</button>
                <div className="login-options">
                    <div>
                        <input type="checkbox" id="remember"/>
                        <label htmlFor="Remember">Remember Me</label>
                    </div>
                    <Link to="/forgot-password">Forgot Password</Link>
                </div>

            </form>

            <p className="security-note">Please do not share your login credentials.</p>

            <footer>
                <Link to="/support">Contact Support</Link> |
                <Link to="terms">Terms of Service</Link> |
                <Link to="privacy">Privacy Policy</Link>
            </footer>
        </div>
    );
}

export default AdminLogin;