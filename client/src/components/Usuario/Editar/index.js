'use client';
import React, {useState, useEffect} from 'react';
import { getCookie } from 'cookies-next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const schema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório').min(2, 'Nome deve ter pelo menos dois caracteres'),
    email: Yup.string().email('Formato inválido').required('Campo obrigatório'),
    status: Yup.string().required('Campo obrigatório'),
    tipoUsuario: Yup.string().required('Selecione uma opção'),
    cidadeId: Yup.number().required('Selecione uma opção'),
});

export default function EditarUsuario({ closeModal, usuarioSelecionado}) {
    const [ backendCidades, setBackendCidades ] = useState([{}]);
    const [ emailCadastrado, setEmailCadastrado ] = useState(null);
    const { register, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: {
            status: usuarioSelecionado.status,
            nome: usuarioSelecionado.nome,
            email: usuarioSelecionado.email,
            tipoUsuario: usuarioSelecionado.tipoUsuario, 
            cidadeId: usuarioSelecionado.cidadeId,
        }
    });
    const { errors, isSubmitting } = formState;

    const handleSubmitData = async (dataForm) => {
        console.log(dataForm);
        
        const token = getCookie('Authorization');
        console.log('Dados do formulário solicitada:', dataForm);
        try {
            const response = await fetch(`http://localhost:3001/user/${usuarioSelecionado.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm),
            });

            if (response.ok) {
                setTimeout(() => {
                  closeModal();
                }, 1000);
                // Apresentar mensagem de sucesso na tela
            } else {
                const errorData = await response.json(); // Obter informações de erro do corpo da resposta
                console.log('Erro:', errorData);
                setEmailCadastrado('Email já cadastrado!');
            }  
        } catch (error) {
            console.log(error);
        }
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
                                Editar Usuário
                            </h3>
                            <button 
                                onClick={closeModal}
                                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form 
                            className="space-y-4 md:space-y-6" 
                            action="POST"
                            onSubmit={handleSubmit(handleSubmitData)}
                        >
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label 
                                        htmlFor="name" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nome
                                    </label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="name"
                                        autoFocus
                                        { ...register('nome')}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="João da Lapa" 
                                        required="" 
                                    />
                                    {errors.nome && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.nome.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label 
                                        htmlFor="email" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email"
                                        { ...register('email')}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="name@company.com" 
                                        required="" 
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</p>
                                    )}
                                    {emailCadastrado && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{emailCadastrado}</p>
                                    )}
                                </div>
                                <div>
                                    <label 
                                        htmlFor="cidades" 
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Cidade
                                    </label>
                                    <select 
                                        defaultValue="cidades"
                                        id="cidades"
                                        { ...register('cidadeId')}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">Selecione uma opção</option>
                                        {backendCidades.map((cidade) => (
                                            <option 
                                                key={cidade.id}
                                                value={cidade.id}
                                            >
                                                {cidade.nome}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.cidadeId && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">Selecione uma opção</p>
                                    )}
                                </div>
                            </div>    
                            <div className="flex items-center space-x-4">
                                <button 
                                    disabled={isSubmitting}
                                    type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    {isSubmitting ? 'Editando...' : 'Editar Usuário'}
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
        </>
    )
}