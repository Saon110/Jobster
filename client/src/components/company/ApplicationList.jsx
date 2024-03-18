import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';
import '../../css/all.css'; // Import CSS for styling

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token;
                const response = await CompanyFinder.get(`/Employer/applications`, {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                setApplications(response.data.data.applications);
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

    return (
        <div className="grid-container">
            <h1>{name}</h1>
            {applications.map((application, index) => (
                <div key={index} className="grid-item">
                    <p><strong>Apply Date:</strong> {application.apply_date}</p>
                    <p><strong>Status:</strong> {application.status}</p>
                    <p><strong>Name:</strong> {application.username}</p>
                    <p><strong>Applied Job:</strong> {application.job_name}</p>
                    <button 
                        className="btn btn-primary btn-sm" 
                        onClick={() => navigate(`/Employer/applications/${application.application_id}`)}
                    >
                        Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ApplicationList;
