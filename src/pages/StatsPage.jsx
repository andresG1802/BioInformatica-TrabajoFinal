// src/pages/StatsPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/StatsPage.css";
import Sidebar from "../components/SIdebar"; // 👈 Importar Sidebar
import SideBarRightHistorial from "../components/SideBarRightHistorial";

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/ecoli/stats");
        const data = await res.json();
        console.log(data)
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
    <div style={{ display: "flex" }}>
      <SideBarRightHistorial />

      <motion.div
        className="stats-container"
        style={{ marginLeft: "220px", flexGrow: 1 }}
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
              <p>{stats.total_archivos}</p>
            </div>
            <div className="card">
              <h4>Longitud promedio</h4>
              <p>{stats.promedio_longitud.toFixed(2)} nt</p>
            </div>
            <div className="card">
              <h4>Longitud mínima</h4>
              <p>{stats.longitud_minima} nt</p>
            </div>
            <div className="card">
              <h4>Longitud máxima</h4>
              <p>{stats.longitud_maxima} nt</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
