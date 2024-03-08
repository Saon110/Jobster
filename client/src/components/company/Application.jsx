import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';
import '../../css/Application.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Application = () => {
    const { id } = useParams();
    const [applicant, setApplicant] = useState(null);
    const [minGpa, setMinGpa] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token;
                const response = await CompanyFinder.get(`/Employer/applications/${id}`, {
                    headers: {
                        authToken: authToken,
                    },
                });
                setApplicant(response.data.data.application[0]);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleAccept = async () => {
        console.log('Accepting application...');

        try {
            const authToken = localStorage.token;
            const response = await CompanyFinder.put(`Employer/applications/${id}/accept`, null, {
                headers: {
                    authToken: authToken,
                },
            });
            console.log('Accept Response:', response.data);
            navigate('/Employer/applications')
            // Handle the response as needed
        } catch (error) {
            console.error('Error accepting application:', error);
        }

    };

    const handleReject = async () => {
        console.log('Rejecting application...');

        try {
            const authToken = localStorage.token;
            const response = await CompanyFinder.put(`Employer/applications/${id}/reject`, null, {
                headers: {
                    authToken: authToken,
                },
            });
            console.log('Reject Response:', response.data);
            navigate('/Employer/applications')
            // Handle the response as needed
        } catch (error) {
            console.error('Error rejecting application:', error);
        }
    };

    const handleCheckEligibility = async () => {
        console.log('Checking eligibility...');
        try {
            const authToken = localStorage.token;
            const response = await CompanyFinder.get(`Employer/applications/${id}/isEligible`, {
                headers: {
                    authToken: authToken,
                    minGpa: minGpa,
                },
            });
            console.log('Eligibility Response:', response.data);
            if (response.data.data.isEligible) {
                Swal.fire({
                    title: 'Applicant Eligibility',
                    text: 'Applicant is eligible!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'my-swal-popup',
                        confirmButton: 'my-swal-confirm-button'
                    }
                });
            } else {
                Swal.fire({
                    title: 'Applicant Eligibility',
                    text: 'Applicant is not eligible.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'my-swal-popup',
                        confirmButton: 'my-swal-confirm-button'
                    }
                });
            }
            // Handle the response as needed
        } catch (error) {
            console.error('Error checking eligibility:', error);
        }
    };

    const generateOptions = (start, end, interval) => {
        const options = [];
        for (let i = start; i <= end; i += interval) {
            options.push(i.toFixed(2));
        }
        return options;
    };

    return (
        <div className="cv-container">
            <div className="header">
                <h1 className="name">Applicant Information</h1>
            </div>
            <div className="body">
                {applicant && (
                    <div className="cv-item">
                        <div className="section">
                            <h2 className="section-title">Personal Details</h2>
                            <p className="detail">Name: {applicant.applicant_name}</p>
                        </div>
                        <div className="section">
                            <h2 className="section-title">Job Application</h2>
                            <p className="detail">Job Title: {applicant.job_title}</p>
                            <p className="detail">Skills: {applicant.applicant_skills}</p>
                        </div>
                        <div className="section">
                            <h2 className="section-title">Education</h2>
                            <p className="detail">Degree: {applicant.education_degree}</p>
                            <p className="detail">Major: {applicant.education_major}</p>
                            <p className="detail">University: {applicant.education_university}</p>
                            <p className="detail">Graduation Date: {applicant.education_graduation_date}</p>
                            <p className="detail">GPA: {String(applicant.education_gpa)}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="buttons">
                <button className="accept-button" onClick={handleAccept}>Accept</button>
                <button className="reject-button" onClick={handleReject}>Reject</button>
                <div>
                    <label htmlFor="minGpa">Minimum GPA:</label>
                    <select id="minGpa" value={minGpa} onChange={(e) => setMinGpa(e.target.value)}>
                        <option value="">Select Min GPA</option>
                        {generateOptions(1, 4.00, 0.25).map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <button className="check-eligibility-button" onClick={handleCheckEligibility}>Check Eligibility</button>
            </div>
        </div>
    );
}

export default Application;
