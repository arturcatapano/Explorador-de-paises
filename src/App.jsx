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
    <div className="min-h-screen bg-slate-900 font-sans p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Explorador Global
          </h1>
          <p className="text-slate-400 mt-2">
            Descubra dados geográficos e demográficos de todo o mundo.
          </p>
        </header>

        {/* Área de Controles (Busca e Filtro) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          
          <input
            type="text"
            placeholder="Buscar por um país..."
            value={termoBusca}
            onChange={e => setTermoBusca(e.target.value)}
            className="w-full md:w-96 bg-slate-800 text-white px-6 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner transition-all"
          />

          <select
            value={regiaoSelecionada}
            onChange={e => setRegiaoSelecionada(e.target.value)}
            className="w-full md:w-64 bg-slate-800 text-white px-6 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner transition-all appearance-none cursor-pointer"
          >
            <option value="">Todas as Regiões</option>
            <option value="Africa">África</option>
            <option value="Americas">Américas</option>
            <option value="Asia">Ásia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceania</option>
          </select>
          
        </div>

        {/* Grade de Países */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paisesFiltrados.length > 0 ? (
            paisesFiltrados.map(pais => (
              <CountryCard key={pais.cca3} pais={pais} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-400 text-lg">
              Nenhum país encontrado com estes filtros.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;