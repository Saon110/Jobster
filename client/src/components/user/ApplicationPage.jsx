// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';
import '../../css/applicationdetails.css'; // Import the CSS file

const ApplicationPage = () => {
  // State variables
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  // Fetch applications on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.token;
        console.log(authToken);
        const response = await CompanyFinder.get('/User/Applications', {
          headers: {
            authToken: `${authToken}`,
          },
        });
        setApplications(response.data.data.applications);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setApplications]);

  return (
    <div>
      {applications.map((application, index) => (
        <div key={index} className="application-details-box">
          <div className="application-details-content">
            <p>
              <strong>Apply Date:</strong> {new Date(application.apply_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Job Name:</strong> {application.job_name}
            </p>
            <p>
              <strong>Company Name:</strong> {application.company_name}
            </p>
            <p>
              <strong>Status:</strong> {application.application_status}
            </p>
            {/* <p>
              <strong>Additional Information:</strong> {application.additional_info}
            </p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationPage;
