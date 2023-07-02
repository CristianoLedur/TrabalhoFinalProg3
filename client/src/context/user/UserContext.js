'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    
    
    useEffect(() => {
        console.log(typeof(userInfo));
        const dataString = sessionStorage.getItem('user');
        setUserInfo(JSON.parse(dataString));
        console.log(typeof(userInfo));
    }, []);

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, isAuthenticated, setIsAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);