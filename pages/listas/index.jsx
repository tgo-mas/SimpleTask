import { fetcher } from "../../firebase/util";
import useSWR from "swr";
import { useEffect, useState } from 'react';
import { getListas } from "../../firebase/databaseConnection";
import { Button, Container, Modal } from "react-bootstrap";

export default function Listas() {
    const [listas, setListas] = useState(null);
    const [show, setShow] = useState(false);
    const [listaShow, setListaShow] = useState(null);

    useEffect(() => {
        getListas().then((listas) => setListas(listas))
            .catch(err => console.error(err));
        console.log(listas);
    }, []);

    const showLista = (lista) => {
        setListaShow(lista);
        setShow(true);
    }

    const toggleShow = () => {
        setShow(!show);
    }

    return (
        <>
            {/* <Navbar page="Listas" /> */}
            <Container className="p-4 bg-secondary">
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <h1 className="text-light">Listas</h1>
                    <Button variant="dark" className="button-new">Nova lista</Button>
                </div>
                {listas ?
                    listas.map((lista, index) =>
                        <div
                            className="card-lista"
                            key={index}
                            onClick={() => showLista(lista)}
                        ><h4>{lista.nome.stringValue}</h4></div>
                    )
                    : <span>Carregando...</span>}
            </Container>

            {listaShow && <Modal show={show} onHide={toggleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>{listaShow.nome.stringValue}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {listaShow.itens.arrayValue.values.map(item => <h5>{item.mapValue.fields.nome.stringValue}</h5>)}
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