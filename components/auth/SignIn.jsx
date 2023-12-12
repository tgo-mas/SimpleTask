import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase/firebaseConfig";
import { Button, Container, Form } from "react-bootstrap";
import style from "./formStyle.module.css";

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
    <Container className={style.signInContainer + " m-4"}>
        <Form onSubmit={signIn} className="m-4">
            <h1 className="m-4 text-center">Login</h1>
            <Form.Control
                type="email" 
                placeholder='Coloque seu email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=""
            ></Form.Control>
            <Form.Control 
                type="password" 
                placeholder='Coloque sua senha' 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="mt-4 mb-4"
            ></Form.Control>
            <Button type="submit" variant="dark" >Entrar</Button>
        </Form>
    </Container>
  )
}

export default SignIn