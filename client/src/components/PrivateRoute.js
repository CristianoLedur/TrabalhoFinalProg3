import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/user/UserContext';

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  // Verifica se o usuário está autenticado ao acessar a página
  if (!isAuthenticated) {
    // Redireciona o usuário para a página de login
    router.push('/login');
    return null;
  }

  // Renderiza as rotas protegidas para usuários autenticados
  return children;
}
