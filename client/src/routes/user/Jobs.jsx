import React from 'react'
import Navbar from '../../components/user/Navbar'
import JobDetails from '../../components/user/JobDetails'
import SearchBar from '../../components/user/SearchBar'
import Footer from '../../components/Footer'
import '../../css/other.css'

const Jobs = () => {
  return (
    <div className='user-image'>
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