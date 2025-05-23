// Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header Section */}
      <header className="relative overflow-hidden bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <Link to="/" className="inline-block mb-6 !hover:scale-105 !transition-transform duration-300">
            <img 
              src="/assets/logo.png" 
              alt="InOut QR Logo" 
              className="h-16 sm:h-20 mx-auto drop-shadow-lg" 
            />
          </Link>
          <h1 className="!text-3xl !sm:text-4xl lg:text-5xl font-bold !text-white mb-4 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">InOut QR</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Simplifying Employee Attendance and Timesheet Management
          </p>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Login Options */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <h2 className="!text-2xl !sm:text-3xl font-bold !text-white mb-2">Select Your Role</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto">
            <Link 
              to="/employee-login" 
              className="group relative bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl px-6 py-4 sm:py-6 text-center hover:bg-slate-700/80 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 !bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="!text-blue-400 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="!text-white !font-semibold !text-lg">Employee Login</span>
              </div>
            </Link>
            
            <Link 
              to="/admin-login" 
              className="group relative bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl px-6 py-4 sm:py-6 text-center hover:bg-slate-700/80 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r !from-purple-600/10 !to-pink-600/10 rounded-xl !opacity-0 !group-hover:opacity-100 !transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-purple-400 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="!text-white !font-semibold !text-lg">Admin Login</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Features and QR Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Features Section */}
          <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <h2 className="!text-2xl !sm:text-3xl !font-bold !text-white mb-6 flex items-center">
              <span className="!text-blue-400 mr-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              App Features
            </h2>
            <ul className="space-y-4">
              {[
                { icon: "📱", text: "Scan to Check In & Out" },
                { icon: "⏱️", text: "Real-Time Attendance Tracking" },
                { icon: "📊", text: "Monthly Timesheet Generation" },
                { icon: "🎛️", text: "Admin Dashboard for Full Control" }
              ].map((feature, index) => (
                <li key={index} className="flex items-center !text-slate-300 !hover:text-white !transition-colors duration-200">
                  <span className="!text-2xl mr-4">{feature.icon}</span>
                  <span className="!text-lg">{feature.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* QR Info Section */}
          <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <h3 className="!text-2xl !sm:text-3xl !font-bold !text-white mb-6 flex items-center">
              <span className="!text-cyan-400 mr-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM12 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4z" clipRule="evenodd" />
                </svg>
              </span>
              How to Check In & Out
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed text-lg">
              Scan the QR code provided by your organization to check in at the start of your shift and out when you leave.
            </p>
            <div className="text-center">
              <img 
                src="/qr-demo.png" 
                alt="QR Code Demo" 
                className="mx-auto rounded-xl shadow-lg max-w-full h-auto border border-slate-600/50 hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-slate-400">
              <Link 
                to="/contact" 
                className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base"
              >
                Contact Support
              </Link>
              <span className="text-slate-600">|</span>
              <Link 
                to="/terms" 
                className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base"
              >
                Terms of Service
              </Link>
              <span className="text-slate-600">|</span>
              <Link 
                to="/privacy" 
                className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="mt-4 text-slate-500 text-sm">
              © 2024 InOut QR. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;

  // return (
  //   <div className="homepage">
  //     <header className="header">
  //       <Link to="/">
  //         <img src="/assets/logo.png" alt="InOut QR Logo" className="logo" />
  //       </Link>
  //       <h1>Welcome to InOut QR</h1>
  //       <p>Simplifying Employee Attendance and Timesheet Management</p>
  //     </header>

  //     <div className="login-options">
  //       <h2>Select Your Role</h2>
  //       <Link to="/employee-login" className="btn">Employee Login</Link>
  //       <Link to="/admin-login" className="btn">Admin Login</Link>
  //     </div>

  //     <section className="features">
  //       <h2>App Features</h2>
  //       <ul>
  //         <li>Scan to Check In & Out</li>
  //         <li>Real-Time Attendance Tracking</li>
  //         <li>Monthly Timesheet Generation</li>
  //         <li>Admin Dashboard for Full Control</li>
  //       </ul>
  //     </section>

  //     <section className="qr-info">
  //       <h3>How to Check In & Out</h3>
  //       <p>Scan the QR code provided by your organization to check in at the start of your shift and out when you leave.</p>
  //       {/* Example image of QR code scan */}
  //       <img src="/qr-demo.png" alt="QR Code Demo" className="qr-demo" />
  //     </section>

  //     <footer className="footer">
  //       <p>
  //         <Link to="/contact">Contact Support</Link> | 
  //         <Link to="/terms">Terms of Service</Link> | 
  //         <Link to="/privacy">Privacy Policy</Link>
  //       </p>
  //     </footer>
  //   </div>
  // );

  