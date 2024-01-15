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
import AnnonceTempl from "./Components/Annonce/AnnonceTempl"
import Modele  from './Components/Object/Modele';
import MoteurModele from './Components/Object/MoteurModele';
import AnneeModele from './Components/Object/AnneeModele';

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
          <Route exact path="/ValiderAnnonce" element={<Layout><AnnonceTempl  title="Valider Annonce" /></Layout>} />
          <Route exact path="/modele" element={<Layout><CrudObject  title="Modele" obj={<Modele />} /></Layout>} />
          <Route exact path="/moteurModele" element={<Layout><CrudObject  title="Moteur modele" obj={<MoteurModele />} /></Layout>} />
          <Route exact path="/anneeModele" element={<Layout><CrudObject  title="Année modele" obj={<AnneeModele />} /></Layout>} />
        </Routes>
   </BrowserRouter>
  );
}

export default App;
