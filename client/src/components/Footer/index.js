export default function Footer() {
    return (
        <footer className="bg-transparent rounded-lg shadow dark:bg-gray-900 mx-4">
            <div className="w-full max-w-screen-xl mx-auto pb-4 md:pb-4">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" class="flex items-center">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADBUlEQVR4Ad3WA5AcURAG4FVs5xDbtm07pdi2XYpt27Zt2+bZ2Lndl38r/6Sm3tmoqq963nbfTF8PdS0HjvzvtkN+A2NBOAl+4AN7bjnmt1PrymxpXAc6Qztoz9gFqjJfGhpDfY1GUNGW1wrp4PbwGQRYSNxyyP/YSWeXWveje7Jymxt/x84EWKT4iA3c4TpIyv+A1KzRyw2YGOeDgEBGq7p9L2e+4baa8psa/dIcwAIK10+48/uavFXTwG9IJzcgT+ASCAgCod2+a5dvx78GGv+SJxBGA0JqIG1oDRgZD4MABQSZQdyzy7eCE/gdyQasYU5AaqCrpgEzWUA8zJavDiegXgOBoDAKeChdAwHMm7n+EXIDhP9Qb4s3c+efj6tegAWsIG7kKTDBlmsxr24a7ihmJ6C6lruQwRY/J3co+Sxj3hHPM+YZ8tXkUND2m6LLqa++poEef9wTJsBoGMM4Cbpw5/1gOcyDBTAflrJWH+JtqJozuKq+2qoG+YwvO9npxLCMOjE0U/JHHeyqrW5YrPzmxpl4gLSQGTJCJsbMkIr7iSA2wJ0aGHODD+51gYvNCgLb6jnczJqf0uiDGK8zn4xMsog0UCCEc6cw7mGNq5RX6+9qz2/Ywm5AUQ9A6no3a1w0E7BqGrgT+QYS6AQC1EcsBYCAXaxx4tosPQduJZQJGEAfkrAa0DNmhM2wD3bDHtgFx6Efa5bDQSl/FKaqDUR6AjEJDaSADJBexXWqiJwCe/gGHuDCcTuBBZaz5hn4gLMmHwjHmT8GvvCLud/gCfcguWbiMX4N3GP+QaTfBVIDZuk+N0vPAWfpg0ORngP31Mal58QvSJsoJhCodk6BoTwHFObNXN9m/i7XZuYVrn8m6AnoGbPDVe7kLtyD2/AaprHmODyBO5r8C1jD/Bp4zt/vMj7ms8MkNxB/wpjAdXgE9zWTeAfTWXMSnsE9Tf6VZgJG0IfAEGdvwwi+kGL+Lkgy3wNKWA1IX0QiyX0ROYC7eu7JDwSsY81HrgOY9+f6XGS/B/4CZugvp6pRyGMAAAAASUVORK5CYII=" class="h-8 mr-3" alt="Flowbite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Conecta</span>
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
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">CONECTA™</a>. Todos os direitos reservados.</span>
            </div>
        </footer>
    )
}