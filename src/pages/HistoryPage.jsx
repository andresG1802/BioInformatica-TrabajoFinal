// src/pages/HistoryPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/HistoryPage.css";
import Sidebar from "../components/SIdebar"; // 👈 Nuevo

export default function HistoryPage() {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/history");
        const data = await res.json();
        setHistorial(data);
      } catch (err) {
        console.error("Error al cargar historial:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <motion.div
        className="history-container"
        style={{ marginLeft: "220px", flexGrow: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>Historial de Comparaciones</h1>

        {loading ? (
          <p>Cargando historial...</p>
        ) : historial.length === 0 ? (
          <p>No hay comparaciones registradas aún.</p>
        ) : (
          <motion.div
            className="history-list"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {historial.map((item, idx) => (
              <motion.div
                className="history-card"
                key={idx}
                whileHover={{ scale: 1.02 }}
              >
                <p><strong>Archivo subido:</strong> {item.archivo_subido}</p>
                <p><strong>Comparado con:</strong> {item.archivo_ecoli}</p>
                <p><strong>Identidad:</strong> {item.porcentaje_identidad}%</p>
                <p><strong>Fecha:</strong> {new Date(item.fecha).toLocaleString()}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
