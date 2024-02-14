import React , {useState,useEffect}from 'react'
import CompanyFinder from '../../apis/CompanyFinder'

const JobDetails = () => {

  const [jobs,setJobs] = useState([]);

  useEffect (()=>{
    const fetchData = async () =>
    {
      try {
        const response = await CompanyFinder.get ('/User/Jobs');
        console.log (response);

        setJobs(response.data.data.jobs);
        
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchData();
  },[setJobs])

  return (
    <div>
       
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Job Name</th>
            <th scope="col">Salary</th>
            <th scope="col">Description</th>
            <th scope ="col">Company </th>
            {/* <th scope="col">Status</th> */}
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index}>
              <td>{job.name}</td>
              <td>{job.salary}</td>
              <td>{job.description}</td>
              <td> {job.company_name}</td>
              {/* <td>{job.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
        
    </div>
  )
}

export default JobDetails