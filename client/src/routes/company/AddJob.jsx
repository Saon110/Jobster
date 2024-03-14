import React from 'react'
import JobAdder from '../../components/company/JobAdder'
import Navbar from '../../components/company/Navbar'
import Footer from '../../components/Footer'
import '../../css/other.css'

const AddJob = () => {
  return (
    <div className='site-content'>
      <Navbar />
      <div className='container'>
        <JobAdder />
      </div>
      <Footer />
    </div>
  )
}

export default AddJob