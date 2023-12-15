import React, { useState, useContext } from 'react';
import style from "./searchStyle.module.css";
import { ListasContext } from '../../pages/listas';
import { Button, Form } from 'react-bootstrap';

const PesquisaVetor = (props) => {
  const { listas } = props;
  const listasContext = useContext(ListasContext);
  const { listasCont, setListasCont } = listasContext;
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);
  const [erro, setErro] = useState('');

  const handlePesquisa = () => {
    const resultadosFiltrados = listas.filter(item =>
      item.nome.stringValue.toLowerCase().includes(termoPesquisa.toLowerCase()));

    if (!resultadosFiltrados.length) {
      setErro('Nenhum resultado encontrado.');
    } else {
      setErro('');
    }

    setListasCont(resultadosFiltrados);

  };

  return (
    <Form className={style.search}>
      <span className="lead text-light">Pesquisar lista pelo nome</span>
      <div className='App-logo'>

        <Form.Control
          type="text"
          placeholder="Digite para pesquisar"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
        />
        <Button variant="dark" onClick={handlePesquisa}>Pesquisar</Button>

        {erro && <p>{erro}</p>}
      </div>
    </Form>
  );
};

export default PesquisaVetor;