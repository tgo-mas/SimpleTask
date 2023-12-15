import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { auth, provider } from "../../firebase/firebaseConfig";
import { Button, Container, Form } from "react-bootstrap";
import style from "./formStyle.module.css";
import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log(userCredential);
            toast.error("Usuário cadastrado com sucesso!");
        }).catch((error) => {
            toast.error(`Um erro ocorreu: ${error.message}`);
        });
    }

    const signUpWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
        } catch (error) {
            toast.error(`Um erro ocorreu: ${error.message}`);
        }
    };

  return (
    <Container className={style.signInContainer + " m-4"}>
        <Form onSubmit={signUp} className="m-4">
            <h1 className="m-4 text-center">Criar Conta</h1>
            <Form.Control 
                type="email" 
                placeholder='Coloque seu email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
            <Form.Control 
                type="password" 
                placeholder='Coloque sua senha' 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="mt-4 mb-4"
            ></Form.Control>
            <Button type="submit" variant="dark" >Criar</Button>
            <Button variant="dark" onClick={signUpWithGoogle} className={`custom-google-button ${style.customGoogleButton}`}>Criar conta com o Google</Button>
        </Form>
        
    </Container>
  )
}

export default SignUp;