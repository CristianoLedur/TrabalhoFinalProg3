'use client'
import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    signIn: () => {},
    tipoUsuario: null,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

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
        
        try {
            const response = await fetch('http://localhost:3001/session', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const { token, user } = data;
                // Armazenar o token e as informações do usuário no estado local
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                // Atualizar o estado do contexto
                setUser(user);
                setTipoUsuario(user.tipoUsuario);
                setIsAuthenticated(true);

                // Redirecionar para a página desejada após a autenticação

                router.push('/');
            } else {
                // Tratar o erro de autenticação
                console.log(data.error);
            } 
        } catch (error) {
            // Tratar outros erros
            console.log(error);
        }
    }
    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, tipoUsuario }}>
          {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;