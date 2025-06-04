import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sheet = ({ isActive, onClick, children, index, onCompare, cadena }) => {
  const navigate = useNavigate();

  const handleDetailClick = (e) => {
    e.stopPropagation();
    navigate(`/detail/${index + 1}`);
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    onCompare(cadena);
  };

  return (
    <motion.div
      className={`sheet ${isActive ? 'active' : ''}`}
      initial={false}
      animate={{
        y: isActive ? -450 : 0,
        zIndex: isActive ? 50 : index,
        filter: isActive ? 'none' : undefined,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      }}
      whileHover={!isActive ? { y: -20 } : {}}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
      {isActive && (
        <div className="sheet-buttons">
          <button onClick={handleCompareClick} className="sheet-button">
            Compare
          </button>
          <button onClick={handleDetailClick} className="sheet-button">
            Detail
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Sheet;