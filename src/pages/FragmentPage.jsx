// src/pages/FragmentPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/FragmentPage.css";
import SideBarRightHistorial from "../components/SideBarRightHistorial";

export default function FragmentPage() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [fragment, setFragment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/ecoli/list");
        const data = await res.json();
        const filenames = data.genomas.map((g) => g.archivo);
        setFiles(filenames);
      } catch (e) {
        setFiles([]);
      }
    };

    fetchFiles();
  }, []);

  const handleSubmit = async () => {
    if (!selectedFile || !start || !end) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError(null);

    const url = `http://127.0.0.1:5000/api/ecoli/fragment?file=${selectedFile}&start=${start}&end=${end}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.fragmento) {
        setFragment(data.fragmento);
      } else {
        setError(data.error || "No se pudo obtener el fragmento.");
      }
    } catch (err) {
      setError("Error al obtener fragmento.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBarRightHistorial />

      <motion.div
        className="fragment-container"
        style={{ marginLeft: "220px", flexGrow: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>Visualizar Fragmento Genómico</h1>

        <div className="form">
          <label>Archivo genómico:</label>
          <select value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
            <option value="">-- Selecciona un archivo --</option>
            {files.map((f, idx) => (
              <option key={idx} value={f}>{f}</option>
            ))}
          </select>

          <label>Posición inicial:</label>
          <input type="number" value={start} onChange={(e) => setStart(e.target.value)} />

          <label>Posición final:</label>
          <input type="number" value={end} onChange={(e) => setEnd(e.target.value)} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn-submit"
            onClick={handleSubmit}
          >
            Obtener Fragmento
          </motion.button>
        </div>

        {error && <p className="error-msg">❌ {error}</p>}

        {fragment && (
          <motion.div
            className="fragment-output"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3>Fragmento:</h3>
            <pre>{fragment}</pre>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
