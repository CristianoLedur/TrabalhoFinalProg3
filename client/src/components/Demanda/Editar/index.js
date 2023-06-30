'use client';
import React, {useState, useEffect} from 'react';
import { useUserContext } from '../../../context/user/UserContext';
import { getCookie } from "cookies-next";
import FormSugerida from './FormSugerida';
import FormSolicitada from './FormSolicitada';


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    status: Yup.string().required('Campo obrigatório'),
    titulo: Yup.string().required('Campo obrigatório').min(6, 'Titulo deve haver pelo menos 6 caracteres'),
    descricao: Yup.string().required('Campo obrigatório'),
    modalidade: Yup.string().required('Campo obrigatório'),
    diasEturnos: Yup.string().required('Campo obrigatório'),
    categoria: Yup.string().required('Campo obrigatório'),
    quantidadeVagas: Yup.number().required('Campo obrigatório'),
    userId: Yup.number().required('Campo obrigatório'),
});


export default function EditarDemanda({ demandaSelecionada, closeModal, fetchDemanda }) {
    const { userInfo } = useUserContext();
    const [ backendCidades, setBackendCidades ] = useState([{}]);
    const [ toggleBoxCidades, setToggleBoxCidades ] = useState(false);
    const [ atividadeRelacionada, setAtividadeRelacionada ] = useState('');

    const { register, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: {
            status: atividadeSelecionada.status,
            titulo: atividadeSelecionada.titulo,
            descricao: atividadeSelecionada.descricao,
            modalidade: atividadeSelecionada.modalidade,
            categoria: atividadeSelecionada.categoria,
            diasEturnos: atividadeSelecionada.diasEturnos,
            quantidadeVagas: atividadeSelecionada.quantidadeVagas,
            cidade: atividadeSelecionada.cidade,
            userId: userInfo.id
        }
    });
    const { errors, isSubmitting } = formState;

    const handleSubmitData = async (dataForm) => {
        dataForm.cidade = dataForm.cidade
            .filter((element) => typeof(element) === "string")
            .map((element) => parseInt(element));
        if(dataForm.cidade.length < 1) {
            dataForm.cidade = null
        } 
        dataForm.userId = userInfo.id;
        if( atividadeSelecionada.sugerida.length > 0 || atividadeSelecionada.solicitada.length > 0 ) {
            if( atividadeSelecionada.status === 'Aceita' ){
                dataForm.status = 'A reformular';
            } else {
                dataForm.status = 'Aceita';
            }
        } else {
            dataForm.status = 'Em avaliação';
        }
        const token = getCookie('Authorization');
        try {
            const response = await fetch(`http://localhost:3001/atividade/${atividadeSelecionada.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm),
            });

            setTimeout(() => {
                closeModal();
            }, 1000);

            // posso apresentar uma mensagem de sucesso na tela
            
        } catch (error) {
            console.log(error);
        }
    }


    const handleBoxCidades = () => {
        setToggleBoxCidades(!toggleBoxCidades);
    }

    const fetchCidades = async () => {
        try {
            let res = await fetch('http://localhost:3001/cidades');
            let cidades = await res.json();
            setBackendCidades(cidades);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchAtividadeRelacionada = async () => {
        try {
            const response = await fetch(`http://localhost:3001/atividade?id=${demandaSelecionada.atividadeId}`);
            const data = await response.json();
            setAtividadeRelacionada(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAtividadeRelacionada();
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
                                Editar Demanda
                            </h3>
                            <button 
                                onClick={closeModal}
                                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div>
                            {demandaSelecionada.tipoDemanda === 'sugerida' ? (
                                <FormSugerida 
                                    demandaSelecionada={demandaSelecionada} 
                                    atividadeRelacionada={atividadeRelacionada}
                                    userInfo={userInfo}
                                    closeModal={closeModal}
                                />
                            ) : (
                                <FormSolicitada 
                                    demandaSelecionada={demandaSelecionada} 
                                    atividadeRelacionada={atividadeRelacionada}
                                    userInfo={userInfo}
                                    closeModal={closeModal}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}