'use client'
import React, { useEffect, useState, useContext } from 'react';
import { getCookie } from "cookies-next";
import { useUserContext } from '../../context/user/UserContext';
import { format } from 'date-fns';
import ListarAtividades from '../../components/Atividades/Listar';
import VerAtividades from '../../components/Atividades/Ver';
import EditarAtividades from '../../components/Atividades/Editar';
import ExcluirAtividades from '../../components/Atividades/Excluir';
import CadastrarAtiviade from '../../components/Atividades/Cadastrar';
import NotFound from '../not-found';

export default function MinhasAtividades() {
    const { userInfo } = useUserContext();
    const token = getCookie('Authorization');
    const email = userInfo.email;
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
            const response = await fetch(`http://localhost:3001/atividade?id=${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setAtividadeSelecionada(data);
        } catch (error) {
            console.log('Ocorreu um erro ao buscar os detalhes da atividade:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        closeModal();
        const fetchAtividades = async () => {
            try {
                const res = await fetch(`http://localhost:3001/user?email=${email}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                const user = await res.json();
                setBackendData(user[0].atividade);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAtividades();
    }, [email]);

    return (
        <>
            {userInfo.tipoUsuario === 'Comunidade Externa' && <NotFound />}
            {userInfo.tipoUsuario !== 'Comunidade Externa' && (
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
                            fetchAtividade={fetchAtividade}
                            openModal={openModal}
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
            )}
        </>
    )
}