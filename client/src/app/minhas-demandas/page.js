'use client'
import React, { useEffect, useState, useContext } from 'react';
import ListarDemanda from '../../components/Demanda/Listar';
import VerDemanda from '../../components/Demanda/Ver';
import EditarDemanda from '../../components/Demanda/Editar';
import ExcluirDemanda from '../../components/Demanda/Excluir';

export default function MinhasDemandas() {
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
            const response = await fetch(`http://localhost:3001/${route}?id=${itemId}`);
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
        let email = 'joao%40gmail.com';
        const fetchAtividades = async () => {
            try {
                // pegar pelo localstore ou cookie o EMAIL do usuário
                const res = await fetch(`http://localhost:3001/user?email=${email}`);
                const user = await res.json();
                let data = user[0].solicitada.concat(user[0].sugerida);
                setBackendData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAtividades();
    }, []);

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
                    closeModal={closeModal}
                />
            )}
            {modalStates.update && (
                <EditarDemanda
                    demandaSelecionada={demandaSelecionada}
                    closeModal={closeModal}
                />
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