// JobDetails.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';


const JobDetailsOfEachCompany = () => {
  const {companyId } = useParams();
  console.log ("hello ");
  console.log (companyId);
  const [jobs, setJobs] = useState([]);
  const [Name,setName] =useState ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        console.log (companyId);
        
        const response = await CompanyFinder.get(`User/Company/${companyId}/jobs`);
        setJobs(response.data.data.jobs);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchData();
  }, [companyId]);

  useEffect (()=> {
    const fetchData2 = async () =>{
      try {
        const response = await CompanyFinder.get (`/${companyId}`);
        setName(response.data.data.company.name);
        console.log(response.data.data.company.name);
        
      } catch (error) {
        
      }
     
    };
    fetchData2();
  },[setName])

  return (
    <div>
      <h2>Job Details of {Name}</h2>
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Job Name</th>
            <th scope="col">Salary</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index}>
              <td>{job.name}</td>
              <td>{job.salary}</td>
              <td>{job.description}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobDetailsOfEachCompany;
