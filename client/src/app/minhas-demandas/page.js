'use client';
import React, { useEffect, useState } from 'react';
import { getCookie } from "cookies-next";
import { useUserContext } from '../../context/user/UserContext';
import ListarDemanda from '../../components/Demanda/Listar';
import VerDemanda from '../../components/Demanda/Ver';
import EditarSolicitada from '../../components/Demanda/EditarSolicitada';
import EditarSugerida from '../../components/Demanda/EditarSugerida';
import ExcluirDemanda from '../../components/Demanda/Excluir';

export default function MinhasDemandas() {
    const { userInfo } = useUserContext();
    const token = getCookie('Authorization');
    const email = userInfo.email;
    const [backendData, setBackendData] = useState([{}]);
    const [demandaSelecionada, setDemandaSelecionada] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const CRUD = true;
    const [modalStates, setModalStates] = useState({
        read: false,
        update: false,
        delete: false,
    });
      
    const openModal = (modalType) => {
        setModalStates((prevState) => ({
            ...prevState,
            [modalType]: true,
        }));
    };

    const closeModal = () => {
        setModalStates({});
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
            setDemandaSelecionada(data);
            openModal();
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
                const res = await fetch(`http://localhost:3001/user?email=${email}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const user = await res.json();
                let data = user[0].solicitada.concat(user[0].sugerida);
                setBackendData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAtividades();
    }, [email]);

    return (
        <>
            <ListarDemanda 
                data={backendData}
                modalStates={modalStates}
                CRUD={CRUD}
                openModal={openModal}
                closeModal={closeModal}
                fetchDemanda={fetchDemanda}
                isLoading={isLoading}
            />
            {modalStates.read && (
                <VerDemanda
                    demandaSelecionada={demandaSelecionada}
                    fetchDemanda={fetchDemanda}
                    closeModal={closeModal}
                    openModal={openModal}
                />
            )}
            {modalStates.update && (
                demandaSelecionada.tipoDemanda === 'sugerida' ? (
                    <EditarSugerida
                        demandaSelecionada={demandaSelecionada}
                        closeModal={closeModal}
                    />
                ) : (
                    <EditarSolicitada
                        demandaSelecionada={demandaSelecionada}
                        closeModal={closeModal}
                    />
                )
            )}
            {modalStates.delete && (
                <ExcluirDemanda 
                    demandaSelecionada={demandaSelecionada}
                    closeModal={closeModal}
                />
            )}
        </>
    )
}