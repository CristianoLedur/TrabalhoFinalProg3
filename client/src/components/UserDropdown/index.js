import { useUserContext } from '../../context/user/UserContext';
export default function UserDropdown(props) {
    const { userInfo } = useUserContext();
    return (
        <div
            className={
                props.dropdown
                ? "hidden"
                : "z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl absolute right-[10px] top-full"
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
                            className="mr-2 w-5 h-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                            >

                            </path>
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
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Sair
                    </a>
                </li>
            </ul>
        </div>
    )
}