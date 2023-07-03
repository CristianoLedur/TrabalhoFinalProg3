export default function Sobre() {
    return ( 
        <div className="bg-white py-20 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Sobre nós</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">IFRS Campus Feliz</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">IFRS Campus Feliz oferece ensino público e gratuito, além de auxiliar, direta e indiretamente, no desenvolvimento da comunidade externa.</p>
                </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 5H14M10 19H14M5 14V10M19 14V10M3 3H7V7H3V3ZM17 3H21V7H17V3ZM3 17H7V21H3V17ZM17 17H21V21H17V17Z" />
                            </svg>
                        </div>
                        Sobre o programa de extensão Conecta
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">Projeto Conecta IFRS: eventos culturais, workshops e curso comunitário gratuitos, promovendo conexões e desenvolvimento de habilidades.</dd>
                </div>
                <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.1471 17.085C17.4861 18.1211 16.5695 18.9696 15.4855 19.5488C14.4016 20.128 13.1868 20.4184 11.9581 20.392C10.811 20.4426 9.67021 20.1982 8.6446 19.682C7.619 19.1659 6.74291 18.3954 6.10008 17.444C3.42108 12.931 6.38708 8.70703 6.98808 7.89603C7.52118 7.33481 7.89576 6.64215 8.07355 5.88879C8.25135 5.13543 8.226 4.34838 8.00008 3.60803C9.28708 4.56103 14.4451 6.82603 13.5371 14.108C15.0371 12.986 16.2431 11.099 16.3901 7.96903C17.8231 9.01703 20.3831 13.363 18.1471 17.085Z" />
                        </svg>
                        </div>
                        Motivação e objetivos do Conecta
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">Oferecer atividades gratuitas para aprendizado, crescimento e troca de conhecimentos. Incentivando o engajamento e a criação de um ambiente inclusivo.</dd>
                </div>
                <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">

                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.00004 12L10 14L16 10M19.586 14.314L20.486 13.414C20.861 13.039 21.0716 12.5304 21.0716 12C21.0716 11.4697 20.861 10.9611 20.486 10.586L19.586 9.68604C19.2109 9.31105 19.0002 8.80243 19 8.27204V7.00004C19 6.46961 18.7893 5.9609 18.4143 5.58583C18.0392 5.21075 17.5305 5.00004 17 5.00004H15.728C15.1977 4.99993 14.689 4.78914 14.314 4.41404L13.414 3.51404C13.039 3.1391 12.5304 2.92847 12 2.92847C11.4697 2.92847 10.9611 3.1391 10.586 3.51404L9.68604 4.41404C9.31105 4.78914 8.80243 4.99993 8.27204 5.00004H7.00004C6.46961 5.00004 5.9609 5.21075 5.58583 5.58583C5.21075 5.9609 5.00004 6.46961 5.00004 7.00004V8.27204C4.99993 8.80243 4.78914 9.31105 4.41404 9.68604L3.51404 10.586C3.1391 10.9611 2.92847 11.4697 2.92847 12C2.92847 12.5304 3.1391 13.039 3.51404 13.414L4.41404 14.314C4.78914 14.689 4.99993 15.1977 5.00004 15.728V17C5.00004 17.5305 5.21075 18.0392 5.58583 18.4143C5.9609 18.7893 6.46961 19 7.00004 19H8.27204C8.80243 19.0002 9.31105 19.2109 9.68604 19.586L10.586 20.486C10.9611 20.861 11.4697 21.0716 12 21.0716C12.5304 21.0716 13.039 20.861 13.414 20.486L14.314 19.586C14.689 19.2109 15.1977 19.0002 15.728 19H17C17.5305 19 18.0392 18.7893 18.4143 18.4143C18.7893 18.0392 19 17.5305 19 17V15.728C19.0002 15.1977 19.2109 14.689 19.586 14.314Z" />
                        </svg>
                    </div>
                    Indicadores de Qualidade
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">O IFRS obtém conceito 4 no IGC, indicador de qualidade da educação superior.</dd>
                </div>
                <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.80599 7.61403L5.55499 7.97603L3.31099 10.219C3.17071 10.3579 3.07207 10.5332 3.02623 10.7252C2.9804 10.9172 2.98919 11.1182 3.05161 11.3055C3.11403 11.4928 3.22759 11.6588 3.37946 11.7849C3.53133 11.911 3.71544 11.9921 3.91099 12.019L6.94699 12.375M16.386 14.194L16.024 18.445L13.781 20.689C13.6419 20.8279 13.467 20.9252 13.2757 20.9702C13.0844 21.0152 12.8844 21.006 12.6981 20.9437C12.5117 20.8814 12.3464 20.7685 12.2206 20.6175C12.0949 20.4666 12.0136 20.2836 11.986 20.089L11.537 17.106M20.724 4.53603C20.671 4.22109 20.5212 3.93048 20.2954 3.70465C20.0695 3.47882 19.7789 3.329 19.464 3.27603C17.646 2.96303 13.944 2.57603 12.285 4.23603C10.405 6.11703 6.42199 13.252 5.18499 15.511C5.07554 15.711 5.0342 15.9411 5.06722 16.1667C5.10023 16.3922 5.20582 16.6009 5.36799 16.761L6.29999 17.7L7.23699 18.636C7.39717 18.7982 7.60581 18.9038 7.83135 18.9368C8.05689 18.9698 8.28704 18.9285 8.48699 18.819C10.746 17.58 17.881 13.597 19.762 11.719C21.422 10.056 21.037 6.35403 20.724 4.53603ZM17.392 8.72303C17.392 9.89112 16.4451 10.838 15.277 10.838C14.1089 10.838 13.162 9.89112 13.162 8.72303C13.162 7.55495 14.1089 6.60803 15.277 6.60803C16.4451 6.60803 17.392 7.55495 17.392 8.72303Z" />
                            </svg>
                        </div>
                        Reconhecimento Internacional
                    </dt>
                <   dd className="mt-2 text-base leading-7 text-gray-600">Pela quarta vez consecutiva em 2022 o IFRS está entre as melhores universidades do mundo no ranking do CWUR.</dd>
                </div>
            </dl>
            </div>
        </div>
    </div>
    )
}