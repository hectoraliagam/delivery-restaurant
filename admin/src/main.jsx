// admin / npm create vite@latest . (react & js)
// admin / npm install
// admin / npm install axios react-toastify react-router-dom
// admin / npm run dev

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
