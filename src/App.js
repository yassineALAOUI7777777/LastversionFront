
import './App.css';
import ButtonAppBar from './components/Menu'

import  DataTable from './components/Tablepatient'
import AddNewpatient from './components/AddNewpatient';

import Salle from './components/Salle';
import PatientFiche from './components/PatientFiche';




function App() {
  return (
    <div className="App">

      
<ButtonAppBar/>
< AddNewpatient/>
< DataTable/>
< Salle/>




    </div>
  );
}

export default App;
