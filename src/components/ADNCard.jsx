const ADNCard = ({ cadena, resultado }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 10,
      padding: 10,
      margin: 10,
      backgroundColor: resultado ? '#a5d6a7' : '#ef9a9a'
    }}>
      <h4>Cadena</h4>
      <p>{cadena}</p>
      {resultado !== undefined && (
        <p>¿Coincide? <strong>{resultado ? 'Sí' : 'No'}</strong></p>
      )}
    </div>
  );
};

export default ADNCard;
