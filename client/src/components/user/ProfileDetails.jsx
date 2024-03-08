import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';

import '../../css/ProfileDetails.css'; // Import your CSS file for styling

const ProfileDetails = () => {
    const [profile, setProfile] = useState([]);
    const [skills, setSkills] = useState([]);
    const [myCompany, setMyCompany] = useState({});
    const [isEmployee, setIsEmployee] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token;
                console.log(authToken);

                // Fetch user profile
                const profileResponse = await CompanyFinder.get("/User/Myprofile", {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                console.log(profileResponse.data.data.profile[0]);
                setProfile(profileResponse.data.data.profile[0]);

                // Fetch user skills
                const skillsResponse = await CompanyFinder.get("/User/Myprofile/Skills", {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                console.log(skillsResponse.data.data.skills);
                setSkills(skillsResponse.data.data.skills);

                // Fetch user's company information
                const companyResponse = await CompanyFinder.get("/User/Myprofile/MyCompany", {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
            
                const success = companyResponse.data.success ;
                console.log (companyResponse.data);

                // Check if the user is an employee
                if (success) {
                    const companyData = companyResponse.data.data.company.rows[0];

                    setMyCompany(companyData);
                    setIsEmployee(true);
                } else {
                    setIsEmployee(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [setProfile, setSkills, setMyCompany]);

    const handleUpdateProfile = () => {
        // Logic for updating the profile (you can navigate to a different page or show a modal)
        console.log('Update profile clicked');
        navigate('Update');
    };

    const handleUpdateSkills = () => {
        // Logic for updating skills (you can navigate to a different page or show a modal)
        console.log('Update skills clicked');
        navigate('UpdateSkills');
    };

    const handleLogout = () => {
        // Logic for logging out (you can clear the token and navigate to the login page)
        console.log('Logout clicked');
        localStorage.clear();
        navigate('/');
    };

    const handleResign = async () => {

        // Show a confirmation dialog
        const confirmed = window.confirm("Are you sure you want to resign from this job?");
        
        // If the user confirms, proceed with resignation
        if (confirmed) {
            try {
                console.log('Resign confirmed');
                const authToken = localStorage.token;
                const companyResponse = await CompanyFinder.get("/User/Myprofile/Resign", {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });


            


                
            } catch (error) {
                console.log (error);
                
            }
            console.log ("etate ashche");
            window.location.reload();
            

            // Logic for resigning (similar to the previous example)
            // ...
        } else {
            console.log('Resign canceled');
            // Handle cancellation if needed
        }
        

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
                <div className="buttons-container">
                    <button className="update-profile-button" onClick={handleUpdateProfile}>
                        Update Profile
                    </button>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            {/* Display skills separately to the right of profile details */}
            <div className="skills-section">
                <h3>My Skills</h3>
                <ul>
                    {skills.map((skill) => (
                        <li key={skill.skill_id}>{skill.name}</li>
                    ))}
                </ul>
                <button className="update-skills-button" onClick={handleUpdateSkills}>
                    Update Skills
                </button>
            </div>
            {/* Display company information */}
            <div className="company-section">
                {isEmployee ? (
                    <>
                        <h3>My Job info</h3> 
                        <div>
                            <strong>Job Name:</strong>
                            {myCompany.job_name}
                        </div>
                        <div>
                            <strong>salary : </strong>
                            {myCompany.salary}
                        </div>
                        <div>
                            <strong>Commision pct : </strong>
                            {myCompany.commission_pct}
                        </div>
                        <div>
                            <strong>Company : </strong>
                            {myCompany.company_name}
                        </div>
                        <div>
                            <strong>Hire date: </strong>
                            {myCompany.hire_date}
                        </div>
                        <div className="resign-section">
                            <button className="logout-button" onClick={handleResign}>
                                Resign
                            </button>
                        </div>
                    </>
                ) : (
                    <p>You don't have any job right now.</p>
                )}
            </div>
        </div>
    );
};

export default ProfileDetails;
