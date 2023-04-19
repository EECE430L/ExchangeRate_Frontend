import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import TransactionService from "./pages/TransactionService";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
            <Route path="/transaction-service" element={<TransactionService />} />
            <Route path="/sign-in" element={<SignIn />} />
        </Routes>{" "}
      </Router>
    </>
  );
}

export default App;
