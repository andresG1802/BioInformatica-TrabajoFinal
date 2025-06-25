// src/pages/ExportPage.jsx
import React from "react";
import { motion } from "framer-motion";
import "../styles/ExportPage.css";
import Sidebar from "../components/SIdebar";

export default function ExportPage() {
  const [status, setStatus] = React.useState(null);

  const handleExport = async () => {
    setStatus("Generando CSV...");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/ecoli/history/csv");

      if (!res.ok) {
        setStatus("No se pudo generar el CSV.");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ecoli_history.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setStatus("✅ CSV descargado correctamente.");
    } catch (err) {
      console.error("Error al exportar:", err);
      setStatus("❌ Error al exportar.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <motion.div
        className="export-container"
        style={{ marginLeft: "220px", flexGrow: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>Exportar Genomas a CSV</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="export-button"
          onClick={handleExport}
        >
          Descargar CSV
        </motion.button>

        {status && <p>{status}</p>}
      </motion.div>
    </div>
  );
}
