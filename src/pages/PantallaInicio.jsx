import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {Atomo3D} from'../components/Atomo3D';
const PantallaInicio = () => {
  const navigate = useNavigate();

  return (
    <div className="pantalla-inicio">
      {/* <motion.div
        className="logo"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        ADN
      </motion.div> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="atomo-container"
      >
        <Atomo3D />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Bienvenido a la App de Bioinformática
      </motion.h1>

      <motion.p
        className="descripcion"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Esta aplicación te ayudará a analizar y entender datos genéticos de manera eficiente y visual.
      </motion.p>
      <motion.ul
        className="caracteristicas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <li>🔬 Análisis genético avanzado</li>
        <li>📊 Visualizaciones interactivas</li>
      </motion.ul>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/evaluacion')}
      >
        Iniciar Evaluación
      </motion.button>

      <footer className="footer">
        © 2025 BioApp - Todos los derechos reservados
      </footer>
    </div>
  );
};

export default PantallaInicio;
