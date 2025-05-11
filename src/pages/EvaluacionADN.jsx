import React, { useState } from 'react';
import '../styles/EvaluacionADN.css'

const cadenas = [
  'AGTCTAGCGA',
  'TCGATCGTAC',
  'GCTAGCTAGC'
];

export default function Evaluacion() {
  const [input, setInput] = useState('');

  return (
    <div className="evaluacion-container">
      <h1 className="evaluacion-title">Comparar Cadena de ADN</h1>

      <div className="evaluacion-form">
        <input
          className="evaluacion-input"
          type="text"
          placeholder="Introduce tu cadena de ADN"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="evaluacion-button">Comparar</button>
      </div>

      <div className="adn-grid">
        {cadenas.map((cadena, index) => (
          <div key={index} className="adn-card">
            <strong>Cadena</strong>
            <div>{cadena}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
