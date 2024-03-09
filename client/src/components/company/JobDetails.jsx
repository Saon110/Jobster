import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import SearchBar from './SearchBar';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const [job, setJob] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.token;
        const response = await CompanyFinder.get(`/Employer/jobs/${id}`, {
          headers: {
            authToken: `${authToken}`,
          },
        });
        setJob(response.data.data.job[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleBackToJobs = () => {
    navigate('/Employer/jobs');
  };

  const handleUpdate = () => {
    navigate(`/Employer/jobs/${job.job_id}/update`);
  };

  return (
    <div className="container">
      <h1 className="my-4">Job Details</h1>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-dark">{job.name}</h2>
          <p className="card-text text-dark">{job.description}</p>
          <p className="card-text text-dark">Salary: {job.salary}</p>
          <p className="card-text text-dark">Status: {job.status}</p>
          <p className="card-text text-dark">Number of Employees: {job.num_of_employees}</p>
          <button className="btn btn-primary mr-2" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn btn-secondary" onClick={handleBackToJobs}>
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
