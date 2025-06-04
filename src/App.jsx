import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CamperDetailsPage from './pages/CamperDetailsPage';
import {  Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    
    </>
  );
}

export default App;