import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // Verifica se a página atual não é a página de login antes de redirecionar
        if (router.pathname !== '/auth/login') {
          router.push('/auth/login');
        }
      }

      setLoading(false);
    });

    // Cleanup do listener ao desmontar o componente
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    // Adiciona um indicador de carregamento, se necessário
    return <div>Carregando...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
