import "./App.css";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import TransactionService from "./pages/TransactionService";
import SignIn from "./pages/SignIn";
import AuthContext from "./context/AuthContext.js";
import { baseUrl } from "./config/Config.js"
import { getUserToken, saveUserToken, clearUserToken } from "./utility/localStorage"

function App() {
    //React Context resets to default values when going to new pages
    //so to ensure isAuthenticated remains valid, I save the userToken to local storage and base the value
    //of isAuthenticated on it. Then I can safely pass the correct value of isAuthenticated around to child
    //components using Context, and the userToken local storage maintains the correct state
    //I used multiple sources for this:
    //https://hy.reactjs.org/docs/context.html#contextprovider
    //https://dev.to/dayvster/use-react-context-for-auth-288g
    //
    const [isAuthenticated, setIsAuthenticated] = useState(
        getUserToken() || false
    );

    //if userToken in local storage changes, update isAuthenticated in the context
    useEffect(() => {
        setIsAuthenticated(getUserToken() || false);
    }, [getUserToken]);


    //reference source: https://stackoverflow.com/questions/50275723/react-js-how-to-authenticate-credentials-via-a-fetch-statement
    const signup = useCallback((credentials) => {
        fetch(`${baseUrl}/user`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setIsAuthenticated(true);
                        saveUserToken(data.token);
                    });
                } else {
                    throw new Error("Sign up failed");
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    const login = useCallback((credentials) => {
        fetch(`${baseUrl}/authentication`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setIsAuthenticated(true);
                        saveUserToken(data.token);
                    });
                } else {
                    throw new Error("Login failed");
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        clearUserToken();
    }, []);


  return (
      //provide everything in the context to child components
      <AuthContext.Provider
          value={{
              isAuthenticated,
              signup,
              login,
              logout,
          }}
      >
      <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
            <Route path="/transaction-service" element={<TransactionService />} />
            <Route path="/sign-in" element={<SignIn />} />
        </Routes>{" "}
      </Router>
      </AuthContext.Provider>
  );
}

export default App;
