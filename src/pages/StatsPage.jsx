// src/pages/StatsPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/StatsPage.css";

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/ecoli/stats-pandas");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error al cargar estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <motion.div
      className="stats-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Estadísticas de Genomas E. coli</h1>

      {loading ? (
        <p>Cargando estadísticas...</p>
      ) : (
        <motion.div
          className="stats-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="card">
            <h4>Total de archivos</h4>
            <p>{stats.total}</p>
          </div>
          <div className="card">
            <h4>Longitud promedio</h4>
            <p>{stats.promedio.toFixed(2)} nt</p>
          </div>
          <div className="card">
            <h4>Longitud mínima</h4>
            <p>{stats.minimo} nt</p>
          </div>
          <div className="card">
            <h4>Longitud máxima</h4>
            <p>{stats.maximo} nt</p>
          </div>
          <div className="card">
            <h4>Formatos</h4>
            {Object.entries(stats.por_formato).map(([fmt, count]) => (
              <p key={fmt}>{fmt}: {count}</p>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
