import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/EvaluacionADN.css';

const cadenas = [
  `AGTCTAGCGAAGTCTAGCCGAAGTCTTAGCCGAAGTCTAGCGGAAGTCTAGCGAAGTCTTAGCCGAAGTCTAGCGGAAGTCTAGCGAAGTCTTAGCCGAAGTCTAGCGGAAGTCTAGCGA`,
  `TCGATCGTACGTAGCTAGCTGATCGTACTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGC`,
  `GCTAGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGC`
];
export default function Evaluacion() {
  const [archivo, setArchivo] = useState(null);
  const [formato, setFormato] = useState('FASTA');

  const handleArchivoChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const formatearFASTA = (nombre, secuencia, largoLinea = 60) => {
    const bloques = secuencia.match(new RegExp(`.{1,${largoLinea}}`, 'g')) || [];
    return `>${nombre}\n${bloques.join('\n')}`;
  };

  const formatearGenBank = (nombre, secuencia, largoLinea = 60) => {
    const bloques = secuencia.match(new RegExp(`.{1,${largoLinea}}`, 'g')) || [];
    const origin = bloques.map((bloque, i) => {
      const numero = i * largoLinea + 1;
      const espaciado = numero.toString().padStart(9, ' ');
      const conEspacios = bloque.replace(/(.{10})/g, '$1 ').trim();
      return `${espaciado} ${conEspacios.toLowerCase()}`;
    }).join('\n');

    return `LOCUS       ${nombre}        ${secuencia.length} bp    DNA     linear   UNK\nFEATURES             Location/Qualifiers\n     source          1..${secuencia.length}\n                     /organism="Homo sapiens"\nORIGIN\n${origin}\n//`;
  };

  return (
    <div className="evaluacion-container">
      <h1 className="evaluacion-title">Subir Archivo de ADN</h1>

      <div className="evaluacion-form">
        <input
          className="evaluacion-input"
          type="file"
          accept=".fasta,.fa,.gb,.gbk,.txt"
          onChange={handleArchivoChange}
        />
        <small className="archivo-info">
          Archivos permitidos: .fasta, .fa, .gb, .gbk, .txt
        </small>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Formato:</label>
          <select
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            className="evaluacion-input"
          >
            <option value="FASTA">FASTA</option>
            <option value="GenBank">GenBank</option>
          </select>
        </div>

        <button className="evaluacion-button">Comparar</button>
      </div>

      <div className="adn-grid">
        {cadenas.map((cadena, index) => {
          const nombre = `Cadena_${index + 1}`;
          const secuenciaLarga = cadena.repeat(10); // simula cadena larga
          const textoFormateado =
            formato === 'FASTA'
              ? formatearFASTA(nombre, secuenciaLarga)
              : formatearGenBank(nombre, secuenciaLarga);

          return (
            <motion.div
              key={index}
              className="adn-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6, type: 'spring' }}
            >
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Courier New, monospace', fontSize: '0.8rem' }}>
                {textoFormateado}
              </pre>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
