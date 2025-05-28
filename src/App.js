import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Dashboard from './Dashboard';
import Home from './Pages/Home';
import Inventory from './Pages/Inventory';

// Dummy components for routes (replace with your actual components)
const Sales = () => <div>Sales Page</div>;
const Purchases = () => <div>Purchases Page</div>;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/purchases" element={<Purchases />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;