import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import CompanyFinder from '../../apis/CompanyFinder';
import SearchBar from './SearchBar';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.token;
        const response = await CompanyFinder.get(`/Employer/jobs`, {
          headers: {
            authToken: `${authToken}`,
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
                    authToken: `${authToken}`,
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
          authToken: `${authToken}`,
        },
      });
      setJobs(response.data.data.jobs);
    } else {
      try {
        const authToken = localStorage.token;
        const response = await CompanyFinder.get(`/Employer/jobs/Search`, {
          headers: {
            type: `${selectedOption}`,
            value: `${searchText}`,
            authToken: `${authToken}`,
          },
        });
        setJobs(response.data.data.jobs);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    }
  };

  return (
    <div>
      <h1>{name}</h1>
      <SearchBar
        options={[
          { value: 'All', label: 'All' },
          { value: 'Name', label: 'By Name' },
          { value: 'Salary Range', label: 'By Salary Range' },
        ]}
        onSearch={handleSearch}
      />
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Job Name</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index}>
              <td>{job.name}</td>
              <td>{job.description}</td>
              <td>{job.status === 1 ? 'Available' : 'Not Available'}</td>
              <td>
                <Link to={`/Employer/jobs/${job.job_id}`} className="btn btn-primary">
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
