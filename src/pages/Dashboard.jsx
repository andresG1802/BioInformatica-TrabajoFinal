import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sheet from '../components/Sheet';
import DataCard from '../components/DataCard';
import '../styles/Dashboard.css';

const cadenas = [
  `AGTCTAGCGAAGTCTAGCCGAAGTCTTAGCCGAAGTCTAGCGGAAGTCTAGCGAAGTCTTAGCCGAAGTCTAGCGGAAGTCTAGCGAAGTCTTAGCCGAAGTCTAGCGGAAGTCTAGCGA`,
  `TCGATCGTACGTAGCTAGCTGATCGTACTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGC`,
  `GCTAGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGC`
];

export default function Dashboard() {
  const [activeSheet, setActiveSheet] = useState(null);
  const [title, setTitle] = useState('Análisis');

  const formatearFASTA = (nombre, secuencia, largoLinea = 60) => {
    const bloques = secuencia.match(new RegExp(`.{1,${largoLinea}}`, 'g')) || [];
    return `>${nombre}\n${bloques.join('\n')}`;
  };

  const handleSheetClick = (index) => {
    setActiveSheet(activeSheet === index ? null : index);
  };

  const handleBackdropClick = () => {
    setActiveSheet(null);
  };

  const handleCompare = (cadena) => {
    setTitle(`Análisis ${cadena.substring(0, 5)}`);
  };

  return (
    <div className="dashboard-container" onClick={handleBackdropClick}>
      <h1 className="dashboard-title">{title}</h1>

      <div className="canvas-container">
        <DataCard
          width="250px"
          height="180px"
          position={{ x: '20px', y: '20px' }}
        >
          <h3>Sample Data</h3>
          <p>This is a sample data card that can contain any content</p>
        </DataCard>

        <DataCard
          width="300px"
          height="200px"
          position={{ x: '290px', y: '20px' }}
        >
          <h3>Statistics</h3>
          <div>
            <p>Total Sequences: 3</p>
            <p>Average Length: 120bp</p>
          </div>
        </DataCard>
      </div>

      <motion.div
        className={`backdrop ${activeSheet !== null ? 'active' : ''}`}
        animate={{
          opacity: activeSheet !== null ? 0.5 : 0,
          pointerEvents: activeSheet !== null ? 'auto' : 'none'
        }}
      />

      <div className="sheets-container">
        {cadenas.map((cadena, index) => {
          const nombre = `Cadena_${index + 1}`;
          const secuenciaLarga = cadena.repeat(10);
          const textoFormateado = formatearFASTA(nombre, secuenciaLarga);

          return (
            <Sheet
              key={index}
              index={index}
              isActive={activeSheet === index}
              onClick={() => handleSheetClick(index)}
              onCompare={handleCompare}
              cadena={cadena}
            >
              <pre className="sheet-content">
                {textoFormateado}
              </pre>
            </Sheet>
          );
        })}
      </div>
    </div>
  );
}