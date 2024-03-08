import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../../css/updateskill.css'; // Import a custom CSS file for styling

const UpdateSkills = () => {
    const navigate = useNavigate();

    const [allSkills, setAllSkills] = useState([]);
    const [userSkills, setUserSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token;

                // Fetch all skills
                const skillsResponse = await CompanyFinder.get("/User/Jobs/Skills", {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                setAllSkills(skillsResponse.data.data.skills);

                // Fetch user's existing skills
                const userSkillsResponse = await CompanyFinder.get("/User/Myprofile/Skills", {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                const userSkillsData = userSkillsResponse.data.data.skills;
                setUserSkills(userSkillsData);

                // Pre-select user's existing skills
                setSelectedSkills(userSkillsData.map((skill) => ({
                    label: skill.name,
                    value: skill.skill_id
                })));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleSelectChange = (selectedOptions) => {
        // Update selected skills when the dropdown selection changes
        setSelectedSkills(selectedOptions);
        // console.log (selectedSkills);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log ("hello hi");

       // console.log (selectedSkills);
        try {
            const authToken = localStorage.token;
            console.log (authToken);

            console.log (selectedSkills);
            // Update user's skills on submission
            const selectedSkillIds = selectedSkills.map(skill => skill.value);

            console.log (selectedSkillIds);
            const response =  await CompanyFinder.put("/User/Myprofile/Skills/Update", { skills: selectedSkillIds },         {
                headers : {
                    authToken: `${authToken}`, 
                }
            }  
            );
            
            console.log('Skills updated successfully!');
        } catch (error) {
            console.log(error);
        }
        navigate('/User/Myprofile');
    };

    return (
        <div className='container'>
            <h2>Update Skills</h2>
            <form onSubmit={handleSubmit}>
                <h3>Skills</h3>
                <Select
                    isMulti
                    value={selectedSkills}
                    onChange={handleSelectChange}
                    options={allSkills.map(skill => ({ label: skill.name, value: skill.skill_id }))}
                />

                <button type="submit">Update Skills</button>
            </form>
        </div>
    );
};

export default UpdateSkills;
