import "./App.css";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import ExchangeService from "./pages/ExchangeService";
import PendingOffers from "./pages/PendingOffers";
import MyExchangeHistory from "./pages/MyExchangeHistory";
import SignIn from "./pages/SignIn";
import AuthContext from "./context/AuthContext.js";
import { baseUrl } from "./config/Config.js";
import { getUserToken, saveUserToken, clearUserToken } from "./utility/tokenStorage";

function App() {
  //React Context resets to default values when going to new pages
  //so to ensure isAuthenticated remains valid, I save the userToken to local storage and base the value
  //of isAuthenticated on it. Then I can safely pass the correct value of isAuthenticated around to child
  //components using Context, and the userToken local storage maintains the correct state
  //I used multiple sources for this:
  //https://hy.reactjs.org/docs/context.html#contextprovider
  //https://dev.to/dayvster/use-react-context-for-auth-288g
  const [isAuthenticated, setIsAuthenticated] = useState(getUserToken() || false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  let [accountLoginSuccess, setAccountLoginSuccess] = useState(false);
  let [accountCreationSuccess, setAccountCreationSuccess] = useState(false);
  let [emailTaken, setEmailTaken] = useState(false);
  let [usernameTaken, setUsernameTaken] = useState(false);

  //if userToken in local storage changes, update isAuthenticated in the context
  useEffect(() => {
    if (getUserToken()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [getUserToken]);

  //reference source: https://stackoverflow.com/questions/50275723/react-js-how-to-authenticate-credentials-via-a-fetch-statement
  const signup = useCallback((credentials) => {
    return fetch(`${baseUrl}/user`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 409) {
          response.json().then((data) => {
            if (data.message.includes("email")) {
              setEmailTaken(true);
            } else if (data.message.includes("username")) {
              setUsernameTaken(true);
            }
          });
        } else if (response.ok) {
          return response.json().then((data) => {
            setIsAuthenticated(true);
            setAccountCreationSuccess(true);
            return true;
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
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/authentication`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 401 || response.status == 404) {
            setIncorrectCredentials(true);
            reject(new Error("Incorrect credentials"));
          }
          if (response.ok) {
            response.json().then((data) => {
              setIsAuthenticated(true);
              setAccountLoginSuccess(true);
              saveUserToken(data.token);
              resolve(data.token);
            });
          } else {
            throw new Error("Login failed");
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
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
        incorrectCredentials,
        setIncorrectCredentials,
        accountLoginSuccess,
        setAccountLoginSuccess,
        accountCreationSuccess,
        setAccountCreationSuccess,
        emailTaken,
        setEmailTaken,
        usernameTaken,
        setUsernameTaken,
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
          <Route path="/exchange-service" element={<ExchangeService />} />
          <Route path="/pending-offers" element={<PendingOffers />} />
          <Route path="/my-exchange-history" element={<MyExchangeHistory />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>{" "}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
