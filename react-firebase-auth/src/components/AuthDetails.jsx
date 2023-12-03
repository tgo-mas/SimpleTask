import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
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