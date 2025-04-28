import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '/public/styles/EmployeeLogin.css';


function EmployeeLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        if (username === "employee" && password ==="123456") {
            console.log("Login successful");
            navigate('/employee-dashboard');
        } else {
            alert("Login Unsucessful. Invalid credentials");
        }
        
    }

    return (
        <div className='employee-login'>
            <header>
                <Link to="/">
                    <img src="/assets/logo.png" alt="InOut QR Logo" className="logo" />
                </Link>
                <h1>Welcome to InOut QR.</h1>
                <p>Please login to track your attendance</p> 
            </header>
            <form onSubmit={handleLogin} className='login-form'>
                <label htmlFor='username'>Username or Email</label>
                <input 
                    type="text"
                    value={username}
                    id="username"
                    onChange={(e)=> setUsername(e.target.value)}
                    required
                />

                <label htmlFor='password'>Password</label>
                <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                    required
                />

                <button type="submit" className="login-button">Login</button>
                <div className="login-options">
                    <input type="checkbox" id="remember" />
                    <label htmlFor='remember'>Remember Me</label>
                    <Link to="/forgot-password" className="forgot-password">Forgot Password</Link>
                </div>
            </form>

            <footer>
                <Link to="/support">Contact Support</Link> | 
                <Link to="/terms">Terms of Service</Link> | 
                <Link to="/privacy">Privacy Policy</Link>
            </footer>

        </div>
    )

}

export default EmployeeLogin;