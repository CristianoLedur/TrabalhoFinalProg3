'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCookie } from "cookies-next";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    status: Yup.string().required('Campo obrigatório'),
    titulo: Yup.string().required('Campo obrigatório'),
    tipoDemanda: Yup.string().required('Campo obrigatório'),
    descricao: Yup.string().required('Campo obrigatório'),
    modalidade: Yup.string().required('Campo obrigatório'),
    diasEturnos: Yup.string().required('Campo obrigatório'),
    quantidadeInteressados: Yup.number().required('Campo obrigatório').min(1, 'Valor mínimo é 1'),
    categoria: Yup.string().required('Campo obrigatório'),
    userId: Yup.number().required(),
});

export default function EditarSugerida({ demandaSelecionada, closeModal }) {
    const [ openButtonCidades , setOpenButtonCidades ] = useState(false);
    const [ backendCidades, setBackendCidades ] = useState([{}]);
    const [ atividadeRelacionada, setAtividadeRelacionada ] = useState('');

    const { register, handleSubmit, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            status: demandaSelecionada.status,
            tipoDemanda: demandaSelecionada.tipoDemanda,
            titulo: demandaSelecionada.titulo,
            descricao: demandaSelecionada.descricao,
            modalidade: demandaSelecionada.modalidade,
            diasEturnos: demandaSelecionada.diasEturnos,
            quantidadeInteressados: demandaSelecionada.quantidadeInteressados,
            categoria: demandaSelecionada.categoria,
            comentario: demandaSelecionada.comentario,
            cidade: [],
            userId: demandaSelecionada.user.id,
        }
    });

    const { errors, isSubmitting } = formState;

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
        if(dataForm.cidade.length < 1) {
            dataForm.cidade = null
        } 
        if(demandaSelecionada.atividade !== null) {
            dataForm.atividadeId = demandaSelecionada.atividade.id
        } else {
            dataForm.atividadeId = null
        }
        if( demandaSelecionada.atividade !== null ) {
            if( demandaSelecionada.status === 'Aceita' ){
                dataForm.status = 'A reformular';
            } else {
                dataForm.status = 'Aceita';
            }
        } else {
            dataForm.status = 'Em avaliação';
        }
        const token = getCookie('Authorization');
        console.log('Dados do formulário solicitada:', dataForm);
        try {
            const response = await fetch(`http://localhost:3001/demanda-sugerida/${demandaSelecionada.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm),
            });

            setTimeout(() => {
                window.location.reload();
            }, 500);

            
        } catch (error) {
            console.log(error);
        }
    };

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

    const handleButtonCidades = () => {
        setOpenButtonCidades(!openButtonCidades);
    }

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
    );
};