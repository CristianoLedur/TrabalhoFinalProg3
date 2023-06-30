'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCookie } from "cookies-next";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    titulo: Yup.string().required('Campo obrigatório'),
    descricao: Yup.string().required('Campo obrigatório'),
    modalidade: Yup.string().required('Campo obrigatório'),
    diasEturnos: Yup.string().required('Campo obrigatório'),
    quantidadeInteressados: Yup.number().required('Campo obrigatório').min(1, 'Valor mínimo é 1'),
    categoria: Yup.string().required('Campo obrigatório'),
    comentario: Yup.string(),
    userId: Yup.number().required(),
    atividadeId: Yup.number()
});

export default function FormSugerida({ demandaSelecionada, atividadeRelacionada, userInfo, closeModal }) {
    const token = getCookie('Authorization');
    const [ openButtonCidades , setOpenButtonCidades ] = useState(false);
    const [ backendCidades, setBackendCidades ] = useState([{}]);
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            tipoDemanda: 'sugerida',
            titulo: demandaSelecionada.titulo,
            descricao: demandaSelecionada.descricao,
            modalidade: demandaSelecionada.modalidade,
            diasEturnos: demandaSelecionada.diasEturnos,
            quantidadeInteressados: demandaSelecionada.quantidadeInteressados,
            categoria: demandaSelecionada.categoria,
            comentario: demandaSelecionada.comentario,
            cidade: demandaSelecionada.cidade,
            userInfo: demandaSelecionada.userId,
            atividadeId: demandaSelecionada.atividadeId
        }
    });

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

    const handleSubmitData = (dataForm) => {
        // Lógica de envio do formulário para a API
        console.log('Dados do formulário solicitada:', dataForm);
    };

    const handleButtonCidades = () => {
        setOpenButtonCidades(!openButtonCidades);
    }


    return (
        <form
            onSubmit={handleSubmit(handleSubmitData)}
            method="PUT"
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
                        { ...register('titulo')}
                        required="" 
                    />
                    {errors.titulo && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.titulo.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="modalidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modalidade</label>
                    <select 
                        { ...register('modalidade')}
                        id="modalidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
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
                    <label htmlFor="quantidadeInteressados" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade de interessados</label>
                    <input 
                        defaultValue={1}
                        min={1} 
                        { ...register('quantidadeInteressados')}
                        type="numer" name="quantidadeInteressados" id="quantidadeInteressados" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="32" required="" 
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
                            type='button'
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
            <div className="flex items-center space-x-4">
                <button 
                    disabled={isSubmitting}
                    type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    {isSubmitting ? 'Editando...' : 'Editar Demanda'}
                </button>
                <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    Cancelar
                </button>
            </div>
        </form>
    );
};