// JobDetails.js
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';
// import CompanyList from './CompanyList';

const EmployeeList = () => {
    const { id } = useParams();
    console.log("hello ");
    console.log(id);
    const [employees, setEmployees] = useState([]);
    const [Name, setName] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log(id);

                const response = await CompanyFinder.get(`/Employer/${id}/employees`);
                setEmployees(response.data.data.employees);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await CompanyFinder.get(`/Company/${id}`);
                setName(response.data.data.company.name);
                console.log(response.data.data.company.name);

            } catch (error) {

            }

        };
        fetchData2();
    }, [id])

    return (
        <div>
            <h1>{Name}</h1>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Hired In</th>
                        <th scope="col">Commission Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.employee_name}</td>
                            <td>{employee.employee_email}</td>
                            <td>{employee.hire_date}</td>
                            <td>{employee.commission_pct}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
