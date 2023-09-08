import React, { useState } from 'react';
import DataTable from './Tablepatient';
import { Button } from '@mui/material';

export default function Salle() {
  const [showTable, setShowTable] = useState(false);
  const columnsToShow = ['id', 'nom', 'prenom'];

  const handleSalleAttente = () => {
    setShowTable(true);
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70px',
  };

  return (
    <div>
      <div style={buttonContainerStyle}>
        <Button variant="contained" color="error" onClick={handleSalleAttente}>
          Salle d'attente
        </Button>
      </div>

      {showTable && <DataTable columnsToShow={columnsToShow} />}
    </div>
  );
}
