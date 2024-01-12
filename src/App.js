import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './Components/Accounts/LoginForm';
import LeftNavBar from './Components/Accueil/LeftNavBar';
import CrudObject from './Components/Object/CrudObject';
import Categorie from './Components/Object/Categorie';
import Layout from './Components/Accounts/Layout';
import Marque from './Components/Object/Marque';
import Transmission from './Components/Object/Transmission';
import Moteur  from './Components/Object/Moteur';
import Carburant from './Components/Object/Carburant';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/Accueil" element={<Layout><CrudObject  title="Categorie" obj={<Categorie />} /></Layout>} />
          <Route exact path="/CrudCategorie" element={<Layout><CrudObject  title="Categorie" obj={<Categorie />} /></Layout>} />
          <Route exact path="/CrudMarque" element={<Layout><CrudObject  title="Marque" obj={<Marque />} /></Layout>} />
          <Route exact path="/CrudTransmission" element={<Layout><CrudObject  title="Transmission" obj={<Transmission />} /></Layout>} />
          <Route exact path="/CrudMoteur" element={<Layout><CrudObject  title="Moteur" obj={<Moteur />} /></Layout>} />
          <Route exact path="/CrudCarburant" element={<Layout><CrudObject  title="Carburant" obj={<Carburant />} /></Layout>} />
        </Routes>
   </BrowserRouter>
  );
}

export default App;
