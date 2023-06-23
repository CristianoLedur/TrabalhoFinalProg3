'use client'
import HeaderOn from "../HeaderOn";
import Sidebar from "../Sidebar";
import React, { useState } from 'react';

export default function Dashboard() {
    const [ drawerNavigation, setDrawerNavigation ] = useState(true);
    const [ appsDropdown, setAppsDropdown ] = useState(true);
    const [ dropdown, setDropdown ] = useState(true);

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
        <div 
            className="antialiased bg-gray-50 dark:bg-gray-900"
        >
            <HeaderOn 
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
    )
}