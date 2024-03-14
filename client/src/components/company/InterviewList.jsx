import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';
import '../../css/all.css'; // Import CSS for styling

const InterviewList = () => {
    const { id } = useParams();
    const [interviews, setInterviews] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const authToken = localStorage.token;

            const response = await CompanyFinder.get(`/Employer/interviews`, {
                headers: {
                    authToken: `${authToken}`,
                },
            });

            setInterviews(response.data.data.interviews);
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    };

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


    const handleAccept = async (interviewId) => {
        try {
            console.log(`Accepted interview with ID: ${interviewId}`);

            const authToken = localStorage.token;

            await CompanyFinder.post(`/Employer/interviews/${interviewId}/accept`, null, {
                headers: {
                    authToken: `${authToken}`,
                },
            });

            // After accepting, fetch data again to refresh the page
            fetchData();
        } catch (error) {
            console.error('Error accepting interview:', error);
        }
    };

    const handleReject = async (interviewId) => {
        try {
            console.log(`Rejected interview with ID: ${interviewId}`);

            const authToken = localStorage.token;

            await CompanyFinder.post(`/Employer/interviews/${interviewId}/reject`, null, {
                headers: {
                    authToken: `${authToken}`,
                },
            });

            // After rejecting, fetch data again to refresh the page
            fetchData();
        } catch (error) {
            console.error('Error rejecting interview:', error);
        }
    };

    return (
        <div className="grid-container">
            <h1>{name}</h1>
            {interviews.map((interview) => (
                <div key={interview.interview_id} className="grid-item">
                    <p><strong>Interview ID:</strong> {interview.interview_id}</p>
                    <p><strong>Interview Time:</strong> {interview.interview_time}</p>
                    <p><strong>Status:</strong> {interview.status}</p>
                    <p><strong>Interview Location:</strong> {interview.location}</p>
                    <div className="actions">
                        <button className="btn btn-success" onClick={() => handleAccept(interview.interview_id)}>Accept</button>
                        <button className="btn btn-danger" onClick={() => handleReject(interview.interview_id)}>Reject</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InterviewList;
