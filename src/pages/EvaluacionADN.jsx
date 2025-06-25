import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/EvaluacionADN.css';
import Sidebar from '../components/SIdebar';

const cadenas = [
  `AGTCTAGCGAAGTCTAGCCGAAGTCTTAGCCGAAGTCTAGCGGAAGTCTAGCGAAGTCTTAGCCGAAGTCTAGCGGAAGTCTAGCGAAGTCTTAGCCGAAGTCTAGCGGAAGTCTAGCGA`,
  `TCGATCGTACGTAGCTAGCTGATCGTACTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGCTGATCGTACTAGC`,
  `GCTAGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGCGCTAGC`
];
export default function Evaluacion() {
  const [archivo, setArchivo] = useState(null);
  const [formato, setFormato] = useState('FASTA');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleComparar = async () => {
  if (!archivo) {
    alert("Por favor, selecciona un archivo primero.");
    return;
  }

  setLoading(true);
  setResultado(null);

  try {
    // 1. Subir archivo
    const formData = new FormData();
    formData.append("file", archivo);

    const resUpload = await fetch("http://127.0.0.1:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!resUpload.ok) throw new Error("Error al subir archivo");

    // 2. Comparar con E. coli
    const resCompare = await fetch("http://127.0.0.1:5000/api/compare-to-ecoli");
    const data = await resCompare.json();
    setResultado(data.comparaciones || []);
  } catch (error) {
    console.error("Error en comparación:", error);
    alert("Ocurrió un error al comparar.");
  } finally {
    setLoading(false);
  }
};



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
  <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
    {/* Sidebar a la izquierda */}
    <Sidebar />

    {/* Contenido principal a la derecha */}
    <div className="evaluacion-container" style={{ marginLeft: '220px', flexGrow: 1 }}>
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

        {/* <div style={{ marginTop: '1rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Formato:</label>
          <select
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            className="evaluacion-input"
          >
            <option value="FASTA">FASTA</option>
            <option value="GenBank">GenBank</option>
          </select>
        </div> */}

        <button className="evaluacion-button" onClick={handleComparar}>
          {loading ? "Comparando..." : "Comparar"}
        </button>
      </div>

      <div className="adn-grid">
        {resultado
          ? resultado.map((res, index) => (
              <motion.div
                key={index}
                className="adn-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4>{res.archivo_ecoli}</h4>
                {res.error ? (
                  <p className="error">{res.error}</p>
                ) : (
                  <>
                    <p><strong>ID:</strong> {res.id_ecoli}</p>
                    <p><strong>Longitud Query:</strong> {res.longitud_query}</p>
                    <p><strong>Longitud E.coli:</strong> {res.longitud_ecoli}</p>
                    <p><strong>Porcentaje identidad:</strong> {res.porcentaje_identidad}%</p>
                  </>
                )}
              </motion.div>
            ))
          : cadenas.map((cadena, index) => {
              const nombre = `Genoma_${index + 1}`;
              const secuenciaLarga = cadena.repeat(10);
              const textoFormateado =
                formato === "FASTA"
                  ? formatearFASTA(nombre, secuenciaLarga)
                  : formatearGenBank(nombre, secuenciaLarga);

              return (
                <motion.div
                  key={index}
                  className="adn-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <pre style={{ whiteSpace: "pre-wrap", fontFamily: "Courier New, monospace", fontSize: "0.8rem" }}>
                    {textoFormateado}
                  </pre>
                </motion.div>
              );
            })}

      </div>
    </div>
  </div>
);

}
