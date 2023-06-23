export default function MinhasDemandas({isAuthenticated}) {
    if (!isAuthenticated) {
        // Redireciona o usuário para a página de login
        router.push('/login');
        return null;
    }
    return ( 
        <>
            <h1>Minhas Demandas</h1>
        </>
    )
}