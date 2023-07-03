import { useUserContext } from '../../context/user/UserContext';
export default function Sidebar(props) {
    const { userInfo } = useUserContext();
    return (
        <aside 
            id="default-sidebar"
            className={props.drawerNavigation
                ? "fixed top-[60px] left-0 z-40 w-64 h-screen" 
                : "hidden "
            }
            
            aria-label="Sidebar"
        >
            <div 
                className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"
            >
                <ul 
                    className="space-y-2 font-medium"
                >
                    <li>
                        <a 
                            href="/" 
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <svg 
                                aria-hidden="true" 
                                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z">
                                </path>
                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z">
                                </path>
                            </svg>
                            <span 
                                className="ml-3"
                            >
                                Home
                            </span>
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/atividades" 
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <svg
                                aria-hidden="true"
                                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                                    clipRule="evenodd"
                                >
                                    
                                </path>
                            </svg>
                            <span 
                                className="flex-1 ml-3 whitespace-nowrap"
                            >
                                Atividades
                            </span>
                        </a>
                    </li>
                    {userInfo.tipoUsuario === 'Servidor' && (
                        <li>
                            <a 
                                href="/demandas" 
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                                        clipRule="evenodd"
                                    >
                                        
                                    </path>
                                </svg>
                                <span 
                                    className="flex-1 ml-3 whitespace-nowrap"
                                >
                                    Demandas
                                </span>
                            </a>
                        </li>
                    )}
                    {userInfo.tipoUsuario !== 'Comunidade Externa' && (
                        <li>
                            <a 
                                href="minhas-atividades" 
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg 
                                    aria-hidden="true" 
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                                    ></path>
                                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                                    ></path>
                                </svg>
                            <span 
                                className="flex-1 ml-3 whitespace-nowrap"
                            >
                                Minhas Atividades
                            </span>

                            </a>
                        </li>
                    )}
                    <li>
                        <a 
                            href="/minhas-demandas" 
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <svg 
                                aria-hidden="true" 
                                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                                ></path>
                                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                                ></path>
                            </svg>
                            <span 
                                className="flex-1 ml-3 whitespace-nowrap"
                            >
                                Minhas Demandas
                            </span>

                        </a>
                    </li>
                    {userInfo.tipoUsuario !== 'Comunidade Externa' && (
                        <li>
                            <a 
                                href="/usuarios" 
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                            
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                >
                                    
                                </path>
                            </svg>
                            <span 
                                className="flex-1 ml-3 whitespace-nowrap"
                            >
                                Usuários
                            </span>
                            </a>
                        </li>
                    )}
                    <li>
                        <a 
                            href="/perfil" 
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                        <svg 
                            aria-hidden="true" 
                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                        <span 
                            className="flex-1 ml-3 whitespace-nowrap"
                        >
                            Perfil
                        </span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}