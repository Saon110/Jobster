import React from 'react'
import { useState, useEffect } from 'react'
import CompanyFinder from '../../apis/CompanyFinder'
import { useNavigate } from 'react-router-dom'

const ApplicationList = () => {
    console.log("hello ");
    const [applications, setApplications] = useState([]);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    //const [application_id, setApplication_id] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token;
                console.log(authToken);
                const response = await CompanyFinder.get(`/Employer/applications`, {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                console.log(response.data.data);
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


    // const showDetails = (application) => {
    //     // console.log(application);
    //     // setApplication_id(application.application_id);
    //     // console.log(application_id);
    //     navigate(`/Employer/applications/${application_id}`);
    // }

    return (
        <div>
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
                            onClick={() => {
                                // setApplication_id(application.application_id);
                                // console.log(application_id);
                                // event.preventDefault();
                                // showDetails(application);
                                navigate(`/Employer/applications/${application.application_id}`);
                            }}
                        >
                            Details
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    
    )
}

export default ApplicationList