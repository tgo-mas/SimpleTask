import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { useRouter } from 'next/router';


const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        router.push("/listas");
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('usuário desconectou com sucesso');
      })
      .catch((error) => console.log(error));
  };

  /*return (
    <div>
      {authUser ? (
        <>
          <p>{`Conectado como ${authUser.email}`}</p>
          <SignOutButton onSignOut={userSignOut} />
        </>
      ) : (
        <p>Desconectado</p>
      )}
    </div>
  );*/


};

export default AuthDetails;