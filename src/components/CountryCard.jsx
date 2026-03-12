import React from 'react';

// Mantivemos a sua estrutura impecável, apenas vestimos com o Tailwind!
function CountryCard({ pais }) {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300 border border-slate-700 cursor-pointer flex flex-col h-full">
      
      {/* Área da Bandeira - Mantendo o seu SVG de alta qualidade! */}
      <div className="h-48 overflow-hidden relative border-b border-slate-700/50">
        <img 
          src={pais.flags.svg} 
          alt={`Bandeira do ${pais.name.common}`} 
          className="w-full h-full object-cover" 
        />
        {/* Este gradiente cria uma transição suave da imagem para a cor do cartão */}
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-800 to-transparent"></div>
      </div>

      {/* Área de Informações */}
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-6 tracking-wide truncate" title={pais.name.common}>
          {pais.name.common}
        </h2>
        
        <div className="space-y-3 text-sm text-slate-300 mt-auto">
          <p className="flex justify-between border-b border-slate-700/50 pb-2">
            <span className="font-medium text-slate-400">População:</span> 
            {/* A sua formatação pt-BR perfeita */}
            <span className="font-mono text-white">{pais.population.toLocaleString('pt-BR')}</span>
          </p>
          <p className="flex justify-between border-b border-slate-700/50 pb-2">
            <span className="font-medium text-slate-400">Região:</span> 
            <span className="text-white">{pais.region}</span>
          </p>
          <p className="flex justify-between pt-1">
            <span className="font-medium text-slate-400">Capital:</span> 
            {/* Tratamento de segurança: alguns países (como a Antártida) não têm capital, e outros (como a África do Sul) têm mais de uma! */}
            <span className="text-white text-right ml-4">
              {pais.capital ? pais.capital.join(', ') : 'N/A'}
            </span>
          </p>
        </div>
      </div>

    </div>
  );
}

export default CountryCard;