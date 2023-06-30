'use client';
export default function CardUser({closeModal, usuarioSelecionado}) {
    return (
        <div id="defaultModal" tabindex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-gray-700/50">
            <div className="w-full relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-end px-4 pt-4">
                    <button 
                        onClick={closeModal}
                        type="button" className="absolute text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                
                <div className="flex flex-col ml-4 items-left pb-10">
                    
                    <h5 className="mb-2 text-2xl font-medium text-gray-900 dark:text-white">{usuarioSelecionado.nome}</h5>
                    {usuarioSelecionado.status === 'online' ? (
                        <span class=" mb-2 bg-green-100 text-green-800 text-xs w-14 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{usuarioSelecionado.status}</span>
                    ) : (
                        <span class="mb-2 bg-red-100 text-red-800 text-xs w-14 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{usuarioSelecionado.status}</span>
                    )}
                
                    <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Email: {usuarioSelecionado.email}</h3>
                    <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white"> Cidade: {usuarioSelecionado.cidade.nome}</h3>
                    <span className="text-lg text-center text-gray-500 pt-2 dark:text-gray-400">{usuarioSelecionado.tipoUsuario}</span>
                </div>
            </div>
        </div>
    )
}