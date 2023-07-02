'use client';
import { useState, useEffect } from 'react';
import EditarUsuario from '../../components/Usuario/Editar';
import AlterarSenha from '../../components/Usuario/AlterarSenha';
import { getCookie } from 'cookies-next';

export default function Profile() {
    const token = getCookie('Authorization');
    const [email, setEmail] = useState('');
    const [usuarioSelecionado, setUsuarioSelecionado ] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalStates, setModalStates] = useState({
        update: false,
        changePassword: false,
    });

    useEffect(() => {
        const dataString = sessionStorage.getItem('user');
        const user = JSON.parse(dataString);
        // setEmail(user.email);
        fetchUsuario(user.email);
    }, []);

    // useEffect(() => {
    //     if (email) {
    //       const encodedEmail = encodeURIComponent(email);
    //       fetchUsuario(encodedEmail);
    //     }
    // }, [email]);
      
    async function fetchUsuario(value) {
        console.log(value);
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/user?email=${value}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setUsuarioSelecionado(data[0]);
        } catch (error) {
            console.log('Ocorreu um erro ao buscar os detalhes do usuário:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const openModal = (modalType) => {
        setModalStates((prevState) => ({
            ...prevState,
            [modalType]: true,
        }));
    };
    
    const closeModal = () => {
        setModalStates({});
    };

    const handleOpenModal = (modalType) => {
        setTimeout(() => {
            openModal(modalType);
        }, (300));
    };

    return (
        <>
            <div className="w-screen box-profile flex justify-center items-center">
                <div className=" bg-white border p-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col px-10 items-left py-5">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Nome</h5>
                        <span className="text-base text-gray-500 dark:text-gray-400">{usuarioSelecionado.nome}</span>
                        <h5 className="mt-3 text-xl font-medium text-gray-900 dark:text-white">Email</h5>
                        <span className="text-base text-gray-500 dark:text-gray-400">{usuarioSelecionado.email}</span>
                        {usuarioSelecionado.cidade && (
                            <>
                                <h5 className="mt-3 text-xl font-medium text-gray-900 dark:text-white">Cidade</h5>
                                <span className="text-base text-gray-500 dark:text-gray-400">{usuarioSelecionado.cidade.nome}, {usuarioSelecionado.cidade.estado}</span>
                            </>
                        )}
                        
                        <div className="flex mt-4 space-x-3 md:mt-6">
                            <button 
                                onClick={() => handleOpenModal('update')}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Editar perfil
                            </button>
                            <button 
                                onClick={() => handleOpenModal('changePassword')}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Alterar senha
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {modalStates.update && (
                <EditarUsuario 
                    usuarioSelecionado={usuarioSelecionado}
                    closeModal={closeModal}
                />
            )}
            {modalStates.changePassword && (
                <AlterarSenha 
                    usuarioSelecionado={usuarioSelecionado}
                    closeModal={closeModal}
                />
            )}
        </>
        
    )
}
