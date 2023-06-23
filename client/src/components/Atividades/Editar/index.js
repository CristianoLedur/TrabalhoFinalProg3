import React, {useState, useEffect} from 'react';

export default function EditarAtiviade({ atividadeSelecionada, closeModal }) {
    const [texto, setTexto] = useState('');
    const [ backendCidades, setBackendCidades ] = useState([{}]);

    const handleChange = (event) => {
        setTexto(event.target.value);
    };

    useEffect(() => {
        const fetchCidades = async () => {
            try {
                let res = await fetch('http://localhost:3001/cidades');
                let cidades = await res.json();
                setBackendCidades(cidades);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCidades();
    }, []);
    
    return (
        <>
            <div id="updateProductModal" tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-gray-700/50">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Editar Atividade
                            </h3>
                            <button 
                                onClick={closeModal}
                                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form action="#">
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                                    <input type="text" name="titulo" id="titulo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                    placeholder="Escreva o título da atividade" required="" />
                                </div>
                                <div>
                                    <label htmlFor="modalidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modalidade</label>
                                    <select id="modalidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected="">Selecione uma opção</option>
                                        <option value="Presencial">Presencial</option>
                                        <option value="Hibrido">Hibrido</option>
                                        <option value="Remoto">Remoto</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="diasEturnos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Disponibilidade</label>
                                    <input type="text" name="diasEturnos" id="diasEturnos" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Segundas e Sextas das 20h às 21h" required="" />
                                </div>
                                <div>
                                    <label htmlFor="quantidadeVagas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade de vagas</label>
                                    <input type="numer" name="quantidadeVagas" id="quantidadeVagas" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="32" required="" min={0} />
                                </div>
                                
                                <div>
                                    <button id="dropdownBgHoverButton" data-dropdown-toggle="dropdownBgHover" className="text-white bg-blue-700 w-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                        Cidades 
                                        <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                                            </path>
                                        </svg>
                                    </button>
                                    {/* <!-- Dropdown menu --> */}
                                    <div id="dropdownBgHover" className="z-10 w-48 bg-white rounded-lg shadow dark:bg-gray-700">
                                        
                                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
                                            {backendCidades.map((cidade, i) => (
                                                <li 
                                                    key={i}
                                                >
                                                    <div 
                                                        className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    >
                                                        <input 
                                                            value={cidade.id} 
                                                            id={`checkbox-item-${i}`} 
                                                            type="checkbox" 
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
                                                        />
                                                        <label 
                                                            htmlFor={`checkbox-item-${i}`}
                                                            className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                                        >
                                                            {cidade.nome}
                                                        </label>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="categoria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                                    <select 
                                        defaultValue={"categoria"}
                                        id="categoria" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        <option selected="">Selecione uma opção</option>
                                        <option value="Curso">Curso</option>
                                        <option value="Palestra">Palestra</option>
                                        <option value="Serviço">Serviço</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                    <textarea 
                                        defaultValue={"Escreva uma descrição sobre a atividade aqui"}
                                        id="descricao" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product description here"></textarea>                    
                                </div>
                            </div>
                                <div className="flex items-center space-x-4">
                                    <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Update product
                                    </button>
                                    <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        Delete
                                    </button>
                                </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </>
    )
}