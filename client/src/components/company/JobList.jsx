// JobDetails.js
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';
// import CompanyList from './CompanyList';

const JobList = () => {
  // const {id } = useParams();
  console.log ("hello ");
  // console.log (id);
  const [jobs, setJobs] = useState([]);
  //const [Name,setName] =useState ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        // console.log (id);
        const authToken = localStorage.token;
        console.log(authToken);
        
        const response = await CompanyFinder.get(`/Employer/jobs`, {
          headers: {
            authToken: `${authToken}`,
          },
        });

        console.log (response.data.data);
        setJobs(response.data.data.jobs);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchData();
  }, []);

  // useEffect (()=> {
  //   const fetchData2 = async () =>{
  //     try {
  //       const authToken = localStorage.token;
  //       console.log(authToken);
  //       const response = await CompanyFinder.get (`/Company`, {
  //         headers: {
  //           authToken: `${localStorage.token}`,
  //         },
  //       });
  //       setName(response.data.data.company.name);
  //       console.log(response.data.data.company.name);
        
  //     } catch (error) {
        
  //     }
     
  //   };
  //   fetchData2();
  // },[])

  return (
    <div>
      <h1>Company</h1>
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

export default JobList;
