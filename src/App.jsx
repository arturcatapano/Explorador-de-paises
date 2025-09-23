import React, { useState, useEffect } from 'react';

function App() {
  // Nossa lista para guardar a lista de países. Começa como um array vazio [].
  const [paises, setPaises] = useState([]);

  // Ordem de serviço para buscar os dados
  useEffect(() => {
    // Ligando para o site de países
    fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3')
      .then(response => response.json()) // Quando a resposta chegar, transforme-a em formato JSON
      .then(data => {
        console.log(data);
        // Quando os dados estiverem prontos, escreva na nossa lousa
        setPaises(data);
      })
      .catch(error => {
        // Se houver algum erro na ligação, mostre no console
        console.error("Erro ao buscar os dados: ", error);
      });
  }, []); // O [] vazio no final significa: "execute esta tarefa apenas uma vez"
;

return (
    <div>
      <h1>Explorador Global</h1>
      
      <div className="lista-paises">
        {/* Usando a "linha de montagem" .map() para criar um elemento para cada país */}
        {paises.map(pais => (
          <div key={pais.cca3}>
            <h2>{pais.name.common}</h2>
            <img src={pais.flags.svg} alt={`Bandeira do ${pais.name.common}`} width="100" />
            <p>População: {pais.population}</p>
            <p>Região: {pais.region}</p>
            <p>Capital: {pais.capital}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default App;