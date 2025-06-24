import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/SidebarRightHistorial.css';

export default function SideBarRightHistorial() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="sidebar-right-historial"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 70, damping: 15 }}
    >
      <div className="sidebar-logo">🧬 EcoliTool</div>
      <ul className="sidebar-links">
        <motion.li
          whileHover={{ backgroundColor: '#292945', color: '#84b6f4', borderRadius: '8px' }}
          onClick={() => navigate('/')}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Inicio
        </motion.li>
        <motion.li
          whileHover={{ backgroundColor: '#292945', color: '#84b6f4', borderRadius: '8px' }}
          onClick={() => navigate('/evaluacion')}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Evaluación
        </motion.li>
        <motion.li
          whileHover={{ backgroundColor: '#292945', color: '#84b6f4', borderRadius: '8px' }}
          onClick={() => navigate('/historial')}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Historial
        </motion.li>
      </ul>
    </motion.div>
  );
}
