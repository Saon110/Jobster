import React, { Fragment } from 'react' ;
import {  Route,Routes } from 'react-router-dom';
import CompanyList from '../../components/user/CompanyList' ;
import JobDetails from '../../components/user/JobDetailsOfEachCompany';
import Navbar from '../../components/user/Navbar';
const CompanyDetails = () => {
  return (
       <div >
          
         <Navbar/>
         <JobDetails/>

       </div>
      
       
       
        // {/* <Route path="/" exact component={CompanyList} />
        // <Route path="/" exact component={JobDetails} />  */}
     
    
   //  <div>CompanyDetails</div>
  );
};

export default CompanyDetails;