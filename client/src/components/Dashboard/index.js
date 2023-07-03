'use client'
import { useUserContext } from '../../context/user/UserContext';
import HeaderOn from "../HeaderOn";
import Sidebar from "../Sidebar";
import HeaderOff from "../HeaderOff";
import React, { useState, useEffect  } from 'react';

export default function Dashboard() {
    const { userInfo } = useUserContext();
    const [ drawerNavigation, setDrawerNavigation ] = useState(false);
    const [ appsDropdown, setAppsDropdown ] = useState(false);
    const [ dropdown, setDropdown ] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleDrawerNavigation = () => {
        setDrawerNavigation(!drawerNavigation);
        setAppsDropdown(false);
        setDropdown(false);
    };

    const handleToggleAppsDropwdown = () => {
        setAppsDropdown(!appsDropdown);
        setDrawerNavigation(false);
        setDropdown(false);
    };

    const handleToggleDropdown = () => {
        setDropdown(!dropdown);
        setAppsDropdown(false);
        setDrawerNavigation(false);
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