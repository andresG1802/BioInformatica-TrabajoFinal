import { Routes, Route } from 'react-router-dom';
import PantallaInicio from '../pages/PantallaInicio';
import EvaluacionADN from '../pages/EvaluacionADN';
import Historial from '../pages/Historial';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PantallaInicio />} />
      <Route path="/evaluacion" element={<EvaluacionADN />} />
      <Route path="/historial" element={<Historial />} />
    </Routes>
  );
};

export default AppRoutes;

