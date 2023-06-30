'use client'
import React, { useState, useEffect } from "react";
import { useUserContext } from '../../../context/user/UserContext';
import { getCookie } from "cookies-next";

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
    quantidadeInteressados: Yup.number().required('Campo obrigatório'),
    tipoDemanda: Yup.string().required('Campo obrigatório'),
    userId: Yup.number().required('Campo obrigatório'),
});

export default function SugerirAtiviade({ closeModal }) {
    const { userInfo } = useUserContext();
    const [ backendCidades, setBackendCidades ] = useState([{}]);
    const [ openButtonCidades , setOpenButtonCidades ] = useState(false);
    const [ demandaCadastrada, setDemandaCadastrada] = useState('');

    const { register, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: {
            status: 'Em avaliação',
            titulo: '',
            descricao: '',
            modalidade: '',
            categoria: '',
            diasEturnos: '',
            quantidadeInteressados: 1,
            cidade: [],
            tipoDemanda: 'sugerida',
            userId: 1
        }
    });
    const { errors, isSubmitting } = formState;

    const handleButtonCidades = () => {
        setOpenButtonCidades(!openButtonCidades);
    }

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

    const handleSubmitData = async (dataForm) => {
        dataForm.cidade = dataForm.cidade
            .filter((element) => typeof(element) === "string")
            .map((element) => parseInt(element));
        dataForm.userId = userInfo.id;
        console.log(dataForm);
        const token = getCookie('Authorization');
        try {
            const response = await fetch('http://localhost:3001/demanda-sugerida', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm),
            });

            const data = await response.json();

            setTimeout(() => {
                closeModal();
            }, 1000);

            // posso apresentar uma mensagem de sucesso na tela
            
        } catch (error) {
            setDemandaCadastrada('Você já sugeriu uma demanda com este título');
            console.log(error);
        }
    }

    return (
        <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-gray-700/50">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    {/* <!-- Modal header --> */}
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Sugerir Atividade
                        </h3>
                        <button 
                            onClick={closeModal}
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form 
                        onSubmit={handleSubmit(handleSubmitData)}
                        method="POST"
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
                                    { ...register('titulo')}
                                />
                                {errors.titulo && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.titulo.message}</p>
                                )}
                                {demandaCadastrada && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{demandaCadastrada}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="modalidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modalidade</label>
                                <select 
                                    id="modalidade" 
                                    { ...register('modalidade')}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="">Selecione uma opção</option>
                                    <option value="Presencial">Presencial</option>
                                    <option value="Hibrido">Hibrido</option>
                                    <option value="Remoto">Remoto</option>
                                </select>
                                {errors.modalidade && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.modalidade.message}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="diasEturnos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Disponibilidade</label>
                                <input 
                                    type="text" 
                                    name="diasEturnos" 
                                    id="diasEturnos" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                    placeholder="Segundas e Sextas das 20h às 21h" 
                                    required=""
                                    { ...register('diasEturnos')}
                                />
                                {errors.diasEturnos && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.diasEturnos.message}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="quantidadeInteressados" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade de interessados</label>
                                <input 
                                    type="numer" 
                                    name="quantidadeInteressados" 
                                    id="quantidadeInteressados" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                    placeholder="32" 
                                    required="" 
                                    defaultValue={1}
                                    min={1} 
                                    { ...register('quantidadeInteressados')}
                                />
                                {errors.quantidadeInteressados && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.quantidadeInteressados.message}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="cidades" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidades</label>
                                <div className="relative">
                                    <button
                                        id="cidades"
                                        onClick={handleButtonCidades}
                                        data-dropdown-toggle="dropdownBgHover"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-left rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 flex justify-between"
                                    >
                                        Selecione as opções
                                        <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                                            </path>
                                        </svg>
                                    </button>
                                    <ul className={openButtonCidades 
                                        ? "absolute z-60 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg mt-1 py-1 w-full max-h-32 overflow-y-auto"
                                        : "hidden"}
                                    >
                                        {backendCidades.map((cidade, i) => (
                                            <li
                                            key={i}
                                            className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                            >
                                            <div className="flex items-center">
                                                <input
                                                    {...register(`cidade[${cidade.id}]`)}
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
                                    { ...register('categoria')}
                                    id="categoria" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="">Selecione uma opção</option>
                                    <option value="Curso">Curso</option>
                                    <option value="Palestra">Palestra</option>
                                    <option value="Serviço">Serviço</option>
                                </select>
                                {errors.categoria && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.categoria.message}</p>
                                )}
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                <textarea 
                                    { ...register('descricao')}
                                    id="descricao" 
                                    rows="4" 
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                    placeholder="Escreva aqui uma breve descrição sobre a atividade"
                                >
                                </textarea> 
                                {errors.descricao && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.descricao.message}</p>
                                )}                   
                            </div>
                        </div>
                        <button 
                            disabled={isSubmitting}
                            type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            {isSubmitting ? 'Cadastrando...' : 'Sugerir Atividade'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}