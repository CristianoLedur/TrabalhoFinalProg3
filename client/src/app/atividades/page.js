'use client'
import React, { useEffect, useState, useContext } from 'react';
import ListarAtividades from '../../components/Atividades/Listar';
import VerAtividades from '../../components/Atividades/Ver';
import EditarAtividades from '../../components/Atividades/Editar';
import ExcluirAtividades from '../../components/Atividades/Excluir';
import CadastrarAtiviade from '../../components/Atividades/Cadastrar';
import SolicitarAtividades from '../../components/Atividades/Solicitar';
import SugerirAtividade from '../../components/Atividades/Sugerir';

export default function Atividades() {
    const [backendData, setBackendData] = useState([]);
    const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
    const [scrollAtivo, setScrollAtivo] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [ solicitandoAtividade, setSolicitandoAtividade ] = useState(false);
    const [modalStates, setModalStates] = useState({
        read: false,
        update: false,
        delete: false,
        create: false,
        suggest: false,
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
        setSolicitandoAtividade(false)
    };

    const handleButtonSugerir = () => {
        setSolicitandoAtividade(!solicitandoAtividade);
    }

    

    const toggleScroll = () => {
        setScrollAtivo(!scrollAtivo);
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
        const fetchAtividades = async () => {
            try {
                const res = await fetch('http://localhost:3001/atividades');
                const atividades = await res.json();
                setBackendData(atividades);
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
                closeModal={closeModal}
                fetchAtividade={fetchAtividade}
                isLoading={isLoading}
            />
            {modalStates.read && (
                <>
                    {solicitandoAtividade ? (
                    <SolicitarAtividades 
                        atividadeSelecionada={atividadeSelecionada}
                        closeModal={closeModal}
                    />
                    ) : (
                    <VerAtividades
                        handleButtonSugerir={handleButtonSugerir}
                        fetchAtividade={fetchAtividade}
                        atividadeSelecionada={atividadeSelecionada}
                        setAtividadeSelecionada={setAtividadeSelecionada}
                        modalStates={modalStates}
                        closeModal={closeModal}
                        openModal={openModal}
                    />
                    )}
                </>
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
            {modalStates.suggest && (
                <SugerirAtividade 
                    closeModal={closeModal}
                />
            )}
        </>
    )
}