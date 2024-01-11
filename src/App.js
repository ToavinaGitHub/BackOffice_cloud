import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './Components/Accounts/LoginForm';
import LeftNavBar from './Components/Accueil/LeftNavBar';
import CrudObject from './Components/Object/CrudObject';
import Categorie from './Components/Object/Categorie';
import Layout from './Components/Accounts/Layout';
import Marque from './Components/Object/Marque';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/CrudCategorie" element={<Layout><CrudObject  title="Categorie" obj={<Categorie />} /></Layout>} />
          <Route exact path="/CrudMarque" element={<Layout><CrudObject  title="Marque" obj={<Marque />} /></Layout>} />
        </Routes>
   </BrowserRouter>
  );
}

export default App;
