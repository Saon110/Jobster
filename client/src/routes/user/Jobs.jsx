import React from 'react'
import Navbar from '../../components/user/Navbar'
import JobDetails from '../../components/user/JobDetails'
import SearchBar from '../../components/user/SearchBar'
import Footer from '../../components/Footer'


const Jobs = () => {
  return (
    <div>
        <Navbar/>
        {/* <SearchBar/> */}
        <div className='container'>
        <JobDetails/>
        </div>
        <Footer/>
        
    </div>
  )
}

export default Jobs