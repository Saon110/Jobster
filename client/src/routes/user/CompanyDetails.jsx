import React, { Fragment } from 'react' ;
import {  Route,Routes } from 'react-router-dom';
import CompanyList from '../../components/user/CompanyList' ;
import JobDetails from '../../components/user/JobDetails';
const CompanyDetails = () => {
  return (
       <div >
         
         <JobDetails/>

       </div>
      
       
       
        // {/* <Route path="/" exact component={CompanyList} />
        // <Route path="/" exact component={JobDetails} />  */}
     
    
   //  <div>CompanyDetails</div>
  );
};

export default CompanyDetails;