'use client'
import AppsDropdown from "../AppsDropdown";
import UserDropdown from "../UserDropdown";
import React from 'react';
export default function HeaderOn({
    user,
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
                        <a href="/" class="flex items-center">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADBUlEQVR4Ad3WA5AcURAG4FVs5xDbtm07pdi2XYpt27Zt2+bZ2Lndl38r/6Sm3tmoqq963nbfTF8PdS0HjvzvtkN+A2NBOAl+4AN7bjnmt1PrymxpXAc6Qztoz9gFqjJfGhpDfY1GUNGW1wrp4PbwGQRYSNxyyP/YSWeXWveje7Jymxt/x84EWKT4iA3c4TpIyv+A1KzRyw2YGOeDgEBGq7p9L2e+4baa8psa/dIcwAIK10+48/uavFXTwG9IJzcgT+ASCAgCod2+a5dvx78GGv+SJxBGA0JqIG1oDRgZD4MABQSZQdyzy7eCE/gdyQasYU5AaqCrpgEzWUA8zJavDiegXgOBoDAKeChdAwHMm7n+EXIDhP9Qb4s3c+efj6tegAWsIG7kKTDBlmsxr24a7ihmJ6C6lruQwRY/J3co+Sxj3hHPM+YZ8tXkUND2m6LLqa++poEef9wTJsBoGMM4Cbpw5/1gOcyDBTAflrJWH+JtqJozuKq+2qoG+YwvO9npxLCMOjE0U/JHHeyqrW5YrPzmxpl4gLSQGTJCJsbMkIr7iSA2wJ0aGHODD+51gYvNCgLb6jnczJqf0uiDGK8zn4xMsog0UCCEc6cw7mGNq5RX6+9qz2/Ywm5AUQ9A6no3a1w0E7BqGrgT+QYS6AQC1EcsBYCAXaxx4tosPQduJZQJGEAfkrAa0DNmhM2wD3bDHtgFx6Efa5bDQSl/FKaqDUR6AjEJDaSADJBexXWqiJwCe/gGHuDCcTuBBZaz5hn4gLMmHwjHmT8GvvCLud/gCfcguWbiMX4N3GP+QaTfBVIDZuk+N0vPAWfpg0ORngP31Mal58QvSJsoJhCodk6BoTwHFObNXN9m/i7XZuYVrn8m6AnoGbPDVe7kLtyD2/AaprHmODyBO5r8C1jD/Bp4zt/vMj7ms8MkNxB/wpjAdXgE9zWTeAfTWXMSnsE9Tf6VZgJG0IfAEGdvwwi+kGL+Lkgy3wNKWA1IX0QiyX0ROYC7eu7JDwSsY81HrgOY9+f6XGS/B/4CZugvp6pRyGMAAAAASUVORK5CYII=" class="h-8 mr-3" alt="Flowbite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Conecta</span>
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
                            <svg 
                                aria-hidden="true" 
                                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <UserDropdown 
                            user={user}
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