import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { auth } from "../../firebaseConfig";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        });
    }

  return (
    <div className='sign-in-container'>
        <form onSubmit={signUp}>
            <h1>Criar Conta</h1>
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
            <button type="submit" >Criar</button>
        </form>
    </div>
  )
}

export default SignUp