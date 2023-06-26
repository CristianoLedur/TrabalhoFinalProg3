'use client'
import React, { useEffect, useState, useContext } from 'react';
import ListarAtividades from '../../components/Atividades/Listar';
import VerAtividades from '../../components/Atividades/Ver';
import EditarAtividades from '../../components/Atividades/Editar';
import ExcluirAtividades from '../../components/Atividades/Excluir';
import CadastrarAtiviade from '../../components/Atividades/Cadastrar';

export default function Atividades() {
    const [backendData, setBackendData] = useState([{}]);
    const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const CRUD = true;
    const [modalStates, setModalStates] = useState({
        read: false,
        update: false,
        delete: false,
        create: false,
    });
      
    const openModal = (modalType) => {
        setModalStates((prevState) => ({
            ...prevState,
            [modalType]: true,
        }));
    };

    const closeModal = () => {
        setModalStates({});
        setAtividadeSelecionada(null);
    };

    const fetchAtividade = async (itemId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/atividade?id=${itemId}`);
            const data = await response.json();
            setAtividadeSelecionada(data);
        } catch (error) {
            console.log('Ocorreu um erro ao buscar os detalhes da atividade:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        closeModal();
        let email = 'mary%40gmail.com';
        const fetchAtividades = async () => {
            try {
                // pegar pelo localstore ou cookie o EMAIL do usuário
                const res = await fetch(`http://localhost:3001/user?email=${email}`);
                const user = await res.json();
                setBackendData(user[0].atividade);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAtividades();
    }, []);

    return (
        <>
            <ListarAtividades 
                data={backendData}
                modalStates={modalStates}
                openModal={openModal}
                CRUD={CRUD}
                closeModal={closeModal}
                fetchAtividade={fetchAtividade}
                isLoading={isLoading}
            />
            {modalStates.read && (
                <VerAtividades
                    atividadeSelecionada={atividadeSelecionada}
                    closeModal={closeModal}
                />
            )}
            {modalStates.update && (
                <EditarAtividades
                    atividadeSelecionada={atividadeSelecionada}
                    closeModal={closeModal}
                />
            )}
            {modalStates.delete && (
                <ExcluirAtividades 
                    atividadeSelecionada={atividadeSelecionada}
                    closeModal={closeModal}
                />
            )}
            {modalStates.create && (
                <CadastrarAtiviade 
                    closeModal={closeModal}
                />
            )}
        </>
    )
}