import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';
import SearchBar from './SearchBar';
import '../../css/all.css'; // Import CSS file for styling

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.token;
        const response = await CompanyFinder.get(`/Employer/jobs`, {
          headers: {
            authToken: authToken,
          },
        });
        setJobs(response.data.data.jobs);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const authToken = localStorage.token;
        const profileResponse = await CompanyFinder.get("/Employer/profile", {
          headers: {
            authToken: authToken,
          },
        });
        setName(profileResponse.data.data.profile[0].name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
  }, []);

  const handleSearch = async (selectedOption, searchText) => {
    if (selectedOption === 'All') {
      const authToken = localStorage.token;
      const response = await CompanyFinder.get(`/Employer/jobs`, {
        headers: {
          authToken: authToken,
        },
      });
      setJobs(response.data.data.jobs);
    } else {
      try {
        const authToken = localStorage.token;
        const response = await CompanyFinder.get(`/Employer/jobs/Search`, {
          headers: {
            type: selectedOption,
            value: searchText,
            authToken: authToken,
          },
        });
        setJobs(response.data.data.jobs);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    }
  };

  return (
    <div className="job-list-container">
      <h1>{name}</h1>
      <SearchBar
        options={[
          { value: 'All', label: 'All' },
          { value: 'Name', label: 'By Name' },
          { value: 'Salary Range', label: 'By Salary Range' },
        ]}
        onSearch={handleSearch}
      />
      <div className="grid-container">
        {jobs.map((job, index) => (
          <div key={index} className="job-item">
            <h3>{job.name}</h3>
            <p>{job.description}</p>
            <p>Status: {job.status === 1 ? 'Available' : 'Not Available'}</p>
            <Link to={`/Employer/jobs/${job.job_id}`} className="btn btn-primary">
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
