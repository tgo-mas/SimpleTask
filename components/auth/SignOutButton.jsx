import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const SignOutButton = ({ onSignOut }) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuário desconectou com sucesso');
        onSignOut();
      })
      .catch((error) => console.log(error));
  };

  return <button onClick={handleSignOut}>Sair</button>;
};

export default SignOutButton;
