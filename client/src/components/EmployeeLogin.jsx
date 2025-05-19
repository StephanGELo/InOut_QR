// EmployeeLogin.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../public/styles/EmployeeLogin.css';


function EmployeeLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const result = await fetch("/api/employee/login", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",

                },
                body: JSON.stringify({ email, password }),
            });
            const data = await result.json();

            if (result.ok) {
                //  login successful
                // console.log("Login Success. Navigating...");
                // console.log("Response body:", data);
                localStorage.setItem('employeeToken', data.token);
                localStorage.setItem('employee', JSON.stringify(data.employee));
                navigate('/employee-dashboard');
            } else {
                toast.error(`❌ ${data.error}`);
            }
        } catch(err) {
            console.error("Login error:" , err);
            toast.error("❌ Login failed. Please try again.");
        };
        
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
                <label htmlFor='email'>Email</label>
                <input 
                    type="text"
                    value={email}
                    id="email"
                    name="email"
                    autoComplete="email"
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />

                <label htmlFor='password'>Password</label>
                <input 
                    type="password"
                    id="password"
                    value={password}
                    name="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value) }
                    required
                />

                <button type="submit" className="login-button">Login</button>
                <div className="login-options">
                    <input type="checkbox" id="remember" name="remember"/>
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