'use client'
import React, { useState, useContext, useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string().email('Formato inválido').required('Campo obrigatório'),
    password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres.').required('Campo obrigatório')
});

export default function SignIn(props) {
    const { register, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const { errors, isSubmitting } = formState;
    const [ erro, setErro ] = useState('');
    const router = useRouter();

    const handleSubmitData = async (dataForm) => {
        try {
            const response = await fetch('http://localhost:3001/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm),
            });

            const data = await response.json();

            if (response.ok) {
                const { token, user } = data;
                setCookie('Authorization', token)
                const userString = JSON.stringify(user);
                sessionStorage.setItem('user', userString);
                router.push('/');
            } else {
                // Tratar o erro de autenticação
                console.log(data.error);
                setErro("Email ou senha inválido");
            } 
        } catch (error) {
            // Tratar outros erros
            console.log(error);
        }
    }


    return (
        <section 
            className="bg-gray-50 dark:bg-gray-900"
        >
            <div 
                className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
            >
                <a 
                    href="/" 
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img 
                        className="w-8 h-8 mr-2" 
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" 
                        alt="logo" 
                    />
                    Nome site
                </a>
                <div 
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                >
                    <div 
                        className="p-6 space-y-4 md:space-y-6 sm:p-8"
                    >
                        <h1 
                            className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                        >
                            Faça login em sua conta
                        </h1>
                        <form 
                            className="space-y-4 md:space-y-6" 
                            onSubmit={handleSubmit(handleSubmitData)}
                            method="POST"
                        >
                            <div>
                                {erro && (!errors.email || !errors.password) && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{erro}</p>}
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
                                    autoFocus
                                    { ...register('email')}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="name@company.com" 
                                    required="" 
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</p>
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
                                <a 
                                    href="#" 
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Esqueceu a senha?*
                                </a>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Entrando...' : 'Entrar'}
                            </button>
                            <p 
                                className="text-sm font-light text-gray-500 dark:text-gray-400"
                            >
                                Ainda não possui conta? 
                                <button 
                                    onClick={() => props.ToggleCompLogin()} 
                                    className="pl-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Registre-se
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}