export default function Footer() {
    return (
        <footer className="bg-transparent rounded-lg shadow dark:bg-gray-900 mx-4">
            <div className="w-full max-w-screen-xl mx-auto pb-4 md:pb-4">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a 
                        href="/" 
                        className="flex items-center"
                    >
                        <span 
                            className="logo-if"
                        >
                            if(
                                <span className="logo-connect">
                                    Connect
                                </span>
                            )
                        </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-1 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="/" className="mr-4 hover:underline md:mr-6 ">Home</a>
                        </li>
                        <li>
                            <a href="/atividades" className="mr-4 hover:underline md:mr-6">Atividades</a>
                        </li>
                        <li>
                            <a href="/sobre" className="mr-4 hover:underline md:mr-6 ">Sobre nós</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-5" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">if(Connect)™</a>. Todos os direitos reservados.</span>
            </div>
        </footer>
    )
}