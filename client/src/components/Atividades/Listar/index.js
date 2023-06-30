'use client'
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../../context/user/UserContext';
import { usePathname } from 'next/navigation';
import Buscar from '../../Buscar';
import Filtrar from '../../Filtrar';
import Paginacao from '../../Paginacao';

export default function ListarAtividade({ openModal, data, fetchAtividade }) {
    const { userInfo } = useUserContext();
    const [buttonAcaoOpen, setButtonAcaoOpen] = useState([]);
    const pathname = usePathname();
    
    const handleButtonAcao = (index) => {
        const updatedButtonAcaoOpen = [...buttonAcaoOpen];
        updatedButtonAcaoOpen[index] = !updatedButtonAcaoOpen[index];
        setButtonAcaoOpen(updatedButtonAcaoOpen);
    };

    const handleOpenModal = (modalType, itemId) => {
        fetchAtividade(itemId);
        setTimeout(() => {
            openModal(modalType, itemId);
        }, (300));
    };
      
    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                {/* <!-- Start coding here --> */}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <Buscar 
                        
                        />
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            { (userInfo && userInfo.tipoUsuario !== 'Comunidade Externa') && (
                                <button 
                                    onClick={() => handleOpenModal('create', 0)}
                                    type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Cadastrar Atividade
                                </button>
                            )}
                            {userInfo && (
                                <button 
                                    onClick={() => handleOpenModal('suggest', 0)}
                                    type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Sugerir Atividade
                                </button>
                            )}
                        </div>
                        <Filtrar 

                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Título da Atividade</th>
                                    <th scope="col" className="px-4 py-3">Modalidade</th>
                                    <th scope="col" className="px-4 py-3">Categoria</th>
                                    <th scope="col" className="px-4 py-3">Data de Inserção</th>
                                    {(userInfo && userInfo.tipoUsuario === 'Servidor') || (pathname === '/minhas-atividades') && (
                                        <th scope="col" className="px-4 py-3">Status</th>
                                    )}
                                    <th scope="col" className="px-4 py-3">
                                        <span className="sr-only">Ações</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { (pathname === '/atividades') && (userInfo.tipoUsuario !== 'Servidor') && (
                                    data.filter(atividade => atividade.status === 'Aceita').map((atividade, i) => (
                                    <tr 
                                        key={i}
                                        className="border-b dark:border-gray-700"
                                    >
                                        <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {atividade.titulo}
                                        </td>
                                        <td className="px-4 py-3">
                                            {atividade.modalidade}
                                        </td>
                                        <td className="px-4 py-3">
                                            {atividade.categoria}
                                        </td>
                                        <td className="px-4 py-3">
                                            {
                                                atividade.updatedAt
                                            }
                                        </td>
                                        {(userInfo && userInfo.tipoUsuario === 'Servidor') && (
                                            <td className="px-4 py-3">
                                                {atividade.status}
                                            </td>
                                        )}
                                        <td className="px-4 py-3 flex items-center justify-end">
                                            <button
                                                onClick={() => handleOpenModal('read', atividade.id)}  
                                                data-modal-show="editUserModal" 
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Ver atividade
                                            </button>
                                        </td>
                                    </tr>
                                )))}
                                { (pathname === '/atividades') && (userInfo.tipoUsuario === 'Servidor') && (
                                    data.map((atividade, i) => (
                                    <tr 
                                        key={i}
                                        className="border-b dark:border-gray-700"
                                    >
                                        <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {atividade.titulo}
                                        </td>
                                        <td className="px-4 py-3">
                                            {atividade.modalidade}
                                        </td>
                                        <td className="px-4 py-3">
                                            {atividade.categoria}
                                        </td>
                                        <td className="px-4 py-3">
                                            {
                                                atividade.updatedAt
                                            }
                                        </td>
                                        {(userInfo && userInfo.tipoUsuario === 'Servidor') && (
                                            <td className="px-4 py-3">
                                                {atividade.status}
                                            </td>
                                        )}
                                        <td className="px-4 py-3 flex items-center justify-end">
                                            <button
                                                onClick={() => handleOpenModal('read', atividade.id)}  
                                                data-modal-show="editUserModal" 
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Ver atividade
                                            </button>
                                        </td>
                                    </tr>
                                )))}
                                {pathname === '/minhas-atividades' && (
                                    data.map((atividade, i) => (
                                    <tr 
                                        key={i}
                                        className="border-b dark:border-gray-700"
                                    >
                                        <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {atividade.titulo}
                                        </td>
                                        <td className="px-4 py-3">
                                            {atividade.modalidade}
                                        </td>
                                        <td className="px-4 py-3">
                                            {atividade.categoria}
                                        </td>
                                        <td className="px-4 py-3">
                                            {
                                                atividade.updatedAt
                                            }
                                        </td>
                                        {(userInfo && userInfo.tipoUsuario === 'Servidor') || (pathname === '/minhas-atividades') && (
                                            <td className="px-4 py-3">
                                                {atividade.status}
                                            </td>
                                        )}
                                        <td className="px-4 py-3 flex items-center justify-end">
                                            <button
                                                onClick={() => handleOpenModal('read', atividade.id)}  
                                                data-modal-show="editUserModal" 
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Ver atividade
                                            </button>
                                        </td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                    <Paginacao />
                </div>
            </div>
        </section>
    )
}