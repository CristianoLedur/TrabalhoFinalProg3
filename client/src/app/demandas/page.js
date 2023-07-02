'use client'
import React, { useEffect, useState } from 'react';
import { getCookie } from "cookies-next";
import { useUserContext } from '../../context/user/UserContext';
import ListarDemanda from '../../components/Demanda/Listar';
import VerDemanda from '../../components/Demanda/Ver';
import NotFound from '../not-found';

export default function Demandas() {
    const { userInfo } = useUserContext();
    const token = getCookie('Authorization');
    const [backendData, setBackendData] = useState([{}]);
    const [demandaSelecionada, setDemandaSelecionada] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const CRUD = false;
    const [ modalStates, setModalStates] = useState(false);
      
    const openModal = () => {
        setModalStates(true);
    };

    const closeModal = () => {
        setModalStates(false);
        setDemandaSelecionada(null);
    };

    const fetchDemanda = async (tipoDemanda, itemId) => {
        setIsLoading(true);
        if(tipoDemanda === 'sugerida') {
            var route = 'demanda-sugerida';
        } else {
            var route = 'demanda-solicitada';
        }
        try {
            const response = await fetch(`http://localhost:3001/${route}?id=${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            setDemandaSelecionada(data);
            console.log(demandaSelecionada);
            openModal();
        } catch (error) {
            console.log('Ocorreu um erro ao buscar os detalhes da atividade:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        closeModal();
        const fetchDemandas = async () => {
            try {
                const [solicitadasRes, sugeridasRes] = await Promise.all([
                    fetch('http://localhost:3001/demandas-solicitadas', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }),
                    fetch('http://localhost:3001/demandas-sugeridas', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }),
                ]);
          
                const solicitadasData = await solicitadasRes.json();
                const sugeridasData = await sugeridasRes.json();
          
                const combinedData = {
                  solicitadas: solicitadasData,
                  sugeridas: sugeridasData
                };
               
                let data = combinedData.solicitadas.concat(combinedData.sugeridas);
                setBackendData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDemandas();
    }, []);

    return (
        <>
            {userInfo.tipoUsuario !== 'Servidor' && <NotFound />}
            {userInfo.tipoUsuario === 'Servidor' && (
                isLoading ? (
                    <div>Exibindo barra de loading...</div>
                ) : (
                    <ListarDemanda 
                        data={backendData}
                        modalStates={modalStates}
                        CRUD={CRUD}
                        openModal={openModal}
                        closeModal={closeModal}
                        fetchDemanda={fetchDemanda}
                        isLoading={isLoading}
                    />
                )
            )}
            {userInfo.tipoUsuario === 'Servidor' && (
                modalStates && (
                    isLoading ? (
                        <div>Exibindo barra de loading...</div>
                    ) : (
                        <VerDemanda
                            demandaSelecionada={demandaSelecionada}
                            closeModal={closeModal}
                        />
                    )
                )
            )}
        </>
    )
}