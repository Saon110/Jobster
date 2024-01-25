import React, { useContext ,useState} from 'react'
import { useEffect } from 'react';
import CompnayFinder from '../apis/CompanyFinder';
import { CompanyContext } from '../context/CompanyContext';
import { useNavigate } from 'react-router-dom';

const CompanyList = (props) => {

    const { company, setCompany } = useContext(CompanyContext);
    // const [company, setCompany] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await CompnayFinder.get("/");
                setCompany(response.data.data.companies);

            }
            catch (err) {

            }
        };
        fetchData();

    }, [setCompany])

    const handleDelete = async (id) => {
        try {
            console.log('test', id);
            const response = await CompnayFinder.delete(`/${id}`);
            setCompany(prevCompanies => prevCompanies.filter(company => {
                return company.company_id !== id;
            }));
            
            // setCompany
        } catch (err) {
            console.log(err);
        }
    };

    
    const handleUpdate = (id) => {
        navigate(`/Company/${id}/update`);
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Company</th>
                        <th scope="col">Address</th>
                        <th scope="col">Website</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {company.map((comp, index) => {
                        return (
                            <tr key={index}>
                                <td>{comp.name}</td>
                                <td>{comp.address}</td>
                                <td>{comp.website}</td>
                                <td><button onClick={()=> handleUpdate(comp.company_id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={() => handleDelete(comp.company_id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        );
                    })}
                    {/* <tr>
                    <td>Company 1</td>
                    <td>Address 1</td>
                    <td>Website 1</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>
                <tr>
                    <td>Company 2</td>
                    <td>Address 2</td>
                    <td>Website 2</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>
                <tr>
                    <td>Company 3</td>
                    <td>Address 3</td>
                    <td>Website 3</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default CompanyList