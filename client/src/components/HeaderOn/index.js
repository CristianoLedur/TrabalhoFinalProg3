'use client'
import AppsDropdown from "../AppsDropdown";
import UserDropdown from "../UserDropdown";
import React from 'react';
export default function HeaderOn({
    drawerNavigation,
    handleToggleDrawerNavigation,
    appsDropdown,
    handleToggleAppsDropwdown,
    dropdown,
    handleToggleDropdown
}) {

    return (
        <header>
            <nav 
                className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50"
            >
                <div 
                    className="flex flex-wrap justify-between items-center"
                >
                    <div 
                        className="flex justify-start items-center"
                    >
                        <button
                            data-drawer-target="drawer-navigation"
                            data-drawer-toggle="drawer-navigation"
                            aria-controls="drawer-navigation"
                            aria-expanded={drawerNavigation}
                            onClick={handleToggleDrawerNavigation}
                            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                >
                                    
                                </path>
                            </svg>
                            <svg
                                aria-hidden="true"
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                >

                                </path>
                            </svg>
                            <span 
                                className="sr-only"
                            >
                                Toggle sidebar
                            </span>
                        </button>
                        <a 
                            href="https://flowbite.com" 
                            className="flex items-center justify-between mr-4"
                        >
                            <img
                                src="https://flowbite.s3.amazonaws.com/logo.svg"
                                className="mr-3 h-8"
                                alt="Flowbite Logo"
                            />
                            <span 
                                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                            >
                                NomeSite
                            </span>
                        </a>
                    
                    </div>
                    <div className="flex items-center lg:order-2">
                        <button
                            type="button"
                            data-dropdown-toggle="apps-dropdown"
                            aria-expanded={appsDropdown}
                            onClick={handleToggleAppsDropwdown}
                            className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        >
                            <span 
                                className="sr-only"
                            >
                                Apps
                            </span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                >
                                    
                                </path>
                            </svg>
                        </button>
                        <AppsDropdown 
                            drawerNavigation={drawerNavigation}
                            handleToggleDrawerNavigation={handleToggleDrawerNavigation}
                            appsDropdown={appsDropdown}
                            handleToggleAppsDropwdown={handleToggleAppsDropwdown}
                            dropdown={dropdown}
                            handleToggleDropdown={handleToggleDropdown}
                        />
            
                        <button
                            type="button"
                            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            data-dropdown-toggle="dropdown"
                            aria-expanded={dropdown}
                            onClick={handleToggleDropdown}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                            className="w-8 h-8 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                            alt="user photo"
                            />
                        </button>
                        <UserDropdown 
                           drawerNavigation={drawerNavigation}
                           handleToggleDrawerNavigation={handleToggleDrawerNavigation}
                           appsDropdown={appsDropdown}
                           handleToggleAppsDropwdown={handleToggleAppsDropwdown}
                           dropdown={dropdown}
                           handleToggleDropdown={handleToggleDropdown}
                        />
                    </div>
                </div>
            </nav>
        </header>
    )
}