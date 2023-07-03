import { useContext } from 'react';
import { useUserContext } from '../../context/user/UserContext';
export default function AppsDropdown(props) {
    const { userInfo } = useUserContext();
    const handleDestroySession = async () => {
        const token = getCookie('Authorization');
        try {
            const response = await fetch(`http://localhost:3001/logout`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });

            if (response.ok) {
                deleteCookie('Authorization');
                sessionStorage.removeItem('user');
                router.push('/');
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            } else {
                console.log(data.error);
            } 
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div
            className={props.appsDropdown 
            ? "overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl absolute right-[10px] top-full "
            : "hidden"}
            id="apps-dropdown"
        >
            <div
                className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
            >
                Funcionalidades
            </div>
            <div 
                className="grid grid-cols-3 gap-4 p-4"
            >
                {userInfo.tipoUsuario !== 'Comunidade Externa' && (
                    <a
                        href="/usuarios"
                        className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                    >
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                            >
                                
                            </path>
                        </svg>
                        <div 
                            className="text-sm text-gray-900 dark:text-white"
                        >
                            Usuários
                        </div>
                    </a>
                )}
                <a
                    href="/atividades"
                    className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                >
                    <svg
                        aria-hidden="true"
                        className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
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
                    <div 
                        className="text-sm text-gray-900 dark:text-white"
                    >
                        Atividades
                    </div>
                </a>
                {userInfo.tipoUsuario === 'Servidor' && (
                    <a
                        href="/demandas"
                        className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                    >
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
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
                        <div 
                            className="text-sm text-gray-900 dark:text-white"
                        >
                            Demandas
                        </div>
                    </a>
                )}
                <a
                    href="/minhas-demandas"
                    className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                >
                    <svg 
                        aria-hidden="true" 
                        className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                        ></path>
                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                        ></path>
                    </svg>
                    <div 
                        className="text-sm text-gray-900 dark:text-white"
                    >
                        Minhas demandas
                    </div>
                </a>
                {userInfo.tipoUsuario !== 'Comunidade Externa' && (
                    <a
                        href="/minhas-atividades"
                        className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                    >
                        <svg 
                            aria-hidden="true" 
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                            ></path>
                            <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                            ></path>
                        </svg>
                        <div 
                            className="text-sm text-gray-900 dark:text-white"
                        >
                            Minhas atividades
                        </div>
                    </a>
                )}
                <a
                    href="/perfil"
                    className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                >
                    <svg
                        aria-hidden="true"
                        className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                        >
                            
                        </path>
                    </svg>
                    <div 
                        className="text-sm text-gray-900 dark:text-white"
                    >
                        Perfil
                    </div>
                </a>
                <button
                    onClick={handleDestroySession}
                    className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                >
                    <svg
                        aria-hidden="true"
                        className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        >
                            
                        </path>
                    </svg>
                    <span className="text-sm text-gray-900 dark:text-white">
                        Sair
                    </span>
                </button>
            </div>
        </div>
    )
}