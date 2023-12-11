import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
// import { useNavigate } from 'react-router-dom';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    // const navigate = useNavigate();
    // Para fazer: redirecionar para página de listas caso o usuário esteja logado.

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                // navigate("/listas");
            } else {
                setAuthUser(null);
            }
        });
            return () => {
                listen();
            }
    }, [])

        const userSignOut = () => {
            signOut(auth).then(() => {
                console.log('usuário desconectou com sucesso')
            }).catch(error => console.log(error))
        }

  return (
    <div>{ authUser ? <><p>{`Conectado como ${authUser.email}`}</p><button onClick={userSignOut}>Sair</button></> : <p>Desconectado</p> }</div>
  )
}

export default AuthDetails;