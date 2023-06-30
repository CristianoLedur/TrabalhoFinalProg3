'use client';
import React, {useState, useEffect} from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    passwordAntiga: Yup.string().min(6, 'A senha antiga deve ter pelo menos 6 caracteres').required('Campo obrigatório'),
    password: Yup.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres').required('Campo obrigatório'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas não correspondem').required('Campo obrigatório'),
});

export default function AlterarSenha({ closeModal, usuarioSelecionado}) {
    
    return (
        <>
            <div id="updateProductModal" tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-gray-700/50">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Alterar Senha
                            </h3>
                            <button 
                                onClick={closeModal}
                                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form 
                            className="space-y-4 md:space-y-6" 
                            action="POST"
                            onSubmit={handleSubmit(handleSubmitData)}
                        >
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                
                                <div>
                                    <label 
                                        htmlFor="passwordAntiga" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Senha antiga
                                    </label>
                                    <input 
                                        type="password" 
                                        name="passwordAntiga" 
                                        id="passwordAntiga" 
                                        { ...register('passwordAntiga')}
                                        placeholder="••••••••" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required="" 
                                    />
                                    {errors.passwordAntiga && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.passwordAntiga.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label 
                                        htmlFor="password" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nova senha
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        { ...register('password')}
                                        placeholder="••••••••" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required="" 
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label 
                                        htmlFor="confirm-password" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirmar nova senha
                                    </label>
                                    <input 
                                        type="password" 
                                        name="confirm-password" 
                                        id="confirm-password" 
                                        placeholder="••••••••"
                                        { ...register('confirmPassword')}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required="" 
                                    />
                                    {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.confirmPassword.message}</p>
                                    )}
                                </div>
                                
                            </div>    
                            <div className="flex items-center space-x-4">
                                <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Alterar senha
                                </button>
                                <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}