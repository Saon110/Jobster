import React, { useState } from 'react'
import CompnayFinder from '../../apis/CompanyFinder';
import { useParams } from 'react-router-dom'
//import { useContext } from 'react';
//import { CompanyContext } from '../../context/CompanyContext';

const AddCompany = () => {

    //const { addCompany } = useContext(CompanyContext);
    const { id } = useParams();
    const [company_id, setID] = useState("")
    const [name, setName] = useState("")
    const [salary, setSalary] = useState("")
    const [description, setDescription] = useState("")
    const [status,setStatus]  = useState ("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await CompnayFinder.post(`/Employer/${id}/addjob`, {
               
                name,
                salary,
                description,
                status
            });
            //addCompany(response.data.data.company);
            console.log(response);


        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="mb-4">
        <form onSubmit={handleSubmit}>
      
          <div className="form-group">
            <label htmlFor="name">Job Title</label>
            <input 
              id="name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              type="text" 
              className="form-control" 
              placeholder="Enter job title" 
              required 
            />
          </div>
      
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input 
              id="salary" 
              value={salary} 
              onChange={e => setSalary(e.target.value)} 
              type="text" 
              className="form-control" 
              placeholder="Enter salary" 
              required 
            />
          </div>
      
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea 
              id="description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="form-control" 
              placeholder="Enter job description" 
              rows="4" 
              required 
            />
          </div>
      
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input 
              id="status" 
              value={status} 
              onChange={e => setStatus(e.target.value)} 
              type="text" 
              className="form-control" 
              placeholder="Enter job status" 
              required 
            />
          </div>
      
          <button type="submit" className="btn btn-primary">Add</button>
      
        </form>
      </div>
      

    )
}

export default AddCompany