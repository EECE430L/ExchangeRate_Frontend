import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>{" "}
      </Router>
    </>
  );
}

export default App;
