// import React, { Fragment } from 'react' ;
// import {  Route,Routes } from 'react-router-dom';
// import CompanyList from '../../components/user/CompanyList' ;
import JobDetails from '../../components/user/JobDetailsOfEachCompany' ;
const CompanyDetails = () => {
  return (
       <div >
         <Navbar/>
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