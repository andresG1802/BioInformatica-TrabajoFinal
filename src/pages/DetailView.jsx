import React from 'react';
import { useParams } from 'react-router-dom';

const DetailView = () => {
  const { sheetId } = useParams();

  return (
    <div className="detail-container">
      <h1>Detail View for Sheet {sheetId}</h1>
    </div>
  );
};

export default DetailView;