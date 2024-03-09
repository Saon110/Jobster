import React from 'react'
import Navbar from '../../components/company/Navbar'
import JobUpdate from '../../components/company/JobUdate'
import Footer from '../../components/Footer'


const UpdateJob = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
        <JobUpdate/>

        </div>
        <Footer/>
       
    </div>
  )
}

export default UpdateJob