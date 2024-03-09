import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';
import SearchBar from './SearchBar';

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
            <div>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-primary">
                            <th scope="col">Name</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Job Post</th>
                            <th scope="col">Birth Date</th>
                            <th scope="col">Contact No</th>
                            <th scope="col">Email</th>
                            <th scope="col">Resume</th>
                            <th scope="col">Address</th>
                            <th scope="col">Years of Service</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.name}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.job_name}</td>
                                <td>{employee.birth_date}</td>
                                <td>{employee.contact_no}</td>
                                <td>{employee.email}</td>
                                <td>{employee.resume}</td>
                                <td>{employee.address}</td>
                                <td>{employee.years_of_service}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleTerminateEmployee(employee.employee_id)}>
                                        Terminate
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
