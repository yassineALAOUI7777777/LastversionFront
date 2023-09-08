import React, { useState } from 'react';
import { MenuItem } from '@mui/material';

import KKK from '../jjj.png';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
 
  TextField,
  Container,
  Paper,
} from '@mui/material';

const paperStyle = {
  padding: '50px 20px',
  width: 600,
  margin: '20px auto',
};
const handleSalleAttente = () => {
  // Code pour gérer la salle d'attente ici
  // Par exemple, naviguer vers la page de la salle d'attente
};


const handleFichePatient = () => {
  // Code pour gérer la fiche du patient ici
  // Par exemple, naviguer vers la page de la fiche du patient
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const AddNewpatient = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    adresse: '',
    sexe: '',
    age: '',
    groupe_sanguine: '',
    telephone: '',
    nomComplet: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConsultation = () => {
    // Code pour gérer la consultation ici
    // Par exemple, naviguer vers la page de consultation des patients
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      date_naissance: '',
      adresse: '',
      sexe: '',
      age: '',
      groupe_sanguine: '',
      telephone: '',
      nomComplet: '',
    });
  };
  const [patientsEnSalleAttente, setPatientsEnSalleAttente] = useState([]);

  const fetchPatientsEnSalleAttente = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patients/salle-attente'); // Remplacez par l'URL de votre backend pour récupérer les patients en salle d'attente
      const patients = response.data;

      // Triez les patients par leur ID
      patients.sort((a, b) => a.id - b.id);

      setPatientsEnSalleAttente(patients);
    } catch (error) {
      console.error('Erreur lors de la récupération des patients en salle d\'attente', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Vérification des champs obligatoires
    if (
      formData.nom &&
      formData.prenom &&
      formData.date_naissance &&
      formData.adresse &&
      formData.sexe &&
      formData.age &&
      formData.groupe_sanguine &&
      formData.telephone &&
      formData.nomComplet
    ) {
      axios
        .post('http://localhost:8080/patients', formData)
        .then((response) => {
          console.log('Données enregistrées avec succès !', response.data);
          setOpen(false);
          setSuccessMessage('Enregistrement réussi !');
          setErrorMessage('');
          resetForm();
        })
        .catch((error) => {
          console.error('Erreur lors de l\'enregistrement des données', error);
          setErrorMessage(
            'Erreur lors de l\'enregistrement des données. Veuillez réessayer.'
          );
          setSuccessMessage('');
        });
    } else {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 5000);
  };

  return (
    <div>
      <Container>
        <Paper elevation={3} style={paperStyle}>
         

          {/* Ajout du bouton "Consultation" ici */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>

          <Button
            variant="contained"
            color="success"
            onClick={handleClickOpen}
          >
            Nouveau Patient
          </Button>

        
            <Button
              variant="contained"
              color="inherit"
              onClick={handleConsultation}
            >
              Rendez-vous
            </Button>
           
            <Button
              variant="contained"
              color="primary"
              onClick={handleFichePatient}
            >
              Fiche de patient
            </Button>
          </div>
          <Dialog open={open} onClose={handleClose}>
        
            <DialogContent>
            <form>
             <img src={KKK} alt="Nouveau Patient"  style={{ width: '150px', height: '150px' , display: 'block',
    margin: 'auto',}} />
                <TextField
                  label="Nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField
                  label="Prénom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  fullWidth
                />
 <TextField
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  fullWidth
                />
<TextField
  label="Date de naissance"
  name="date_naissance" // Use "date_naissance" here
  value={formData.date_naissance} // Use "date_naissance" here
  onChange={handleInputChange}
  fullWidth
/>


                <TextField
                  label="Adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleInputChange}
                  fullWidth
                />

<TextField
  label="Sexe"
  name="sexe"
  value={formData.sexe}
  onChange={handleInputChange}
  select
  fullWidth
>
  <MenuItem value="masculin">Masculin</MenuItem>
  <MenuItem value="feminin">Féminin</MenuItem>
</TextField>
<TextField
  label="Groupe sanguin"
  name="groupe_sanguine"
  value={formData.groupe_sanguine}
  onChange={handleInputChange}
  select
  fullWidth
>
  {bloodGroups.map((group) => (
    <MenuItem key={group} value={group}>
      {group}
    </MenuItem>
  ))}
</TextField>


                <TextField
                  label="Téléphone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField
                  label="NomComplet"
                  name="nomComplet"
                  value={formData.nomComplet}
                  onChange={handleInputChange}
                  fullWidth
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Annuler</Button>
              <Button onClick={handleSave} color="success">
                Enregistrer
              </Button>
            </DialogActions>
          </Dialog>

          {/* Affichage des messages de succès ou d'erreur */}
          {successMessage && (
            <p style={{ color: 'green' }}>{successMessage}</p>
          )}
          {errorMessage && (
            <p style={{ color: 'red' }}>{errorMessage}</p>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default AddNewpatient;
