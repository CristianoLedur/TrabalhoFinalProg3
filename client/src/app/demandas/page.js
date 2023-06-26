'use client'
import React, { useEffect, useState, useContext } from 'react';
import ListarDemanda from '../../components/Demanda/Listar';
import VerDemanda from '../../components/Demanda/Ver';

export default function Demandas() {
    const [backendData, setBackendData] = useState([{}]);
    const [demandaSelecionada, setDemandaSelecionada] = useState(null);
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
        const fetchDemandas = async () => {
            try {
                const [solicitadasRes, sugeridasRes] = await Promise.all([
                  fetch('http://localhost:3001/demandas-solicitadas'),
                  fetch('http://localhost:3001/demandas-sugeridas')
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
            }
        };
        fetchDemandas();
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
            {modalStates && (
                <VerDemanda
                    demandaSelecionada={demandaSelecionada}
                    closeModal={closeModal}
                />
            )}
        </>
    )
}