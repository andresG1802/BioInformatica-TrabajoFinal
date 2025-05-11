import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PantallaInicio = () => {
  const navigate = useNavigate();

  return (
    <div className="pantalla-inicio">
      <motion.div
        className="logo"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        ADN
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Bienvenido a la App de Bioinformática
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/evaluacion')}
      >
        Iniciar Evaluación
      </motion.button>
    </div>
  );
};

export default PantallaInicio;
