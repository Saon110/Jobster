// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';
import '../../css/applicationdetails.css'; // Import the CSS file

const InterviewPage = () => {
  // State variables
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  // Fetch interviews on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.token;
        console.log(authToken);
        const response = await CompanyFinder.get('/User/Applications/Interview', {
          headers: {
            authToken: `${authToken}`,
          },
        });
        setInterviews(response.data.data.interviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setInterviews]);

  return (
    <div>
      {interviews.map((interview, index) => (
        <div key={index} className="application-details-box">
          <div className="application-details-content">
            <p>
              <strong>Interview Time:</strong> {new Date(interview.time).toLocaleString()}
            </p>
            <p>
              <strong>Job Name:</strong> {interview.job_name}
            </p>
            <p>
              <strong>Company Name:</strong> {interview.company_name}
            </p>
            <p>
              <strong> Status :</strong> {interview.status}
            </p>
            {/* <p>
              <strong>Status:</strong> {interview.status}
            </p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewPage;
