'use client'
import SingIn from '../../components/SingIn/index';
import SingUp from '../../components/SingUp/index';
import { useState } from 'react';
import { useUserContext } from '../../context/user/UserContext';


export default function Login() {
    const [ status, setState ] = useState(true);
    const { userInfo } = useUserContext();
    
    function changeStatus() {
        setState(!status);
    }

    const handleDestroySession = async () => {
        const token = getCookie('Authorization');
        try {
            const response = await fetch(`http://localhost:3001/logout`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });

            if (response.ok) {
                deleteCookie('Authorization');
                sessionStorage.removeItem('user');
                router.push('/');
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            } else {
                
                console.log(data.error);
            } 
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {!userInfo ? (
                status 
                ? <SingIn 
                    ToggleCompLogin={changeStatus}
                /> 
                : <SingUp 
                    ToggleCompLogin={changeStatus}
                />
            ) : (
                <div className="relative box-logout">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Confirmar
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Você já está autenticado como {userInfo.nome}. Você precisa sair para então acessar como outro usuário.
                            </p>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={handleDestroySession} data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sair</button>
                            <a href='/' className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
  