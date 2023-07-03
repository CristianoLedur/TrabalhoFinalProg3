
export default function Home() {
  
  return (
    <div className="bg-white ">
      <div className="isolate">
        <div className="box-home">
          <div className="text-center max-w-[600px] mx-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Conecta IFRS</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">Participe do projeto Conecta IFRS! Atividades gratuitas, eventos culturais, workshops e curso comunitário para crescimento pessoal e contribuição à comunidade. Inscreva-se agora!</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="/login" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Inscreva-se</a>
              <a href="/sobre" className="text-sm font-semibold leading-6 text-gray-900">Saiba mais <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
