'use client';
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: null,
    isAuthenticated: true,
    signIn: () => {},
    tipoUsuario: null,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
    
        if (token && userData) {
            setUser(JSON.parse(userData));
            setTipoUsuario(JSON.parse(userData).tipoUsuario);
            setIsAuthenticated(true);
        }
    }, []);

    async function signIn({ email, password }) {
        console.log(email);
        console.log(password);
        
    }
    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, tipoUsuario }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;