import React from 'react'
import Navbar from '../../components/company/Navbar'
import JobDetail from '../../components/company/JobDetails'
import Footer from '../../components/Footer'

const JobDetails = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
        <JobDetail/>

        </div>
        <Footer/>
    </div>
  )
}

export default JobDetails