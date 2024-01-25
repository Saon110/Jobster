import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import CompanyFinder from '../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';

const CompanyUpdate = (props) => {
  const {companyId} = useParams();
  const navigate = useNavigate();
  console.log(companyId);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await CompanyFinder.get(`/${companyId}`);
      console.log(response.data.data.company);
      setName(response.data.data.company.name);
      setAddress(response.data.data.company.address);
      setWebsite(response.data.data.company.website);
    }
    fetchData();
  }, [companyId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCompany = await CompanyFinder.put(`/${companyId}`, {
      name,
      address,
      website
    });

    console.log(updatedCompany);
    navigate(`/`);
    
  }

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input value={address} onChange={e => setAddress(e.target.value)} id="address" className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="website">URL</label>
          <input value={website} onChange={e => setWebsite(e.target.value)} id="website" className="form-control" type="text" />
        </div>
        <button onClick ={(e) => handleSubmit(e)} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CompanyUpdate