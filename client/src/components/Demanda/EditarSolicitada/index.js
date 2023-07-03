'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCookie } from "cookies-next";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    tipoDemanda: Yup.string().required('Campo obrigatório'),
    status: Yup.string().required('Campo obrigatório'),
    titulo: Yup.string().required('Campo obrigatório'),
    observacao: Yup.string().required('Campo obrigatório'),
    quantidadeInteressados: Yup.number().required('Campo obrigatório').min(1, 'Valor mínimo é 1'),
    cidadeId: Yup.number('Selecione uma Opção'),
    userId: Yup.number().required(),
    atividadeId: Yup.number().required('Campo obrigatório'),
});

export default function EditarSolicitada({ demandaSelecionada, closeModal }) {
    const token = getCookie('Authorization');
    const [ atividadeRelacionada, setAtividadeRelacionada ] = useState('');
    const { register, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: {
            tipoDemanda: demandaSelecionada.tipoDemanda,
            status: demandaSelecionada.status,
            titulo: demandaSelecionada.titulo,
            observacao: demandaSelecionada.observacao,
            quantidadeInteressados: demandaSelecionada.quantidadeInteressados,
            comentario: demandaSelecionada.comentario,
            cidadeId: null,
            userId: demandaSelecionada.user.id,
            atividadeId: demandaSelecionada.atividade.id
        }
    });
    const { errors, isSubmitting } = formState;

    const handleSubmitData = async (dataForm) => {
        if( demandaSelecionada.atividade !== null ) {
            if( demandaSelecionada.status === 'Aceita' ){
                dataForm.status = 'A reformular';
            } else {
                dataForm.status = 'Em avaliação';
            }
        } else {
            dataForm.status = 'Em avaliação';
        }
        const token = getCookie('Authorization');
        try {
            const response = await fetch(`http://localhost:3001/demanda-solicitada/${demandaSelecionada.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm),
            });
            if (response.ok) {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
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
    }, []);

    return (
        <div id="updateProductModal" tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-gray-700/50">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

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
                        <form
                            onSubmit={handleSubmit(handleSubmitData)}
                            method='PUT'
                        >
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                                    <input 
                                        type="text" 
                                        name="titulo" 
                                        id="titulo" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Escreva o título da atividade" 
                                        required=""
                                        disabled={demandaSelecionada.atividadeId !== null}
                                        { ...register('titulo')}
                                    />
                                    {errors.titulo && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.titulo.message}</p>
                                    )}
                                </div>
                                {atividadeRelacionada && (atividadeRelacionada.modalidade !== "Remoto") && (
                                    atividadeRelacionada.cidade.length > 0 && (
                                        <div>
                                            <label htmlFor="cidadeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                                            <select
                                                { ...register('cidadeId')}
                                                id="cidadeId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                <option value="">Selecione um opção</option>
                                                {atividadeRelacionada.cidade.map((cidade) => (
                                                    <option 
                                                        key={cidade.id}
                                                        value={cidade.id}
                                                    >
                                                        {cidade.nome}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.cidadeId && (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.cidadeId.message}</p>
                                            )}
                                        </div>
                                    )
                                )}
                                <div className="sm:col-span-2">
                                    <label htmlFor="observacao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observação</label>
                                    <textarea 
                                        { ...register('observacao')}
                                        id="observacao" 
                                        rows="4" 
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Escreva suas observações"
                                    >
                                            
                                    </textarea>   
                                    {errors.observacao && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.observacao.message}</p>
                                    )}                   
                                </div>
                                <div>
                                    <label htmlFor="quantidadeInteressados" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade de interressados</label>
                                    <input 
                                        type="numer" 
                                        name="quantidadeInteressados" 
                                        id="quantidadeInteressados" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="32" 
                                        required="" 
                                        min={1} 
                                        { ...register('quantidadeInteressados')}
                                    />
                                    {errors.quantidadeInteressados && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.quantidadeInteressados.message}</p>
                                    )}
                                </div>
                            </div>     
                            <div className="flex items-center space-x-4">
                                <button 
                                        disabled={isSubmitting}
                                        type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                        {isSubmitting ? 'Editando...' : 'Editar Demanda'}
                                </button>
                                <button 
                                    onClick={closeModal}
                                    type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};