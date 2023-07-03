'use client'
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../../context/user/UserContext';
import { usePathname } from 'next/navigation';
import { format, isValid } from 'date-fns';
import Buscar from '../../Buscar';
import Paginacao from '../../Paginacao';

export default function ListarDemanda({ openModal, data, fetchDemanda, isLoading}) {
    const [filtro, setFiltro] = useState('');
    const dataFiltrada = data.filter((demanda) => {
        const filtroLowerCase = filtro.toLowerCase();
        const tituloLowerCase = demanda.titulo ? demanda.titulo.toLowerCase() : '';
        const tipoDemandaLowerCase = demanda.titulo ? demanda.tipoDemanda.toLowerCase() : '';
        
        return (
            tituloLowerCase.includes(filtroLowerCase) ||
            tipoDemandaLowerCase.includes(filtroLowerCase)
        );
    });
    const listaRenderizada = filtro ? dataFiltrada : data;
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10;

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const itensPaginaAtual = listaRenderizada.slice(indiceInicial, indiceFinal);
  
    const handleProximaPagina = () => {
      setPaginaAtual(paginaAtual + 1);
    };
  
    const handlePaginaAnterior = () => {
      setPaginaAtual(paginaAtual - 1);
    };

    const handlePaginaAtual = (value) => {
        setPaginaAtual(value);
    };

    const handleOpenModal = (modalType, itemId, tipoDemanda) => {
        fetchDemanda(tipoDemanda, itemId);
        setTimeout(() => {
            openModal(modalType, itemId);
        }, (300));
    };

    const handleChangeFiltro = (valor) => {
        setFiltro(valor);
    };

    

    return (
        <>
            {isLoading ? (
                <div>Carregando barra...</div>
            ): (
                <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                <Buscar 
                                    onChangeFiltro={handleChangeFiltro}
                                />
                            </div>
                            <div className="overflow-x-auto min-h-[500px]">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Título da Atividade</th>
                                            <th scope="col" className="px-4 py-3">Tipo</th>
                                            <th scope="col" className="px-4 py-3">Data de inserção</th>
                                            <th scope="col" className="px-4 py-3">Status</th>
                                            <th scope="col" className="px-4 py-3">
                                                <span className="sr-only">Ações</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itensPaginaAtual.length === 0 ? (
                                            <tr className="border-b dark:border-gray-700">
                                                <td colSpan={6} className="text-center px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Não há dados disponíveis.</td>
                                            </tr>
                                        ) : (
                                            itensPaginaAtual.map((demanda, i) => (
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
                                                    {isValid(new Date(demanda.createdAt)) ? format(new Date(demanda.createdAt), 'dd/MM/yyyy') : 'Data inválida'}
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
                                        )))}
                                    </tbody>
                                </table>
                            </div>
                            <Paginacao 
                                paginaAtual={paginaAtual}
                                handlePaginaAtual={handlePaginaAtual}
                                total={listaRenderizada.length}
                                totalPaginas={Math.ceil(listaRenderizada.length / itensPorPagina)}
                                handlePaginaAnterior={handlePaginaAnterior}
                                handleProximaPagina={handleProximaPagina}
                            />
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}