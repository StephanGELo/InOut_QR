// import { StrictMode } from 'react'
import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import App from './components/App.jsx';
import './styles/index.css';

const root = createRoot(
    document.getElementById('root')
  );
  

root.render(
<BrowserRouter>
    <App />
</BrowserRouter>
);
