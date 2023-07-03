'use client';
export default function Paginacao({ paginaAtual, totalPaginas, handlePaginaAnterior, handleProximaPagina, handlePaginaAtual, total }) {
    const itensPorPagina = 10;
    const indiceInicial = (paginaAtual - 1) * itensPorPagina + 1;
    const indiceFinal = Math.min(paginaAtual * itensPorPagina, total);
    const paginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(
        <li key={i}>
            <button
            onClick={() => handlePaginaAtual(i)}
            className={`flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${i === paginaAtual ? 'bg-gray-200 text-gray-800 pointer-events-none' : ''}`}
            disabled={i === paginaAtual}
            >
            {i}
            </button>
        </li>
        );
    }
    return (
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Mostrando
                <span className="font-semibold text-gray-900 dark:text-white"> {indiceInicial}-{indiceFinal} </span>
                de
                <span className="font-semibold text-gray-900 dark:text-white"> {total}</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
                <li>
                <button onClick={handlePaginaAnterior} className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${paginaAtual === 1 ? 'pointer-events-none' : ''}`} disabled={paginaAtual === 1}>
                        <span className="sr-only">Previous</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
                {paginas}
                <li>
                <button onClick={handleProximaPagina} className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${paginaAtual === totalPaginas ? 'pointer-events-none' : ''}`} disabled={paginaAtual === totalPaginas}>
                        <span className="sr-only">Next</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    )
}