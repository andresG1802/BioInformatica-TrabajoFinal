import { Routes, Route } from 'react-router-dom';
import PantallaInicio from '../pages/PantallaInicio';
import Dashboard from '../pages/Dashboard';
import DetailView from '../pages/DetailView';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PantallaInicio />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/detail/:sheetId" element={<DetailView />} />
    </Routes>
  );
};

export default AppRoutes;