'use client'
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../../context/user/UserContext';
import { usePathname } from 'next/navigation';
import Buscar from '../../Buscar';
import Filtrar from '../../Filtrar';
import Paginacao from '../../Paginacao';

export default function ListarDemanda({ openModal, data, fetchDemanda }) {
    const [buttonAcaoOpen, setButtonAcaoOpen] = useState([]);
    const { userInfo } = useUserContext();
    const pathname = usePathname();

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
                                        <span className="sr-only">Ações</span>
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
                                            {demanda.updatedAt}
                                        </td>
                                        <td className="px-4 py-3">
                                            {demanda.status}
                                        </td>
                                        <td className="px-4 py-3 flex items-center justify-end">
                                            <button
                                                onClick={() => handleOpenModal('read', demanda.id, demanda.tipoDemanda)}  
                                                data-modal-show="editUserModal" 
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Ver demanda
                                            </button>
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