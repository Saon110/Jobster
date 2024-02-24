import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';

import '../../css/ProfileDetails.css'; // Import your CSS file for styling

const ProfileDetails = () => {
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token;
                console.log (authToken);
                const response = await CompanyFinder.get("/User/Myprofile", {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                console.log(response.data.data.profile[0]);
                setProfile(response.data.data.profile[0]);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [setProfile]);

    const handleUpdateProfile = () => {
        // Logic for updating the profile (you can navigate to a different page or show a modal)
        console.log('Update profile clicked');
        navigate ('Update');
    };

    const handleLogout = () => {
        // Logic for logging out (you can clear the token and navigate to the login page)
        console.log('Logout clicked');
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="profile-container">
            <div className="profile-details">
                <h2>My Profile</h2>
                <div>
                    <strong>Name:</strong>
                    {profile.name}
                </div>
                <div>
                    <strong>Email:</strong>
                    {profile.email}
                </div>
                <div>
                    <strong>Address :</strong>
                    {profile.address}
                </div>
                <div>
                    <strong>Birth date:</strong>
                    {profile.birth_date}
                </div>
                {/* Add more user details as needed */}
                <div className="buttons-container">
                    <button className="update-profile-button" onClick={handleUpdateProfile}>
                        Update Profile
                    </button>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
