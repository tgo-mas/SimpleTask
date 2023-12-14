import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import { setarListas } from "../../firebase/databaseConnection";
import { auth } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

export default function NovaLista() {
    const [item, setItem] = useState({ qtd: 0, nome: '', check: false });
    const [lista, setLista] = useState({ nome: '', prazo: '', user: '', itens: [] });

    const addItem = () => {
        let newItens = lista.itens;
        newItens.push({ ...item, check: false });
        setLista({ nome: lista.nome, prazo: lista.prazo, itens: newItens });
    }

    const removeItem = (it) => {
        let newItens = lista.itens;
        if(it === 0) newItens.shift();
        newItens.splice(it, it);
        setLista({ nome: lista.nome, prazo: lista.prazo, itens: newItens });
    }   

    const SalvarLista = () => {
        const id = auth.currentUser.uid;
        setarListas({ nome: lista.nome, prazo: lista.prazo, itens: lista.itens, user: id }).then(() => {
            toast.success("Lista adicionada com sucesso!");
        }).catch(err => {
            toast.error(`Um erro ocorreu: ${err.message}`); 
        });
    }


    return (
        <Container className="p-4 bg-secondary" style={{ height: "100vh" }}>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h1 className="text-light">Nova lista</h1>
                <Link href="/listas"><IconArrowLeft color="#eee" size={35}/></Link>
            </div>
            <hr />
            <Form className="d-flex flex-column align-items-center">
                <div className="m-md-4 p-md-4 d-flex formPartI">
                    <InputGroup className="ms-4 me-4 input-group">
                        <InputGroup.Text id="nomeLista">
                            Nome
                        </InputGroup.Text>
                        <Form.Control 
                            aria-label="Nome da lista" 
                            aria-labelledby="nomeLista" 
                            onChange={(e) => setLista({ nome: e.target.value, prazo: lista.prazo, itens: lista.itens })} />
                    </InputGroup><InputGroup className="ms-4 me-4 input-group">
                        <InputGroup.Text id="prazo">
                            Prazo
                        </InputGroup.Text>
                        <Form.Control 
                        type="date" 
                        aria-label="Prazo" 
                        aria-labelledby="prazo"
                        onChange={(e) => setLista({ nome: lista.nome, prazo: e.target.value, itens: lista.itens })} />
                    </InputGroup>
                </div>
                <Table className="m-lg-4 tableAddLista">
                    <thead>
                        <tr>
                            <th>Qtd.</th>
                            <th>Nome</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.itens.map((item, index) =>
                            <tr key={index}>
                                <td>{item.qtd}</td>
                                <td>{item.nome}</td>
                                <td><Button onClick={() => removeItem(index)} variant="danger"><i class="bi bi-trash-fill"></i></Button></td>
                            </tr>
                        )}
                        <tr>
                            <td><Form.Control
                                type="number"
                                placeholder="1"
                                id="qtd"
                                onChange={e => setItem({ qtd: e.target.valueAsNumber, nome: item.nome})}
                            /></td>
                            <td><Form.Control
                                placeholder="Nome do item"
                                id="nomeItem"
                                onChange={e => setItem({ nome: e.target.value, qtd: item.qtd })}
                            /></td>
                            <td><Button onClick={addItem} variant="success"><i class="bi bi-bag-plus-fill"></i></Button></td>
                        </tr>
                    </tbody>
                </Table>
                <div className="d-flex justify-content-end">
                    <Button onClick={SalvarLista} variant="success">Salvar</Button>
                </div>
            </Form>
        </Container>
    );

}