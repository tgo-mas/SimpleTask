import React, { useState } from 'react';

const PesquisaVetor = (props) => {
  const { itens, setItens } = props;
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);
  const [erro, setErro] = useState('');

  const handlePesquisa = () => {
    const termoPesquisaLowerCase = termoPesquisa.toLowerCase();

    const resultadosFiltrados = itens.filter(item =>
      item.nome.stringValue.toLowerCase().includes(termoPesquisa.toLowerCase()));

    if (!resultadosFiltrados.length) {
      setErro('Nenhum resultado encontrado.');
    } else {
      setErro('');
    }

    setResultados(resultadosFiltrados);

  };

  return (
    <div className='search'>
      <span className="lead">Pesquisar lista pelo nome</span>
      <div className='App-logo'>

        <input
          type="text"
          placeholder="Digite para pesquisar"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
        />
        <button onClick={handlePesquisa}>Pesquisar</button>

        {erro && <p>{erro}</p>}

        {resultados.length > 0 && (
          <ul>
            {resultados.map((resultado, index) => (
              <li key={index}>{resultado.nome.stringValue}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PesquisaVetor;