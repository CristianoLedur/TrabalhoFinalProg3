'use client'
import React, { useState, useEffect } from "react";

export default function SingUp(props) {
    const [ nome, setNome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ tipoUsuario, setTipoUsuario ] = useState('');
    const [ cidadeId, setCidadeId ] = useState('');
    const [ backendCidades, setBackendCidades ] = useState([{}]);

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

    /* estes campos de input eu posso trazer tudo para uma unica função */
    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTipoUsuarioSelect = (event) => {
        setTipoUsuario(event.target.value);
    };

    const handleCidadeSelect = (event) => {
        setCidadeId(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        /* chamar os métodos para verificar os campos preenchidos 
        */
        try {
            const response = await fetch('http://localhost:3001/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    password: password,
                    status: "ativo",
                    tipoUsuario: tipoUsuario,
                    cidadeId: cidadeId,
                }),
            });
      
            const data = await response.json();
            sessionStorage.setItem('token', data.token);
        } catch (error) {
          console.error(error);
        }
    };


    /* depois de cadastrado já passo a "sessão" para pegar o token */
    return (
        <section 
            className="bg-gray-50 dark:bg-gray-900"
        >
            <div 
                className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
            >
                <a href="/" 
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img 
                        className="w-8 h-8 mr-2" 
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" 
                        alt="logo" 
                    />
                        Nome site...   
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
                            Create and account
                        </h1>
                        <form 
                            className="space-y-4 md:space-y-6" 
                            action="POST"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label 
                                    htmlFor="name" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your name
                                </label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name"
                                    value={nome}
                                    onChange={handleNomeChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="João da Lapa" 
                                    required="" 
                                />
                            </div>
                            <div>
                                <label 
                                    htmlFor="email" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="name@company.com" 
                                    required="" 
                                />
                            </div>
                            <div>
                                <label 
                                    htmlFor="password" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required="" 
                                />
                            </div>
                            <div>
                                <label 
                                    htmlFor="confirm-password" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <input 
                                    type="password" 
                                    name="confirm-password" 
                                    id="confirm-password" 
                                    placeholder="••••••••"
                                    // verifico se são iguais
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required="" 
                                />
                            </div>
                            <div>
                                <label 
                                    htmlFor="cidades" 
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Select your country
                                </label>
                                <select 
                                    defaultValue="cidades"
                                    id="cidades"
                                    value={cidadeId}
                                    onChange={handleCidadeSelect}
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
                            </div>
                            <div>
                            <label 
                                htmlFor="tipoUsuario" 
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Select your country
                            </label>
                                <select 
                                    id="tipoUsuario"
                                    value={tipoUsuario}
                                    onChange={handleTipoUsuarioSelect}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Selecione uma opção</option>
                                    <option value="aluno">Aluno</option>
                                    <option value="servidor">Servidor</option>
                                    <option value="comunidadeExterna">Comunidade Externa</option>
                                </select>
                            </div>
                            <div 
                                className="flex items-start"
                            >
                                <div 
                                    className="flex items-center h-5"
                                >
                                <input 
                                    id="terms" 
                                    aria-describedby="terms" 
                                    type="checkbox" 
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                                    required="" 
                                />
                                </div>
                                <div 
                                    className="ml-3 text-sm"
                                >
                                    <label 
                                        htmlFor="terms" 
                                        className="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the
                                        <a 
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500" 
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Create an account
                            </button>
                            <p 
                                className="text-sm font-light text-gray-500 dark:text-gray-400"
                            >
                                Already have an account? 
                                <a 
                                    onClick={() => props.ToggleCompLogin()} 
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Login
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}