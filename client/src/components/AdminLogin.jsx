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
            const result = await fetch(`${BASE_URL}/admin/login`,{
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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-stone-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10"></div>
        </div>
        
        <div className="relative w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="text-center">
            <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 rounded-full blur-xl"></div>
            <a href="/" className="inline-block hover:scale-105 transition-transform duration-300">
                <img 
                src="/assets/logo.png" 
                alt="InOut QR Logo" 
                className="relative h-20 w-20 mx-auto rounded-full border-2 border-yellow-500/60 shadow-lg" 
                />
            </a>
            </div>
            <h1 className="mt-6 text-3xl font-bold text-white">
            Admin Portal
            </h1>
            <p className="mt-2 text-stone-300">
            Administrative access - Manage <span className="text-yellow-400 font-medium">attendance systems</span>
            </p>
        </div>

        {/* Login Form */}
        <div className="bg-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl shadow-xl p-8">
            {/* Admin Badge */}
            <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-600/30 rounded-full">
                <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-yellow-400 text-sm font-medium">Administrator Access</span>
            </div>
            </div>

            <div className="space-y-6" onSubmit={handleLogin}>
            {/* Message Display */}
            {message && (
                <div className={`p-4 rounded-xl border ${
                message.includes('❌') 
                    ? 'bg-red-900/20 border-red-700/30 text-red-300' 
                    : 'bg-green-900/20 border-green-700/30 text-green-300'
                }`}>
                <p className="flex items-center text-sm">
                    {message.includes('❌') ? (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    ) : (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    )}
                    {message}
                </p>
                </div>
            )}

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">
                Administrator Email
                </label>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                </div>
                <input
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 bg-stone-700/50 border border-stone-600/50 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
                    placeholder="Enter admin email"
                />
                </div>
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-stone-300 mb-2">
                Password
                </label>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 bg-stone-700/50 border border-stone-600/50 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
                    placeholder="Enter admin password"
                />
                </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 bg-stone-700 border-stone-600 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-stone-300">
                    Remember Me
                </label>
                </div>

                <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-yellow-400 hover:text-amber-400 transition-colors duration-200">
                    Forgot Password?
                </a>
                </div>
            </div>

            {/* Login Button */}
            <div>
                <button
                onClick={handleLogin}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
                >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-yellow-300 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </span>
                Admin Login
                </button>
            </div>
            </div>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-yellow-900/10 border border-yellow-700/20 rounded-xl">
            <div className="flex items-start">
                <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                <p className="text-yellow-200 text-sm font-medium">Security Notice</p>
                <p className="text-yellow-300/80 text-xs mt-1">Please do not share your admin credentials with anyone.</p>
                </div>
            </div>
            </div>
        </div>

        {/* Footer Links */}
        <div className="text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 text-stone-400 text-sm">
            <a 
                href="/support" 
                className="hover:text-yellow-400 transition-colors duration-200"
            >
                Contact Support
            </a>
            <span className="text-stone-600">|</span>
            <a 
                href="/terms" 
                className="hover:text-yellow-400 transition-colors duration-200"
            >
                Terms of Service
            </a>
            <span className="text-stone-600">|</span>
            <a 
                href="/privacy" 
                className="hover:text-yellow-400 transition-colors duration-200"
            >
                Privacy Policy
            </a>
            </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
            <a 
            href="/" 
            className="inline-flex items-center text-sm text-stone-400 hover:text-yellow-400 transition-colors duration-200"
            >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
            </a>
        </div>
        </div>
    </div>
    );
}

export default AdminLogin;