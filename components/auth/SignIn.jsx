import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase/firebaseConfig";
import { Button, Container, Form } from "react-bootstrap";
import style from "./formStyle.module.css";
import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [manterLogado, setManterLogado] = useState(false);

    // Verificar se o usuário está mantido logado ao montar o componente
    useEffect(() => {
        const manterLogadoStorage = localStorage.getItem('manterLogado');
        if (manterLogadoStorage) {
            setManterLogado(true);
        }
    }, []);

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log(userCredential);

            // Salvar no localStorage se o usuário deseja permanecer logado
            if (manterLogado) {
                localStorage.setItem('manterLogado', 'true');
            } else {
                localStorage.removeItem('manterLogado');
            }

        }).catch((error) => {
            toast.error(`Um erro ocorreu: ${error.message}`);
        });
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
        } catch (error) {
            toast.error(`Um erro ocorreu: ${error.message}`);
        }
    };

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
                <Form.Check
                    type="checkbox"
                    label="Manter logado"
                    checked={manterLogado}
                    onChange={() => setManterLogado(!manterLogado)}
                />
                <Button type="submit" variant="dark" >Entrar</Button>
                <Button variant="dark" onClick={signInWithGoogle} className={`custom-google-button ${style.customGoogleButton}`}>Entrar com o Google</Button>
            </Form>
        </Container>
    );
}

export default SignIn;
