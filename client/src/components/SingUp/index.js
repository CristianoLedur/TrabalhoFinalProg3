'use client'
import React, { useState, useEffect } from "react";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const schema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório').min(2, 'Nome deve haver pelo menos dois caracteres'),
    email: Yup.string().email('Formato inválido').required('Campo obrigatório'),
    password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres.').required('Campo obrigatório'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Senhas diferentes'),
    status: Yup.string().required(),
    tipoUsuario: Yup.string().required('Selecione uma opção'),
    cidadeId: Yup.number().required('Selecione uma opção'),
});

export default function SingUp(props) {
    const [ backendCidades, setBackendCidades ] = useState([{}]);
    const { register, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: {
            nome: '',
            email: '',
            password: '',
            confirmPassword: '',
            status: 'online',
            tipoUsuario: '',
            cidadeId: '',
        }
    });
    const [ emailCadastrado, setEmailCadastrado ] = useState('');
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
        try {
            const response = await fetch('http://localhost:3001/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm),
            });
      
            const data = await response.json();
            SignIn(data.email, data.password);
        } catch (error) {
          console.error(error);
        }
    };

    const SignIn = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3001/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const { token, user } = data;
                setCookie('Authorization', token);
                setCookie('user', user)
                router.push('/');
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            } else {
                console.log(data.error);
                setErro("Email ou senha inválido");
            } 
        } catch (error) {
            setEmailCadastrado('Email já cadastrado');
            console.log(error);
        }
    }
    return (
        <section 
            className="bg-gray-50 dark:bg-gray-900 box-login"
        >
            <div 
                className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
            >
                <div 
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                >
                    <div 
                        className="p-6 space-y-4 md:space-y-6 sm:p-8"
                    >
                        <h1 
                            className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                        >
                            Criar conta
                        </h1>
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
                                        htmlFor="password" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Senha
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        { ...register('password')}
                                        placeholder="••••••••" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required="" 
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label 
                                        htmlFor="confirm-password" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirmar senha
                                    </label>
                                    <input 
                                        type="password" 
                                        name="confirm-password" 
                                        id="confirm-password" 
                                        placeholder="••••••••"
                                        { ...register('confirmPassword')}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required="" 
                                    />
                                    {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.confirmPassword.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label 
                                        htmlFor="cidades" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Cidade
                                    </label>
                                    <select 
                                        defaultValue="cidades"
                                        id="cidades"
                                        { ...register('cidadeId')}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                <div>
                                    <label 
                                        htmlFor="tipoUsuario" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Papel
                                    </label>
                                    <select 
                                        id="tipoUsuario"
                                        { ...register('tipoUsuario')}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">Selecione uma opção</option>
                                        <option value="Aluno">Aluno</option>
                                        <option value="Servidor">Servidor</option>
                                        <option value="Comunidade Externa">Comunidade Externa</option>
                                    </select>
                                    {errors.tipoUsuario && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.tipoUsuario.message}</p>
                                    )}
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                            </button>
                            <p 
                                className="text-sm font-light text-gray-500 dark:text-gray-400"
                            >
                                Já possui conta?
                                <a 
                                    onClick={() => props.ToggleCompLogin()} 
                                    className="pl-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Entrar
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}