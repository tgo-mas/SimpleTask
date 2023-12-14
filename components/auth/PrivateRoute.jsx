import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // Verifica se a página atual não é a página de login antes de redirecionar
        if (router.pathname !== "/auth/login" && router.pathname !== "/auth/cadastro" && router.pathname !== "/") {
          router.push('/');
        }
      }

      setLoading(false);
    });

    // Cleanup do listener ao desmontar o componente
    return () => unsubscribe();
  }, [router]);

  // tgomas: -comentei pq tava dando um erro com div, n sei se era isso..
  // if (loading) {
  //   // Adiciona um indicador de carregamento, se necessário
  //   toast.loading("Verificando usuário", 3000);
  //   return <div>Carregando...</div>;
  // }

  return <>{children}</>;
};

export default PrivateRoute;
