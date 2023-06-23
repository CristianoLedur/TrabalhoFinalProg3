export default function Profile({isAuthenticated}) {
    if (!isAuthenticated) {
        // Redireciona o usuário para a página de login
        router.push('/login');
        return null;
    }
    return (
        <h1>
            Teste
        </h1>
    )
}