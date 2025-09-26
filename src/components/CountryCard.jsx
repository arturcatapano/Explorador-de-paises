import React from 'react';

// Este é um componente funcional. Ele é uma função que recebe 'props'
// (propriedades) e retorna JSX (o que deve ser desenhado na tela).
// Usamos a desestruturação { pais } para pegar a propriedade 'pais' diretamente.
function CountryCard({ pais }) {
  return (
    // A 'div' principal do nosso card. Podemos dar um estilo a ela depois.
    <div className="country-card">
      
      <img src={pais.flags.svg} alt={`Bandeira do ${pais.name.common}`} />
      
      <div className="card-body">
        <h2>{pais.name.common}</h2>
        <p><strong>População:</strong> {pais.population.toLocaleString('pt-BR')}</p>
        <p><strong>Região:</strong> {pais.region}</p>
        <p><strong>Capital:</strong> {pais.capital}</p>
      </div>

    </div>
  );
}

export default CountryCard;