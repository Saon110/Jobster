import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompanyFinder from "../../apis/CompanyFinder";
import { useParams } from "react-router-dom";

const JobUpdate = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.token;
        const response = await CompanyFinder.get(`/Employer/jobs/${id}`, {
          headers: {
            authToken: `${authToken}`,
          },
        });
        setJob(response.data.data.job[0]);
        setName(response.data.data.job[0].name);
        setDescription(response.data.data.job[0].description);
        setSalary(response.data.data.job[0].salary);
        setStatus(response.data.data.job[0].status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.token;
      await CompanyFinder.put(
        `/Employer/jobs/${id}`,
        {
            name: name,
            description: description,
            salary: salary,
            status: status,
        },
        {
          headers: {
            authToken: `${authToken}`,
          },
        }
      );
      navigate(`/Employer/jobs/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Update Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            disabled
            id="name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            value={description}
            disabled
            id="description"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            id="salary"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            id="status"
            className="form-control"
            type="text"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default JobUpdate;
