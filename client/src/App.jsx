import React from 'react';
import { BrowserRouter, Routes, Route ,Switch } from 'react-router-dom';
import Home from './routes/user/Home';
import CompanyDetails from './routes/user/CompanyDetails';
//import CompanyUpdate from './components/CompanyUpdate';
import { CompanyContextProvider } from './context/CompanyContext';
import UpdatePage from './routes/user/UpdatePage';
import Login from './routes/Login';
import Companies from './routes/user/Companies';
import Jobs from './routes/user/Jobs';
import Apply from './routes/user/Apply';

const App = () => {
  return (

    <CompanyContextProvider>

    <div className='container'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/company/:companyId" element={<CompanyDetails/>} />
                <Route path="/company/:companyId/update" element={<UpdatePage/>} />
                <Route path ="/User/home" element = {<Home/> } />
                <Route path ="/User/Companies" element = {<Companies/> } />
                <Route path ="/User/Jobs" element = {<Jobs/> } />
                <Route path ="/User/Apply" element = {<Apply/> } />
            </Routes>
        </BrowserRouter>
    </div>

    </CompanyContextProvider>
  );
};

export default App;