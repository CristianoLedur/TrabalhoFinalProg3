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
    comentario: Yup.string(),
    userId: Yup.number().required(),
    atividadeId: Yup.number().required(),
    cidadeId: Yup.number(),
});

export default function FormSolicitada({ demandaSelecionada, atividadeRelacionada, closeModal }) {
    const token = getCookie('Authorization');
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
            cidadeId: demandaSelecionada.cidadeId,
            userId: demandaSelecionada.userId,
            atividadeId: demandaSelecionada.atividadeId
        }
    });
    const { errors, isSubmitting } = formState;

    const handleSubmitData = (dataForm) => {
        console.log(teste);
    };

    return (
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
                {atividadeRelacionada && (atividadeRelacionada.cidade !== "Remoto") && (
                    <div>
                        <label htmlFor="cidadeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                        <select 
                            { ...register('cidadeId')}
                            id="cidadeId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value="">Selecione uma opção</option>
                            {atividadeRelacionada.cidade.map((cidade) => (
                                <option 
                                    key={cidade.id}
                                    value={cidade.id}
                                >
                                    {cidade.nome}
                                </option>
                            ))}
                        </select>
                    </div>
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
                    type='submit'
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    {isSubmitting ? 'Editando...' : 'Editar Demanda'}
                </button>
                <button 
                    onClick={closeModal}
                    type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Cancelar
                </button>
            </div>
        </form>
    );
};