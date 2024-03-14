import React from 'react';
import { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';

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
        <div style={{ backgroundImage: `url('../../public/EmployeeLogin.jpg')`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <h1>{name}</h1>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Apply Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Name</th>
                        <th scope="col">Applied Job</th>
                        <th scope="col">Details</th> 
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application, index) => (
                        <tr key={index}>
                            <td>{application.apply_date}</td>
                            <td>{application.status}</td>
                            <td>{application.username}</td>
                            <td>{application.job_name}</td>
                            <td>
                                <button 
                                    className="btn btn-primary btn-sm" 
                                    onClick={() => navigate(`/Employer/applications/${application.application_id}`)}
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationList;
