'use client';
import {useState} from 'react';
export default function Filtrar() {
    const [buttonFiltrarOpen, setButtonFiltrarOpen] = useState(false);
    const [buttonStatusOpen, setButtonStatusOpen] = useState(false);
    const [buttonModalidadeOpen, setButtonModalidadeOpen] = useState(false);
    const [buttonCategoriaOpen, setButtonCategoriaOpen] = useState(false);

    function handleButtonFiltrar() {
        setButtonFiltrarOpen(!buttonFiltrarOpen);
    }
    function handleButtonStatus() {
        setButtonStatusOpen(!buttonStatusOpen);
        setButtonModalidadeOpen(false);
        setButtonCategoriaOpen(false);
    }
    function handleButtonModalidade() {
        setButtonModalidadeOpen(!buttonModalidadeOpen);
        setButtonCategoriaOpen(false);
        setButtonStatusOpen(false);
    }
    function handleButtonCategoria() {
        setButtonCategoriaOpen(!buttonCategoriaOpen);
        setButtonModalidadeOpen(false);
        setButtonStatusOpen(false);
    }
    return (
        <div className="flex items-center space-x-3 w-full md:w-auto relative">
            <button 
                onClick={handleButtonFiltrar}
                id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                    Filtrar
                <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
            </button>
            <div id="dropdown" 
                className={buttonFiltrarOpen
                ? "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-[10px] top-full z-60"
                : "hidden"
            }
            
            >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 " aria-labelledby="multiLevelDropdownButton">
                    <li>
                        <button 
                            onClick={handleButtonStatus}
                            id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start" type="button" className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Status<svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg></button>
                        <div id="dropdownDefaultCheckbox" 
                            className={buttonStatusOpen
                            ? "z-10 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 "
                            : "hidden"
                            }
                        >
                            <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                                <li>
                                    <div className="flex items-center">
                                        <input id="checkbox-status-aceita" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-status-aceita" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Aceita</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <input id="checkbox-status-cancelada" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-status-cancelada" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cancelada</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <input id="checkbox-status-a-reformular" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-status-a-reformular" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">A reformular</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <input id="checkbox-status-em-analise" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-status-em-analise" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Em análise</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button 
                            onClick={handleButtonModalidade}
                            id="doubleDropdownButton" 
                            data-dropdown-toggle="doubleDropdown" 
                            data-dropdown-placement="right-start" 
                            type="button" 
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Modalidade
                            <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg></button>
                        <div id="dropdownDefaultCheckbox" 
                            className={buttonModalidadeOpen
                            ? "z-10 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                            : "hidden"
                            }
                        >
                            <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                                <li>
                                    <div className="flex items-center">
                                        <input id="checkbox-modalidade-presencial" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-modalidade-presencial" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Presencial</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <input id="checkbox-modalidade-hibrido" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-modalidade-hibrido" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Híbrido</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <input id="checkbox-modalidade-remoto" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-modalidade-remoto" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remoto</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button 
                            onClick={handleButtonCategoria}
                            id="doubleDropdownButton" 
                            data-dropdown-toggle="doubleDropdown" 
                            data-dropdown-placement="right-start" 
                            type="button" 
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Categoria
                        <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg></button>
                        <div id="dropdownDefaultCheckbox" 
                            className={buttonCategoriaOpen
                            ? "z-10 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                            : "hidden"
                            }
                        >
                            <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                                <li>
                                    <div className="flex items-center">
                                        <input id="checkbox-categoria-servico" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-categoria-servico" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Serviço</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <input id="checkbox-categoria-palestra" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-categoria-palestra" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Palestra</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <input id="checkbox-categoria-curso" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-categoria-curso" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Curso</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}