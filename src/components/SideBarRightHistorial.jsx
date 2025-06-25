// src/components/SidebarRightHistorial.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/SidebarRightHistorial.css';

export default function SideBarRightHistorial() {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Inicio', route: '/' },
    { label: 'Evaluación', route: '/evaluacion' },
    { label: 'Historial', route: '/historial' },
    { label: 'Estadísticas', route: '/ecoli/stats' },
    { label: 'Ver Fragmento', route: '/ecoli/fragment' },
    { label: 'Exportar a Excel', route: '/ecoli/export' },
  ];

  return (
    <motion.div
      className="sidebar-right-historial"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 70, damping: 15 }}
    >
      <div className="sidebar-logo">🧬 EcoliTool</div>
      <ul className="sidebar-links">
        {menuItems.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{
              backgroundColor: '#292945',
              color: '#84b6f4',
              borderRadius: '8px',
            }}
            onClick={() => navigate(item.route)}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            {item.label}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
