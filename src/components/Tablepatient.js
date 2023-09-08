import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from '@mui/material';

export default function DataTable() {
  const [data, setData] = React.useState([]);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [editedData, setEditedData] = React.useState({});
  const [editSuccessMessage, setEditSuccessMessage] = React.useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState('');
const [filteredData, setFilteredData] = React.useState([]);


  
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      cellClassName: 'red-id-cell', // Appliquez la classe pour la couleur rouge
    },
    { field: 'prenom', headerName: 'Prenom', width: 130 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      width: 90,
      valueGetter: (params: GridValueGetterParams) => params.row.age || '',
    },
    { field: 'adresse', headerName: 'Adresse', width: 130 },
    { field: 'sexe', headerName: 'Sexe', width: 130 },
    {
      field: 'date_naissance',  // Corrected property name
      headerName: 'Date Naissance',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        if (params.value) {
          const date = new Date(params.value);
          const formattedDate = date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          return formattedDate;
        }
        return '';
      },
    },
    { field: 'groupe_sanguine', headerName: 'Groupe Sanguine', width: 130 },  // Corrected property name
    { field: 'telephone', headerName: 'Telephone', type: 'string', width: 120 },
    {
      field: 'Nom complet ',
      headerName: 'Nom complet ',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.prenom || ''} ${params.row.nom || ''}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: GridValueGetterParams) => {
        const rowId = params.row.id;

        const handleEditClick = () => {
          setSelectedRowId(rowId);
          setEditedData(data.find(item => item.id === rowId));
          setEditOpen(true);
        };

        const handleDeleteClick = () => {
          setSelectedRowId(rowId);
          setDeleteOpen(true);
        };

        return (
          <div>
            <IconButton onClick={handleEditClick} color="primary" aria-label="Editer">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteClick} color="secondary" aria-label="Supprimer">
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleClose = () => {
    setConfirmOpen(false);
    setDeleteOpen(false);
    setEditOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Delete button clicked");
    
    
    if (selectedRowId !== null) {
      console.log("Deleting row with ID:", selectedRowId);
      fetch(`http://localhost:8080/patients/id/${selectedRowId}`, {
        method: 'DELETE',
      })
        .then(() => {
          console.log(`Supprimer la ligne avec l'ID ${selectedRowId}`);
          setDeleteOpen(false);
          setDeleteSuccessMessage('Suppression réussie !');
          fetchPatients(); // Actualisez la liste après la suppression
          setTimeout(() => {
            console.log("Deleting success message cleared");
            setDeleteSuccessMessage(null);
          }, 5000); // Réinitialisez le message après 5 secondes
        })
        .catch(err => console.log(err));
    }
  };
  
  const handleSaveClick = () => {
    if (selectedRowId !== null) {
      fetch(`http://localhost:8080/patients/id/${selectedRowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      })
        .then(() => {
          console.log(`Mettre à jour la ligne avec l'ID ${selectedRowId}`);
          setEditOpen(false);
          setEditSuccessMessage('Mise à jour réussie !');
          fetchPatients(); // Actualisez la liste après la mise à jour
          setTimeout(() => {
            setEditSuccessMessage(null);
          }, 5000); // Réinitialisez le message après 5 secondes
        })
        .catch(err => console.log(err));
    }
  };
  

  const fetchPatients = () => {
    fetch('http://localhost:8080/patients')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetchPatients();
  }, []);
  const filterData = () => {
    const filtered = data.filter(item => {
      const fullName = `${item.prenom} ${item.nom}`.toLowerCase();
      return fullName.includes(searchInput.toLowerCase());
    });
    setFilteredData(filtered);
  };

  React.useEffect(() => {
    filterData();
  }, [searchInput, data]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField
      label="Rechercher par nom et prénom"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      fullWidth
      style={{ marginBottom: '30px', width: '80%' }} // Ajustez la largeur comme vous le souhaitez
    />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredData.length > 0 ? filteredData : data}
          columns={columns}
          pageSize={5}
          checkboxSelection
          localization={{
            headerCheckboxSelection: 'Sélectionner tout',
          }}
        />
      </div>
      <Dialog open={deleteOpen} onClose={handleClose}>
        <DialogTitle>Supprimer la colonne</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette colonne ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleClose}>
      <DialogTitle>Modifier la colonne</DialogTitle>
      <DialogContent>
          Êtes-vous sûr de vouloir Modifier cette colonne ?
        </DialogContent>
        <DialogContent>
        <input
  type="text"
  placeholder="Rechercher par nom et prénom"
  value={searchInput}
  onChange={(e) => setSearchInput(e.target.value)}
/>
          {/* Affichez ici les champs d'édition, par exemple : */}
          <input
      type="text"
      value={editedData.nom || ''}
      onChange={(e) => setEditedData({ ...editedData, nom: e.target.value })}
    />
    <input
      type="text"
      value={editedData.prenom || ''}
      onChange={(e) => setEditedData({ ...editedData, prenom: e.target.value })}
    />
    <input
      type="number"
      value={editedData.age || ''}
      onChange={(e) => setEditedData({ ...editedData, age: e.target.value })}
    />
   
    <input
      type="text"
      value={editedData.sexe || ''}
      onChange={(e) => setEditedData({ ...editedData, sexe: e.target.value })}
    />
     <input
      type="text"
      value={editedData.adresse || ''}
      onChange={(e) => setEditedData({ ...editedData, adresse: e.target.value })}
    />
  <input
  type="text"
  value={editedData.date_naissance || ''}
  onChange={(e) => setEditedData({ ...editedData, date_naissance: e.target.value })}
/>

<input
  type="text"
  value={editedData.groupe_sanguine || ''}
  onChange={(e) => setEditedData({ ...editedData, groupe_sanguine: e.target.value })}
/>
    <input
      type="text"
      value={editedData.telephone || ''}
      onChange={(e) => setEditedData({ ...editedData, telephone: e.target.value })}
    />
    <input
      type="text"
      value={editedData.NomCmplet || ''}
      onChange={(e) => setEditedData({ ...editedData, NomComplet: e.target.value })}
    />
          {/* Ajoutez d'autres champs d'édition ici */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveClick} color="primary" startIcon={<SaveIcon />}>
            Sauvegarder
          </Button>
        </DialogActions>
      
      </Dialog>
      
    </div>
  );
}