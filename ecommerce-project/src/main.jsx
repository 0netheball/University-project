import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router' // without ./ means from node_modules
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path='checkout' element={<div>this is checkout page</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
