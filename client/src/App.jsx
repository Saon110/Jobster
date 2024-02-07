import React from 'react';
import { BrowserRouter, Routes, Route ,Switch } from 'react-router-dom';
import Home from './routes/user/Home';
import CompanyDetails from './routes/user/CompanyDetails';
//import CompanyUpdate from './components/CompanyUpdate';
import { CompanyContextProvider } from './context/CompanyContext';
import UpdatePage from './routes/user/UpdatePage';
import Login from './routes/Login';
import CompanyList from './components/user/CompanyList';

const App = () => {
  return (

    <CompanyContextProvider>

    <div className='container'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/company/:companyId" element={<CompanyDetails/>} />
                <Route path="/company/:companyId/update" element={<UpdatePage/>} />
                <Route path ="/home" element = {<Home/>} />
            </Routes>
        </BrowserRouter>
    </div>

    </CompanyContextProvider>
  );
};

export default App;