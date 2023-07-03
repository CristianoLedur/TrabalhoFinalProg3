import { getCookie, deleteCookie } from "cookies-next";
import { useUserContext } from '../../context/user/UserContext';
import { useRouter } from "next/navigation";
export default function UserDropdown(props) {
    const router = useRouter();
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
            className={
                props.dropdown
                ? "z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl absolute right-[10px] top-full" 
                : "hidden"
            }
            id="dropdown"
        >
            <div className="py-3 px-4">
                <span
                    className="block text-sm font-semibold text-gray-900 dark:text-white"
                >
                    {props.user.nome}
                </span>
                <span
                    className="block text-sm text-gray-900 truncate dark:text-white"
                >
                    {props.user.email}
                </span>
            </div>
            <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
            >
                <li>
                    <a
                        href="/perfil"
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        Ver perfil
                    </a>
                </li>
            </ul>
            <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
            >
                <li>
                    <a
                        href="/minhas-demandas"
                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg 
                            aria-hidden="true" 
                            className="mr-2 w-5 h-5 text-gray-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                            ></path>
                            <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                            ></path>
                        </svg>
                            Minhas demandas
                    </a>
                </li>
                {userInfo.tipoUsuario !== 'Comunidade Externa' && (
                    <li>
                        <a
                            href="/minhas-atividades"
                            className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                className="mr-2 w-5 h-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                                >

                                </path>
                            </svg>
                            Minhas atividades
                        </a>
                    </li>
                )}
            </ul>
            <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
            >
                <li>
                    <button
                        onClick={handleDestroySession}
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Sair
                    </button>
                </li>
            </ul>
        </div>
    )
}