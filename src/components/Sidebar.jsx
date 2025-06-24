// src/components/Sidebar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="sidebar"
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
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
};

export default Sidebar;