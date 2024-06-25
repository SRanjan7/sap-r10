import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AppLayout from './components/Layout';
function App() {


  return (
    <Router>
   
    
    <Routes>
      <Route path="/" element={<AppLayout />} />
      {/* <Route path="/service" element={< />} /> */}
     
    </Routes>
  </Router>
  )
}

export default App
