// EmployeeLogin.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../styles/EmployeeLogin.css';


function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try{
        console.log(API_BASE_URL);
          const result = await fetch(`${API_BASE_URL}/employee/login`, {
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
              window.dispatchEvent(new Event('loginEvent'));
              setIsLoading(false);
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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-stone-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10"></div>
      </div>
      
      <div className="relative w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-full blur-xl"></div>
            <img 
              className="relative h-20 w-20 mx-auto rounded-full border-2 border-amber-400/50 shadow-lg hover:scale-105 transition-transform duration-300" 
              src="/assets/inoutqr-logo.png" 
              alt="InOut QR Logo" 
            />
          </div>
          <h1 className="mt-6 text-3xl !font-bold !text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-stone-300">
            Sign in to your <span className="text-amber-400 font-medium">InOut QR</span> account
          </p>
        </div>

        <div className="bg-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-stone-700/50 border border-stone-600/50 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="!block text-sm font-medium !text-stone-300 mb-2">
                Password
              </label>
              <div className="!relative">
                <div className="!absolute !inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-stone-700/50 border border-stone-600/50 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="!flex !items-center !justify-between">
              <div className="!flex !items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-500 focus:ring-amber-400 bg-stone-700 border-stone-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 !block text-sm text-stone-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-amber-400 hover:text-yellow-400 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg className="h-5 w-5 text-amber-300 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Sign In
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-stone-400">
              By signing in, you agree to our{' '}
              <a href="/terms" className="font-medium text-amber-400 hover:text-yellow-400 transition-colors duration-200">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="font-medium text-amber-400 hover:text-yellow-400 transition-colors duration-200">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="/" 
            className="inline-flex items-center text-sm text-stone-400 hover:text-amber-400 transition-colors duration-200"
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


export default EmployeeLogin;

