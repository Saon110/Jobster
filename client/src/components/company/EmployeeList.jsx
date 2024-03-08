import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';

const EmployeeList = () => {
    const { id } = useParams();
    const [employees, setEmployees] = useState([]);

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

    const handleTerminateEmployee = async (employeeId) => {
        try {
            const authToken = localStorage.token;

            // Terminate the employee by sending a request to the server
            await CompanyFinder.delete(`/Employer/employees/${employeeId}`, {
                headers: {
                    authToken: `${authToken}`,
                },
            });

            // Remove the terminated employee from the state
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.employee_id !== employeeId));
        } catch (error) {
            console.error('Error terminating employee:', error);
        }
    };

    return (
        <div>
            <h1>Company</h1>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Hired In</th>
                        <th scope="col">Commission Percentage</th>
                        <th scope="col">Actions</th> {/* Added column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.employee_name}</td>
                            <td>{employee.employee_email}</td>
                            <td>{employee.hire_date}</td>
                            <td>{employee.commission_pct}</td>
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
    );
};

export default EmployeeList;
