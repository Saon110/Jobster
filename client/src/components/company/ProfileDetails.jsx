// ProfileDetails.js

import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';
import '../../css/CompanyProfileDetails.css'; // Import CSS file for styling

const ProfileDetails = () => {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token;
                const profileResponse = await CompanyFinder.get("/Employer/profile", {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                setProfile(profileResponse.data.data.profile[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const defaultLogo = 'https://via.placeholder.com/100'; // Default logo placeholder

    // Function to render stars based on review score
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(profile.review);
        const remainder = profile.review - fullStars;
        const halfStar = remainder;
        // >= 0.25 && remainder < 0.75 ? 1 : 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }

        if (halfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }

        const emptyStars = 5 - fullStars - halfStar;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={i + fullStars + halfStar} className="far fa-star"></i>);
        }

        return stars;
    };

    // ProfileDetails.js

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h2>{profile.name}</h2>
                    <button className="logout-button" onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/');
                    }}>Logout</button>
                </div>
                <div className="profile-body">
                    <div className="left-section">
                        <div className="profile-details">
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Address:</strong> {profile.address}</p>
                            <p><strong>Website:</strong> {profile.website}</p>
                            <p><strong>Total Jobs:</strong> {profile.total_jobs}</p>
                            <p><strong>Total Employees:</strong> {profile.total_employees}</p>
                            <p><strong>Available Jobs:</strong> {profile.available_jobs}</p>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="logo-and-review">
                            <div className="logo-container">
                                <img src={profile.logo || defaultLogo} alt="Company Logo" className="logo-image" />
                            </div>
                            <div className="review">
                                <p>Review: {renderStars()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="update-profile-button" onClick={() => { navigate('/Employer//update') }}>Update Profile</button>
            </div>
        </div>
    );


};

export default ProfileDetails;
