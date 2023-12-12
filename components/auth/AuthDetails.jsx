import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import SignOutButton from './SignOutButton';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    setAuthUser(null); 
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Conectado como ${authUser.email}`}</p>
          <SignOutButton onSignOut={handleSignOut} />
        </>
      ) : (
        <p>Desconectado</p>
      )}
    </div>
  );
};

export default AuthDetails;
