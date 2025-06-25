// src/components/EstadisticasChart.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#FFBB28'];

export default function EstadisticasChart({ stats }) {
  if (!stats) return null;

  const barras = [
    { name: 'Promedio', value: stats.promedio_longitud },
    { name: 'Mediana', value: stats.mediana_longitud },
    { name: 'Máxima', value: stats.longitud_maxima },
    { name: 'Mínima', value: stats.longitud_minima },
  ];

  const formatos = Object.entries(stats.distribucion_formatos || {}).map(([key, value]) => ({
    name: key.toUpperCase(),
    value,
  }));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', marginTop: '2rem' }}>
      {/* Gráfico de barras */}
      <BarChart width={400} height={300} data={barras}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#6a11cb" />
      </BarChart>

      {/* Gráfico de pastel */}
      <PieChart width={300} height={300}>
        <Pie
          data={formatos}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
          dataKey="value"
        >
          {formatos.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
