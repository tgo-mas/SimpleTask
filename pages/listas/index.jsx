import { useEffect, useState, createContext } from 'react';
import { getListas,updateLista } from "../../firebase/databaseConnection";
import { Button, Container, Modal, Table, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import PesquisaVetor from "../../components/search/functions";
import NavBar from "../../components/nav/navbar";
import { auth } from '../../firebase/firebaseConfig';

export const ListasContext = createContext();

export default function Listas() {
    const [listasCont, setListasCont] = useState(null);
    const [listas, setListas] = useState(null);
    const [show, setShow] = useState(false);
    const [listaShow, setListaShow] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getListas().then((listas) => {
            console.log(listas);
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

    const toggleEditing = (lista) => {
        setListaShow(lista);
        setIsEditing(!isEditing);
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        // Adicione a lógica de atualização da lista no banco de dados
        console.log("Lista atualizada:", listaShow);
        updateLista(listaShow);
        toggleEditing();
    }

    const handleItemEdit = (itemIndex, field, value) => {
        // Atualize o estado de listaShow para refletir a edição do item
        const updatedItems = [...listaShow.itens.arrayValue.values];
        updatedItems[itemIndex].mapValue.fields[field].stringValue = value;
        setListaShow({
            ...listaShow,
            itens: {
                arrayValue: {
                    values: updatedItems,
                },
            },
        });
    };

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
                    listasCont.map((lista, index) => (
                        <div
                            className="card-lista"
                            key={index}
                        >
                            <h4>{lista.nome.stringValue}</h4>
                            {isEditing ? (
                                <Form onSubmit={handleEditSubmit}>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Quantidade</th>
                                                <th>Comprado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lista.itens.arrayValue.values.map((item, itemIndex) => (
                                                <tr key={itemIndex}>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            value={item.mapValue.fields.nome.stringValue}
                                                            onChange={(e) => handleItemEdit(itemIndex, 'nome', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="number"
                                                            value={item.mapValue.fields.qtd.integerValue}
                                                            onChange={(e) => handleItemEdit(itemIndex, 'qtd', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Check
                                                            type="checkbox"
                                                            label="Comprado"
                                                            checked={item.mapValue.fields.check.booleanValue}
                                                            onChange={(e) => handleItemEdit(itemIndex, 'check', e.target.checked)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <Button variant="primary" type="submit">
                                        Salvar Edições
                                    </Button>
                                </Form>
                            ) : (
                                <ul>
                                    {lista.itens.arrayValue.values.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            {`${item.mapValue.fields.qtd.integerValue} ${item.mapValue.fields.nome.stringValue} ${item.mapValue.fields.check.booleanValue && "Comprado"}`}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {isEditing ? (
                                <Button variant="warning" onClick={toggleEditing}>
                                    Cancelar Edição
                                </Button>
                            ) : (
                                <Button variant="warning" onClick={() => toggleEditing(lista)}>
                                    Editar Lista
                                </Button>
                            )}
                            <Button variant="info" onClick={() => showLista(lista)}>Mostrar Detalhes</Button>
                        </div>
                    ))
                    : <span>Carregando...</span>}
                {listaShow && (
                    <Modal show={show} onHide={toggleShow}>
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
                                    {listaShow.itens.arrayValue.values.map((item, itemIndex) => (
                                        <tr key={itemIndex}>
                                            <td>{item.mapValue.fields.nome.stringValue}</td>
                                            <td>{item.mapValue.fields.qtd.integerValue}</td>
                                            <td>{item.mapValue.fields.check.booleanValue && <i className="bi bi-bag-check-fill"></i>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={toggleShow}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </Container>
        </>
    );
}
