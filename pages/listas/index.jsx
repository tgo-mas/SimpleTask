import { useEffect, useState, createContext } from 'react';
import { getListas } from "../../firebase/databaseConnection";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import PesquisaVetor from "../../components/search/functions";
import NavBar from "../../components/nav/navbar";
import { auth } from '../../firebase/firebaseConfig';
import { removeLista } from '../../firebase/databaseConnection';

export const ListasContext = createContext();

export default function Listas() {
    const [listasCont, setListasCont] = useState(null);
    const [listas, setListas] = useState(null);
    const [show, setShow] = useState(false);
    const [listaShow, setListaShow] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getListas().then((listas) => {
            const listaFilter = listas.filter(lista => {
                const email = lista.users.arrayValue.values.filter(user => user.stringValue === auth.currentUser.email);
                return email.length > 0;
            });
            setListas(listaFilter);
            setListasCont(listaFilter);
        }).catch(err => console.error(err));
        console.log(listas);
    }, []);

    const showLista = (lista) => {
        setListaShow(lista);
        setShow(true);
    }

    const toggleShow = () => {
        setShow(!show);
    }

    const removerLista = async (listaId) => {
        try {
            
            await removeLista(listaId);

            // Atualize o estado removendo a lista da lista de listas
            setListasCont((prevListas) => prevListas.filter(lista => lista.id !== listaId));
            setListas((prevListas) => prevListas.filter(lista => lista.id !== listaId));

            setShow(false);
        } catch (error) {
            console.error("Erro ao remover a lista:", error);
        }
    }

    return (
        <>
            <NavBar />
            <Container className="p-4 bg-secondary" >
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <h1 className="text-light">Listas</h1>
                    <Button variant="dark" onClick={() => router.push("/listas/nova")} className="button-new">Nova lista</Button>
                </div>
                <hr />
                <ListasContext.Provider value={{ listasCont, setListasCont }}>
                    <PesquisaVetor listas={listas} />
                </ListasContext.Provider>
                {listasCont ?
                    listasCont.map((lista, index) =>
                        <div
                            className="card-lista"
                            key={index}
                            onClick={() => showLista(lista)}
                        >
                            <h4>{lista.nome.stringValue}</h4>
                            <ul>
                                {lista.itens.arrayValue.values.map((item, index) =>
                                    <li key={index}>{`${item.mapValue.fields.qtd.integerValue} ${item.mapValue.fields.nome.stringValue} `}{item.mapValue.fields.check.booleanValue && <i className="bi bi-bag-check-fill"></i>}</li>
                                )}
                            </ul>
                            <Button variant="danger" onClick={(e) => { e.stopPropagation(); removerLista(lista.id); }} > <i className="bi bi-trash"></i>Remover Lista</Button>
                        </div>
                    )
                    : <span>Carregando...</span>}
            </Container>

            {listaShow && <Modal show={show} onHide={toggleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>{listaShow.nome.stringValue}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th>Comprado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaShow.itens.arrayValue.values.map(item =>
                                <tr>
                                    <td>{item.mapValue.fields.nome.stringValue}</td>
                                    <td>{item.mapValue.fields.qtd.integerValue}</td>
                                    <td>{item.mapValue.fields.check.booleanValue && <i className="bi bi-bag-check-fill"></i>}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleShow}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>}
        </>
    );
}