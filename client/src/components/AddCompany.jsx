import React, { useState } from 'react'
import CompnayFinder from '../apis/CompanyFinder';
import { useContext } from 'react';
import { CompanyContext } from '../context/CompanyContext';

const AddCompany = () => {

    const { addCompany } = useContext(CompanyContext);
    const [ID, setID] = useState("")
    const [Name, setName] = useState("")
    const [Location, setLocation] = useState("")
    const [URL, setURL] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await CompnayFinder.post("/", {
                ID,
                Name,
                Location,
                URL
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
                        <input value={ID} onChange={e => setID(e.target.value)} type="number" className="form-control" placeholder="Company ID" />
                    </div>
                    <div className="col">
                        <input value={Name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Company Name" />
                    </div>
                    <div className="col">
                        <input value={Location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="Company Address" />
                    </div>
                    <div className="col">
                        <input value={URL} onChange={e => setURL(e.target.value)} type="text" className="form-control" placeholder="Company website" />
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddCompany