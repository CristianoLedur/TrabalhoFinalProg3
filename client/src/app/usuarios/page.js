'use client';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

import CardUser from '../../components/CardUser';

export default function Usuarios({isAuthenticated}) {
    const [ backendUsuarios, setBackendUsuarios ] = useState([{}]);
    const [ usuarioSelecionado, setUsuarioSelecionado ] = useState(null);
    const [ modalUser, setModalUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const router = useRouter();
    // if (!isAuthenticated) {
    //     // Redireciona o usuário para a página de login
    //     router.push('/login');
    //     return null;
    // }

    useEffect(() => {
        const fetchUsuarios = async () => {
            // enviar o token junto
            try {
                const res = await fetch('http://localhost:3001/users');
                const usuarios = await res.json();
                setBackendUsuarios(usuarios);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsuarios();
    }, []);

    async function fetchUsuario(value) {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/user?email=${value}`);
            const data = await response.json();
            console.log(data);
            setUsuarioSelecionado(data[0]);
        } catch (error) {
            console.log('Ocorreu um erro ao buscar os detalhes do usuário:', error);
        } finally {
            setIsLoading(false);
            setModalUser(true);
        }
    };

    const closeModal = () => {
        setModalUser(false);
        setUsuarioSelecionado(null);
    };

    return ( 
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {/* componente de busca */}
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nome
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Posição
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ver mais
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {backendUsuarios.map((usuario, i) => (
                                    usuario.tipoUsuario !== 'Comunidade Externa' && (
                                        <tr 
                                            key={i}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="pl-3">
                                                    <div className="text-base font-semibold">{usuario.nome}</div>
                                                    <div className="font-normal text-gray-500">{usuario.email}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {usuario.tipoUsuario}
                                            </td>
                                            <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {usuario.status === 'online' ? (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                                ) : (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                                )}
                                                {usuario.status}
                                            </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {/* <!-- Modal toggle --> */}
                                                <button
                                                    onClick={() => fetchUsuario(usuario.email)}  
                                                    data-modal-show="editUserModal" 
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Ver usuário
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            { modalUser && (
                <CardUser 
                    closeModal={closeModal}
                    usuarioSelecionado={usuarioSelecionado}
                />
            )}
        </>
    )
}