import React, { useState } from 'react';




const PesquisaVetor = () => {
  const [itens] = useState(['Casa 1', 'Ferreirinha BSI', 'Casa do rato', 'Residência pedagógica','Maia BSI','Residência VASP']);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);
  const [erro, setErro] = useState('');
  

  const handlePesquisa = () => {
    const termoPesquisaLowerCase = termoPesquisa.toLowerCase();

    const resultadosFiltrados = itens.filter(item =>
      item.toLowerCase().includes(termoPesquisa.toLowerCase()));
    
    if (!resultadosFiltrados.length) {
      setErro('Nenhum resultado encontrado.');
    } else {
      setErro('');
    }

    setResultados(resultadosFiltrados);
    // setResultados([]);
    // setErro('');
  };



  return (
    <div className='App'>
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
            <li key={index}>{resultado}</li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default PesquisaVetor;