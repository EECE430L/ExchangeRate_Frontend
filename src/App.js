import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import TransactionService from "./pages/TransactionService";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
            <Route path="/transaction-service" element={<TransactionService />} />
        </Routes>{" "}
      </Router>
    </>
  );
}

export default App;
