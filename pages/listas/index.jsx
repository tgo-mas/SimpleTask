import { useEffect, useState, createContext } from 'react';
import { getListas, updateLista } from "../../firebase/databaseConnection";
import { Button, Container, Modal, Table, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import PesquisaVetor from "../../components/search/functions";
import NavBar from "../../components/nav/navbar";
import { IconShoppingBagCheck } from '@tabler/icons-react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { auth } from '../../firebase/firebaseConfig';

export const ListasContext = createContext();

export default function Listas() {
    const [listasCont, setListasCont] = useState(null);
    const [listas, setListas] = useState(null);
    const [show, setShow] = useState(false);
    const [listaShow, setListaShow] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchListas();
    }, []);

    const fetchListas = () => {
        getListas().then((listas) => {
            const listaFilter = listas.filter(lista => {
                const email = lista.users.arrayValue.values.filter(user => user.stringValue === auth.currentUser.email);
                return email.length > 0;
            });
            setListas(listaFilter);
            setListasCont(listaFilter);
        }).catch(err => console.log(err.message));
    }

    const showLista = (lista) => {
        setListaShow(lista);
        setShow(true);
    }

    const toggleShow = () => {
        setShow(!show);
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        toggleShow();
        fetchListas();
        // Lógica de atualização da lista no banco de dados
        console.log("Lista atualizada:", listaShow);
        updateLista(listaShow).then(res => toast.success("Lista atualizada com sucesso!"))
            .catch(err => toast.error("Um erro ocorreu: " + err.message));
    }

    const handleItemEdit = (itemIndex, field, value) => {
        // Atualize o estado de listaShow para refletir a edição do item
        const updatedItems = [...listaShow.itens.arrayValue.values];
        if (field === 'check') {
            updatedItems[itemIndex].mapValue.fields[field].booleanValue = value;
        } else {
            updatedItems[itemIndex].mapValue.fields[field].stringValue = value;
        }

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
                            onClick={() => showLista(lista)}
                        >
                            <div className='d-flex gap-2 align-items-bottom'>
                                <h4>{lista.nome.stringValue}</h4>
                                <p className='lead fs-5'> até {lista.prazo.stringValue}</p>
                            </div>
                            <ul>
                                {lista.itens.arrayValue.values[0].mapValue ? lista.itens.arrayValue.values.map((item, itemIndex) => (
                                    <li key={itemIndex} className={item.mapValue?.fields.check.booleanValue && "cross"}>
                                        {`${item.mapValue?.fields.qtd.stringValue} ${item.mapValue?.fields.nome.stringValue} `}{item.mapValue?.fields.check.booleanValue ? <IconShoppingBagCheck size={20}/> : ''}
                                    </li>
                                )) : <LoaderIcon size={600} />}
                            </ul>
                        </div>
                    ))
                    : <LoaderIcon size={1000} />}
                {listaShow && (
                    <Modal show={show} onHide={toggleShow}>
                        <Modal.Header closeButton>
                            <Modal.Title>{listaShow?.nome.stringValue}</Modal.Title>
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
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={item.mapValue ? item.mapValue.fields.nome.stringValue : item.nome.stringValue}
                                                    onChange={(e) => handleItemEdit(itemIndex, 'nome', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="number"
                                                    value={item.mapValue ? item.mapValue.fields.qtd.stringValue : item.qtd.stringValue}
                                                    onChange={(e) => handleItemEdit(itemIndex, 'qtd', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Comprado"
                                                    checked={item.mapValue ? item.mapValue.fields.check.booleanValue : item.check.booleanValue}
                                                    onChange={(e) => handleItemEdit(itemIndex, 'check', e.target.checked)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleEditSubmit}>
                                Salvar
                            </Button>
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
