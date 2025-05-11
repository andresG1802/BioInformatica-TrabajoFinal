import { Routes, Route } from 'react-router-dom';
import PantallaInicio from '../pages/PantallaInicio';
import EvaluacionADN from '../pages/EvaluacionADN';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PantallaInicio />} />
      <Route path="/evaluacion" element={<EvaluacionADN />} />
    </Routes>
  );
};

export default AppRoutes;

