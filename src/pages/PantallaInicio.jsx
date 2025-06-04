import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Atomo3D } from '../components/Atomo3D';
import { useState } from 'react';

const PantallaInicio = () => {
  const navigate = useNavigate();
  const [archivo, setArchivo] = useState(null);
  const [formato, setFormato] = useState('FASTA');

  const handleArchivoChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (archivo) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="pantalla-inicio">
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

      <motion.div
        className="evaluacion-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <input
          className="evaluacion-input"
          type="file"
          accept=".fasta,.fa,.gb,.gbk,.txt"
          onChange={handleArchivoChange}
        />
        <small className="archivo-info">
          Archivos permitidos: .fasta, .fa, .gb, .gbk, .txt
        </small>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ marginRight: '0.5rem', color: '#fff' }}>Formato:</label>
          <select
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            className="evaluacion-input"
          >
            <option value="FASTA">FASTA</option>
            <option value="GenBank">GenBank</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          disabled={!archivo}
        >
          Ir al Dashboard
        </motion.button>
      </motion.div>

      <footer className="footer">
        © 2025 BioApp - Todos los derechos reservados
      </footer>
    </div>
  );
};

export default PantallaInicio;