import React from 'react'
// import { useParams } from 'react-router-dom'
import Navbar from '../../components/company/Navbar'
import JobList from '../../components/company/JobList'
import { Link } from 'react-router-dom'


const Jobs = () => {

  // const { id } = useParams()


  return (
    <div>
        <Navbar/>
        <JobList/>
        <h1>
  <Link
    to={`/Employer/addjob`}
    style={{
      display: 'inline-block',
      padding: '8px 16px', // Increased padding
      backgroundColor: '#000',
      color: '#fff',
      textDecoration: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      fontSize: '16px', // Increased font size
    }}
  >
    Add a job
  </Link>
</h1>




    </div>
  )
}

export default Jobs