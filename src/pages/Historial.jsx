import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SIdebar';
import '../styles/Historial.css';
import SidebarRightHistorial from '../components/SideBarRightHistorial';

export default function Historial() {
  const [genomas, setGenomas] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/ecoli/list')
      .then(res => res.json())
      .then(data => setGenomas(data.genomas || []))
      .catch(err => console.error('Error al obtener historial:', err));
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div className="historial-container">
        <h1 className="historial-title">🧬 Historial de Genomas</h1>

        {genomas.length === 0 ? (
          <p>No hay archivos disponibles.</p>
        ) : (
          <div className="historial-grid">
            {genomas.map((g, i) => (
              <div key={i} className="historial-card">
                <h3>{g.archivo}</h3>
                <p><strong>ID:</strong> {g.id}</p>
                <p><strong>Descripción:</strong> {g.descripcion}</p>
                <p><strong>Longitud:</strong> {g.longitud.toLocaleString()} pb</p>
                <p><strong>Formato:</strong> {g.formato.toUpperCase()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <SidebarRightHistorial />
    </div>
  );
}
