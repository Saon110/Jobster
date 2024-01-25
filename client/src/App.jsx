import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import CompanyDetails from './routes/CompanyDetails';
//import CompanyUpdate from './components/CompanyUpdate';
import { CompanyContextProvider } from './context/CompanyContext';
import UpdatePage from './routes/UpdatePage';

const App = () => {
  return (

    <CompanyContextProvider>

    <div className='container'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/company/:companyId" element={<CompanyDetails />} />
                <Route path="/company/:companyId/update" element={<UpdatePage/>} />
            </Routes>
        </BrowserRouter>
    </div>

    </CompanyContextProvider>
  );
};

export default App;