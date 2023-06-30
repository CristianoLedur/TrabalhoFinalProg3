'use client'
import { useState, useEffect } from 'react';
import { useUserContext } from '../../../context/user/UserContext';

export default function VerDemanda({ demandaSelecionada, handleButtonValidar, closeModal, fetchDemanda, openModal}) {
    const { userInfo } = useUserContext();
    const [ backendAtividades, setBackendAtividades ] = useState([{}]);
    const [ validarForm, setValidarForm ] = useState(false);
    const cidades = demandaSelecionada.cidade.map(cidade => cidade.nome);
    const cidadesString = cidades.join(', ');
    const temCidades = cidades.length > 0;

    if (demandaSelecionada.status === "Em avaliação") {
        var statusClassName = "text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:text-gray-300 bg-blue-100 text-blue-800";
    } else if (demandaSelecionada.status === "Cancelada") {
        var statusClassName = "text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:text-gray-300 bg-red-100 text-red-800";
    } else if (demandaSelecionada.status === "Aceita") {
        var statusClassName = "text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:text-gray-300 bg-green-100 text-green-800";
    } else if (demandaSelecionada.status === "A reformular") {
        var statusClassName = "text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:text-gray-300 bg-yellow-100 text-yellow-800";
    }

    const handleForm = () => {
        setValidarForm(!validarForm);
    }

    const handleOpenModal = (modalType, itemId, tipoDemanda) => {
        fetchDemanda(tipoDemanda, itemId);
        setTimeout(() => {
            openModal(modalType, itemId);
        }, (300));
    };

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const res = await fetch('http://localhost:3001/atividades');
                const atividades = await res.json();
                //  filtrar por atividades aceitas
                setBackendAtividades(atividades);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAtividades();
    }, []);

    useEffect(() => {
        closeModal();
        const fetchDemandas = async () => {
            try {
                const response = await fetch('http://localhost:3001/demandas-sugeridas', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                })
                const dataSugeridas = await response.json();
                setBackendData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDemandas();
    }, [validarForm]);

    return (
        <>
            {/* <!-- Main modal --> */}
            <div 
                id="readProductModal" 
                tabIndex="-1" 
                aria-hidden="true" 
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full bg-gray-700/50"
            >
                <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                <h4 className="font-semibold ">
                                    {demandaSelecionada.titulo}
                                </h4>
                                <span className={statusClassName}>
                                    {demandaSelecionada.status}
                                </span>
                            </div>
                            <div>
                                <button 
                                    onClick={closeModal}
                                    type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                        {demandaSelecionada.tipoDemanda === 'sugerida' ? (
                            <dl>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Descrição</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.descricao}</dd>
                                { (userInfo.id !== demandaSelecionada.user.id) && (
                                    <>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Usuário</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.user.nome}</dd>
                                    </>  
                                )}
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Modalidade</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.modalidade}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Categoria</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.categoria}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Disponibilidade</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.diasEturnos}</dd>
                                {temCidades && (
                                    <>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Cidades</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{cidadesString}</dd>
                                    </>
                                )}
                                {demandaSelecionada.comentario !== null && (
                                    <>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Comentário</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.comentario}</dd>
                                    </>
                                )}
                                {demandaSelecionada.atividade !== null && (
                                    <>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Atividade Relacionada</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.atividade.titulo}</dd>
                                    </>
                                )}
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Ultima alteração</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.updatedAt}</dd>
                            </dl>
                        ) : (
                            <dl>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Observação</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.observacao}</dd>
                                { (userInfo.id !== demandaSelecionada.user.id) && (
                                    <>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Usuário</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.user.nome}</dd>
                                    </>  
                                )}
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Quantidade de interessados</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.quantidadeInteressados}</dd>
                                {temCidades && (
                                    <>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Cidades</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{cidadesString}</dd>
                                    </>
                                )}
                                {demandaSelecionada.comentario !== null && (
                                    <>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Comentário</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.comentario}</dd>
                                    </>
                                )}
                                
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Atividade Relacionada</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.atividade.titulo}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Ultima alteração</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{demandaSelecionada.updatedAt}</dd>
                            </dl>
                        )}
                        {userInfo && (
                            <div className={!validarForm 
                                ? "flex justify-between items-center"
                                : "hidden"
                                }
                            >
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    {(userInfo.id === demandaSelecionada.user.id) && (
                                        <button 
                                            onClick={() => handleOpenModal('update', demandaSelecionada.id, demandaSelecionada.tipoDemanda)}
                                            type="button" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                            Editar
                                        </button> 
                                    )}
                                    {(userInfo.tipoUsuario === 'Servidor' ) && (   
                                        <button 
                                            onClick={handleForm}
                                            type="button" 
                                            className={!validarForm 
                                                ? "py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                : "hidden"
                                            }
                                        >
                                            Validar
                                        </button>
                                    )}
                                </div> 
                                {( (userInfo.id === demandaSelecionada.user.id) && (demandaSelecionada.status !== 'Aceita')) && (             
                                    <button 
                                        onClick={() => handleOpenModal('delete', demandaSelecionada.id, demandaSelecionada.tipoDemanda)}
                                        type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        Excluir
                                    </button>
                                )}
                            </div>
                        )}
                        <div className={validarForm 
                            ? ""
                            : "hidden"
                        }>
                            <div className="flex justify-between items-center py-4 my-4 rounded-t border-y sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Validar Demanda
                                </h3>
                            </div>
                            <form caction="#" method="POST">
                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option selected="">Escolha uma opção</option>
                                            <option value="Aceita">Aceita</option>
                                            <option value="Cancelada">Cancelada</option>
                                            <option value="A reformular">A reformular</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="atividade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Atividade Relacionada</label>
                                        <select id="atividade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option selected="">Escolha uma opção</option>
                                            {backendAtividades.map((atividade) => (
                                                <option 
                                                    key={atividade.id}
                                                    value={atividade.id}
                                                >
                                                    {atividade.titulo}
                                                </option>
                                            ))}
                                        
                                        </select>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="comentario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deixe um comentário em caso de melhorias</label>
                                        <textarea 
                                            id="comentario" 
                                            rows="5" 
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                            placeholder="Comente o que deve ser ajustado ou qual foi o motivo da demanda não ser aprovada..."
                                        >
                                            
                                        </textarea>                    
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button 
                                        type="submit" 
                                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Validar Demanda
                                    </button>
                                    <button 
                                        onClick={closeModal}
                                        type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )
}