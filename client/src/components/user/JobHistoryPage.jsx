// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';
import '../../css/applicationdetails.css'; // Import the CSS file

const JobHistoryPage = () => {
  // State variables
  const [jobHistory, setJobHistory] = useState([]);
  const navigate = useNavigate();

  // Fetch job history on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.token;
        console.log(authToken);
        const response = await CompanyFinder.get('/User/MyProfile/JobHistory', {
          headers: {
            authToken: `${authToken}`,
          },
        });
        setJobHistory(response.data.data.jobHistory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setJobHistory]);

  return (
    <div>
      {jobHistory.map((job, index) => (
        <div key={index} className="application-details-box">
          <div className="application-details-content">
            <p>
              <strong>Job Name:</strong> {job.job_name}
            </p>
            <p>
              <strong>Company Name:</strong> {job.company_name}
            </p>
            <p>
              <strong>Start Date:</strong> {new Date(job.start_date).toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong> {job.end_date ? new Date(job.end_date).toLocaleDateString() : 'Present'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobHistoryPage;
