import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';
import SearchBar from './SearchBar';
import '../../css/all.css'; // Import CSS for styling

const EmployeeList = () => {
    const { id } = useParams();
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token;
                const response = await CompanyFinder.get(`/Employer/employees`, {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                setEmployees(response.data.data.employees);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };
        fetchData();
    }, [id]);

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

    const handleTerminateEmployee = async (employeeId) => {
        try {
            const authToken = localStorage.token;
            await CompanyFinder.delete(`/Employer/employees/${employeeId}`, {
                headers: {
                    authToken: `${authToken}`,
                },
            });
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.employee_id !== employeeId));
        } catch (error) {
            console.error('Error terminating employee:', error);
        }
    };

    const handleSearch = async (selectedOption, searchText) => {
        if (selectedOption === 'All') {
            const authToken = localStorage.token;
            const response = await CompanyFinder.get(`/Employer/employees`, {
                headers: {
                    authToken: `${authToken}`,
                },
            });
            setEmployees(response.data.data.employees);
        } else {
            try {
                const authToken = localStorage.token;
                const response = await CompanyFinder.get(`/Employer/employees/Search`, {
                    headers: {
                        type: `${selectedOption}`,
                        value: `${searchText}`,
                        authToken: `${authToken}`,
                    },
                });
                setEmployees(response.data.data.employees);
            } catch (error) {
                console.error('Error searching for employees:', error);
            }
        }
    };

    return (
        <div>
            <h1>{name}</h1>
            <SearchBar
                options={[
                    { value: 'All', label: 'All' },
                    { value: 'Name', label: 'By Name' },
                    { value: 'Salary Range', label: 'By Salary Range' },
                    // Add more options as needed
                ]}
                onSearch={handleSearch}
            />
            <div className="grid-container">
                {employees.map((employee, index) => (
                    <div key={index} className="grid-item">
                        <p><strong>Name:</strong> {employee.name}</p>
                        <p><strong>Salary:</strong> {employee.salary}</p>
                        <p><strong>Job Post:</strong> {employee.job_name}</p>
                        <p><strong>Birth Date:</strong> {employee.birth_date}</p>
                        <p><strong>Contact No:</strong> {employee.contact_no}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Resume:</strong> {employee.resume}</p>
                        <p><strong>Address:</strong> {employee.address}</p>
                        <p><strong>Years of Service:</strong> {employee.years_of_service}</p>
                        <button className="btn btn-danger" onClick={() => handleTerminateEmployee(employee.employee_id)}>
                            Terminate
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeList;
