// src/pages/ExportPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/ExportPage.css";

export default function ExportPage() {
  const [link, setLink] = useState(null);
  const [status, setStatus] = useState(null);

  const handleExport = async () => {
    setStatus("Generando Excel...");
    try {
      const res = await fetch("http://127.0.0.1:5000/api/ecoli/export/xlsx");
      const data = await res.json();
      if (data.ruta) {
        const downloadLink = `http://127.0.0.1:5000/${data.ruta}`;
        setLink(downloadLink);
        setStatus("Archivo listo para descargar");
      } else {
        setStatus("No se pudo generar el archivo.");
      }
    } catch (err) {
      setStatus("Error al exportar.");
      console.error(err);
    }
  };

  return (
    <motion.div
      className="export-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Exportar Genomas a Excel</h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        className="export-button"
        onClick={handleExport}
      >
        Generar Excel
      </motion.button>

      {status && <p>{status}</p>}

      {link && (
        <motion.a
          href={link}
          className="download-link"
          download
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Descargar Excel
        </motion.a>
      )}
    </motion.div>
  );
}
