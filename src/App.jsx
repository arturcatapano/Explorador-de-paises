import React, { useState, useEffect } from 'react';
import CountryCard from './components/CountryCard';

function App() {
  // Nossa lista para guardar a lista de países. Começa como um array vazio [].
  const [paises, setPaises] = useState([]);
  // Nova lousa para guardar o texto do campo de busca
  const [termoBusca, setTermoBusca] = useState('');
  // Nova lousa para guardar o valor do filtro de região
  const [regiaoSelecionada, setRegiaoSelecionada] = useState('');

  // Ordem de serviço para buscar os dados
  useEffect(() => {
    // Ligando para o site de países
    fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3')
      .then(response => response.json()) // Quando a resposta chegar, transforme-a em formato JSON
      .then(data => {
        // Quando os dados estiverem prontos, escreva na nossa lousa
        setPaises(data);
      })
      .catch(error => {
        // Se houver algum erro na ligação, mostre no console
        console.error("Erro ao buscar os dados: ", error);
      });
  }, []); // O [] vazio no final significa: "execute esta tarefa apenas uma vez"
;

const paisesFiltrados = paises
  .filter(pais => {
      return regiaoSelecionada ? pais.region === regiaoSelecionada : true;
  })
  .filter(pais => {
    return pais.name.common.toLowerCase().includes(termoBusca.toLowerCase());
  });

return (
    <div>
      <h1>Explorador Global</h1>

      <div className='controles'>
        {/* CORREÇÃO 1: As propriedades do input devem estar dentro da tag */}
        <input
          type="text"
          placeholder="Buscar por um país..."
          value={termoBusca}
          onChange={e => setTermoBusca(e.target.value)}
        />

        {/* CORREÇÃO 2: O 'value' das opções deve ser o texto em inglês que a API retorna */}
        <select
          value={regiaoSelecionada}
          onChange={e => setRegiaoSelecionada(e.target.value)}
        >
          <option value="">Filtrar por Região</option>
          <option value="Africa">África</option>
          <option value="Americas">Américas</option>
          <option value="Asia">Ásia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="lista-paises">
        {/* CORREÇÃO 3: Renderizamos APENAS a lista de paisesFiltrados */}
        {paisesFiltrados.map(pais => (
          <CountryCard key={pais.cca3} pais={pais} />
        ))}
      </div>

    </div>
  );
}

export default App;