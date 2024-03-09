import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

import './App.css'
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<LandingPage />}/>
          <Route path="/admin" exact element={<Dashboard />}/>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
