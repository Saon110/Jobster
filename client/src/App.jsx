import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/user/Home';
import CompanyDetails from './routes/user/CompanyDetails';
//import CompanyUpdate from './components/CompanyUpdate';
import { CompanyContextProvider } from './context/CompanyContext';
import UpdatePage from './routes/user/UpdatePage';
import Login from './routes/Login';

// import CompanyList from './components/user/CompanyList';
import Jobs from './routes/company/Jobs';
import Employees from './routes/company/Employees';
import CompanyHome from './routes/company/Home';
import CompanyAddJob from './routes/company/AddJob';

const App = () => {
  return (

    <CompanyContextProvider>

    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/company/:companyId" element={<CompanyDetails/>} />
                <Route path="/company/:companyId/update" element={<UpdatePage/>} />
                <Route path ="/User/home" element = {<Home/> } />

                <Route path ="/Employer/:id/jobs" element = {<Jobs/>} />
                <Route path ="/Employer/:id/employees" element = {<Employees/>} />
                <Route path ="/Employer/:id" element = {<CompanyHome/>} />
                <Route path ="/Employer/:id/addjob" element = {<CompanyAddJob/>} />

            </Routes>
        </BrowserRouter>
    </div>

    </CompanyContextProvider>
  );
};

export default App;

