'use client'
import { useUserContext } from '../../context/user/UserContext';
import HeaderOn from "../HeaderOn";
import Sidebar from "../Sidebar";
import HeaderOff from "../HeaderOff";
import React, { useState, useEffect  } from 'react';

export default function Dashboard() {
    const { userInfo } = useUserContext();
    const [ drawerNavigation, setDrawerNavigation ] = useState(true);
    const [ appsDropdown, setAppsDropdown ] = useState(true);
    const [ dropdown, setDropdown ] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleDrawerNavigation = () => {
        setDrawerNavigation(!drawerNavigation);
    };

    const handleToggleAppsDropwdown = () => {
        setAppsDropdown(!appsDropdown);
    };

    const handleToggleDropdown = () => {
        setDropdown(!dropdown);
    };

    return (
        <>
            { !isLoading && !userInfo && (
                <HeaderOff />
            )}
            { !isLoading && userInfo && Object.keys(userInfo).length > 0 && (
                <div 
                    className="antialiased z=50 bg-gray-50 dark:bg-gray-900"
                >
                    <HeaderOn 
                        user={userInfo}
                        drawerNavigation={drawerNavigation}
                        handleToggleDrawerNavigation={handleToggleDrawerNavigation}
                        appsDropdown={appsDropdown}
                        handleToggleAppsDropwdown={handleToggleAppsDropwdown}
                        dropdown={dropdown}
                        handleToggleDropdown={handleToggleDropdown}
                    />
                    <Sidebar 
                        drawerNavigation={drawerNavigation}
                        handleToggleDrawerNavigation={handleToggleDrawerNavigation}
                    />
                </div>
            )}
        </>
    )
}