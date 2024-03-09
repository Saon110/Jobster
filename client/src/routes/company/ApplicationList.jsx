import React from 'react'
import Navbar from '../../components/company/Navbar'
import Applications from '../../components/company/ApplicationList'
import Footer from '../../components/Footer'

// import { Link } from 'react-router-dom'


const ApplicationList = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
        <Applications/>
        </div>
        <Footer/>
        
    </div>
  )
}

export default ApplicationList
