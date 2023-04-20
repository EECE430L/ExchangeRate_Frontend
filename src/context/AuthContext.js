import { createContext } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    signup: () => {},
    login: () => {},
    logout: () => {},
});

export default AuthContext;