import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "/public/styles/login.css";

function AdminLogin() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        if(username === "admin" && password === "123Adminpass") {
            console.log("Login's successful");
            navigate("/admin-dashboard");
        } else {
            alert("Login unsuccessful");
        }
    }

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
                <label htmlFor="username">Username or email</label>
                <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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