import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal"; 

function App() {
  return (
    <Router>
      <header style={{ padding: "1rem", background: "#f5f5f5", borderBottom: "1px solid #ccc" }}>
        <nav>
          <Link to="/" style={{ marginRight: "1rem" }}>Dashboard</Link>
          <Link to="/journal">Journal</Link>
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
