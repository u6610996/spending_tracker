import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import "./App.css";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <Link to="/" className={isActive("/")}>Home</Link>
      <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
      <Link to="/journal" className={isActive("/journal")}>Journal</Link>
    </nav>
  );
};

const Home = () => (
  <div className="home-section">
    <h1>💸 Spending Tracker</h1>
    <p>This website helps you record and visualize your personal expenses.</p>
    <ul>
      <li>✅ Record daily spending in the Journal page</li>
      <li>📊 View summaries and charts in the Dashboard</li>
      <li>💾 All data is saved in your browser (no login required)</li>
    </ul>
    <p>Start by clicking on <b>Journal</b> or <b>Dashboard</b> above.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
