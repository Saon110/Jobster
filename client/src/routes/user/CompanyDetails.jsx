import React, { Fragment } from 'react' ;
import {  Route,Routes } from 'react-router-dom';
import CompanyList from '../../components/user/CompanyList' ;
import JobDetails from '../../components/user/JobDetailsOfEachCompany';
import Navbar from '../../components/user/Navbar';
import SearchBar from '../../components/user/SearchBar';
const CompanyDetails = () => {
  return (
       <div >
          
         <Navbar/>
         {/* <SearchBar/> */}
         <div className='container'>
        <JobDetails/>
        </div>

       </div>
      
       
       
        // {/* <Route path="/" exact component={CompanyList} />
        // <Route path="/" exact component={JobDetails} />  */}
     
    
   //  <div>CompanyDetails</div>
  );
};

export default CompanyDetails;