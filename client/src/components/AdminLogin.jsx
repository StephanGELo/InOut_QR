// AdminLogin.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "../styles/Login.css";

function AdminLogin() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const  [message, setMessage ] = useState("");

    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const result = await fetch(`${BASE_URL}/api/admin/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password}),
            });
            console.log("Result:", result);
            const data = await result.json();
            if (result.status === 200) {
                setMessage("Login Successful");
                console.log("Redirecting to admin dashboard ....");
                // Optionally, redirect to admin dashboard or save user info in local storage
                localStorage.setItem('admin', JSON.stringify(data.admin));
                localStorage.setItem('adminToken', data.token);
                window.dispatchEvent(new Event('loginEvent'));
                console.log("Redirecting to admin dashboard ....");
                
                console.log("Data:", data);
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
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Login</button>
                <div className="login-options">
                    <div>
                        <input type="checkbox" id="remember"/>
                        <label htmlFor="remember">Remember Me</label>
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