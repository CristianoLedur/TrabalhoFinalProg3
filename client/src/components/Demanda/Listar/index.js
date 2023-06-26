'use client'
import React, { useEffect, useState } from 'react';
import Buscar from '../../Buscar';
import Filtrar from '../../Filtrar';
import Paginacao from '../../Paginacao';

export default function ListarDemanda({ openModal, data, fetchDemanda, CRUD }) {
    const [buttonAcaoOpen, setButtonAcaoOpen] = useState([]);

    const handleButtonAcao = (index) => {
        const updatedButtonAcaoOpen = [...buttonAcaoOpen];
        updatedButtonAcaoOpen[index] = !updatedButtonAcaoOpen[index];
        setButtonAcaoOpen(updatedButtonAcaoOpen);
    };
    const handleOpenModal = (modalType, itemId, tipoDemanda) => {
        fetchDemanda(tipoDemanda, itemId);
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
                        <Buscar />
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Filtrar />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Título da Atividade</th>
                                    <th scope="col" className="px-4 py-3">Tipo</th>
                                    <th scope="col" className="px-4 py-3">Última Alteração</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                    <th scope="col" className="px-4 py-3">
                                        <span className="sr-only"></span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((demanda, i) => (
                                    <tr 
                                        key={i}
                                        className="border-b dark:border-gray-700"
                                    >
                                        <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {demanda.titulo}
                                        </td>
                                        <td className="px-4 py-3">
                                            {demanda.tipoDemanda}
                                        </td>
                                        <td className="px-4 py-3">
                                            {
                                                demanda.updatedAt
                                            }
                                        </td>
                                        <td className="px-4 py-3">
                                            {demanda.status}
                                        </td>
                                        <td className="px-4 py-3 flex items-center justify-end">
                                            {CRUD ? (
                                                <>
                                                    <button 
                                                        onClick={() => handleButtonAcao(i)}
                                                        id="apple-imac-27-dropdown-button" 
                                                        data-dropdown-toggle="apple-imac-27-dropdown" 
                                                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" 
                                                        type="button"
                                                    >
                                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        </svg>
                                                    </button>
                                                    <div 
                                                        id="apple-imac-27-dropdown" 
                                                        className={buttonAcaoOpen[i] 
                                                        ? "z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                        : "hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                    }>
                                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                            <li>
                                                                
                                                                <button 
                                                                    onClick={() => handleOpenModal('read', demanda.id, demanda.tipoDemanda)}
                                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                >
                                                                    Ver
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button 
                                                                    onClick={() => handleOpenModal('update', demanda.id, demanda.tipoDemanda)}
                                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                >
                                                                    Editar
                                                                </button>
                                                            </li>
                                                        </ul>
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => handleOpenModal('delete', demanda.id, demanda.tipoDemanda)}
                                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                Excluir
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleOpenModal('read', demanda.id, demanda.tipoDemanda)}  
                                                    data-modal-show="editUserModal" 
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Ver demanda
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Paginacao />
                </div>
            </div>
        </section>
    )
}