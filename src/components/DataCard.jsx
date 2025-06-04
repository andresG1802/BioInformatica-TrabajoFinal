import { motion } from 'framer-motion';
import React from 'react';

const DataCard = ({ width, height, position, children }) => {
  return (
    <motion.div
      className="data-card"
      style={{
        width: width || '200px',
        height: height || '150px',
        position: 'absolute',
        left: position?.x || '0px',
        top: position?.y || '0px',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="data-card-content">
        {children}
      </div>
    </motion.div>
  );
};

export default DataCard;