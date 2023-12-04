import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { auth } from "../../firebase/firebaseConfig";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        });
    }

  return (
    <div className='sign-in-container'>
        <form onSubmit={signIn}>
            <h1>Login</h1>
            <input 
                type="email" 
                placeholder='Coloque seu email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}

            ></input>
            <input 
                type="password" 
                placeholder='Coloque sua senha' 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            ></input>
            <button type="submit" >Entrar</button>
        </form>
    </div>
  )
}

export default SignIn