import React, { useState } from 'react'
import CompnayFinder from '../../apis/CompanyFinder';
import { useContext } from 'react';
import { CompanyContext } from '../../context/CompanyContext';

const AddCompany = () => {

    const { addCompany } = useContext(CompanyContext);
    const [company_id, setID] = useState("")
    const [name, setName] = useState("")
    const [address, setLocation] = useState("")
    const [website, setURL] = useState("")
    const [email,setEmail]  = useState ("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await CompnayFinder.post("/", {
               
                name,
                address,
                website,
                email
            });
            addCompany(response.data.data.company);
            console.log(response);


        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Company Name" />
                    </div>
                    <div className="col">
                        <input value={address} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="Company Address" />
                    </div>
                    <div className="col">
                        <input value={website} onChange={e => setURL(e.target.value)} type="text" className="form-control" placeholder="Company website" />
                    </div>
                    <div className="col">
                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" placeholder="Company email" />
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddCompany