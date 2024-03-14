import React from 'react'
import Navbar from '../../components/user/Navbar'
import JobHistoryPage from '../../components/user/JobHistoryPage'
import Footer from '../../components/Footer'
import '../../css/other.css'
const Job_history = () => {
  return (
    <div className='user-image'>
        <Navbar/>
        <div className='container'>
            <JobHistoryPage/>
        </div>
        <Footer/>
    </div>
  )
}

export default Job_history