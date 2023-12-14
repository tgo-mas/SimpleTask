import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { IconLogout } from '@tabler/icons-react';

const SignOutButton = ({ onSignOut }) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuário desconectou com sucesso');
        onSignOut();
      })
      .catch((error) => console.log(error));
  };

  return <IconLogout className=" me-4" style={{cursor: "pointer", color: '#202d4f'}} onClick={handleSignOut} />;
};

export default SignOutButton;
