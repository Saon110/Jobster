import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';

const InterviewList = () => {
    const { id } = useParams();
    const [interviews, setInterviews] = useState([]);

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
        <div>
            <h1>Company</h1>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Interview ID</th>
                        <th scope="col">Interview Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Interview Location</th>
                        <th scope="col">Actions</th> {/* Added column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {interviews.map((interview) => {
                        return (
                            <tr key={interview.interview_id}>
                                <td>{interview.interview_id}</td>
                                <td>{interview.interview_time}</td>
                                <td>{interview.status}</td>
                                <td>{interview.location}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleAccept(interview.interview_id)}>Accept</button>
                                    <button className="btn btn-danger" onClick={() => handleReject(interview.interview_id)}>Reject</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default InterviewList;
