import { Routes, Route } from 'react-router'
import HomePage from "./pages/HomePage";
import './App.css'

export default function App() {
  return (
    <>
      <Routes> 
        <Route path='/' element={<HomePage />}></Route>
        <Route path='checkout' element={<div>Test</div>}></Route>
      </Routes>
    </>
  );
}
