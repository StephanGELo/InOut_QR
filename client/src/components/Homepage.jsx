// Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-stone-900 to-gray-900 flex flex-col items-center justify-start">
      {/* Header Section */}
      <header className="relative w-full max-w-7xl overflow-hidden bg-stone-800/80 backdrop-blur-sm border-b border-stone-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-yellow-900/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <a href="/" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
            <img 
              src="/assets/inoutqr-logo.png" 
              alt="InOut QR Logo" 
              className="h-16 sm:h-20 mx-auto drop-shadow-lg" 
            />
          </a>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold !text-white mb-4 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">InOut QR</span>
          </h1>
          <p className="text-lg sm:text-xl !text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Simplifying Employee Attendance and Timesheet Management
          </p>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
        {/* Login Options */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl !font-bold !text-white mb-2">Select Your Role</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto">
            <a 
              href="/employee-login" 
              className="group relative bg-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-xl px-6 py-4 sm:py-6 text-center hover:bg-stone-700/80 hover:border-amber-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-800/10 to-yellow-800/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-amber-400 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-semibold text-lg">Employee Login</span>
              </div>
            </a>
            
            <a 
              href="/admin-login" 
              className="group relative bg-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-xl px-6 py-4 sm:py-6 text-center hover:bg-stone-700/80 hover:border-yellow-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-600/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-800/10 to-amber-800/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-yellow-500 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-semibold text-lg">Admin Login</span>
              </div>
            </a>
          </div>
        </section>

        {/* Features and QR Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Features Section */}
          <section className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 sm:p-8 hover:border-amber-500/30 transition-colors duration-300">
            <h2 className="!text-2xl !sm:text-3xl !font-bold !text-white mb-6 flex items-center">
              <span className="text-amber-400 mr-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              App Features
            </h2>
            <ul className="space-y-4">
              {[
                { icon: "✨", text: "Scan to Check In & Out", color: "text-amber-400" },
                { icon: "⚡", text: "Real-Time Attendance Tracking", color: "text-yellow-400" },
                { icon: "📈", text: "Monthly Timesheet Generation", color: "text-amber-300" },
                { icon: "👑", text: "Admin Dashboard for Full Control", color: "text-yellow-500" }
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-stone-300 hover:text-white transition-colors duration-200 group">
                  <span className={`text-2xl mr-4 ${feature.color} group-hover:scale-110 transition-transform duration-200`}>
                    {feature.icon}
                  </span>
                  <span className="text-lg">{feature.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* QR Info Section */}
          <section className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 sm:p-8 hover:border-yellow-500/30 transition-colors duration-300">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
              <span className="text-yellow-400 mr-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM12 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4z" clipRule="evenodd" />
                </svg>
              </span>
              How to Check In & Out
            </h3>
            <p className="text-stone-300 mb-6 leading-relaxed text-lg">
              Scan the QR code provided by your organization to check in at the start of your shift and out when you leave.
            </p>
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl blur-xl"></div>
              <img 
                src="/qr-demo.png" 
                alt="QR Code Demo" 
                className="relative mx-auto rounded-xl shadow-lg max-w-full h-auto border border-stone-600/50 hover:scale-105 transition-transform duration-300 hover:shadow-amber-400/20" 
              />
            </div>
          </section>
        </div>

        {/* Luxury Status Indicator */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full mb-4 shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-amber-400/30">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-amber-400/80 text-sm font-medium">
            Premium Business Solutions since 2025
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl bg-stone-900/80 backdrop-blur-sm border-t border-stone-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-stone-400">
              <a 
                href="/contact" 
                className="hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base"
              >
                Contact Support
              </a>
              <span className="text-stone-600">|</span>
              <a 
                href="/terms" 
                className="hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base"
              >
                Terms of Service
              </a>
              <span className="text-stone-600">|</span>
              <a 
                href="/privacy" 
                className="hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base"
              >
                Privacy Policy
              </a>
            </div>
            <div className="mt-4 text-stone-500 text-sm">
              © 2024 InOut QR. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;