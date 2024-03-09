import React from 'react'
import Navbar from '../../components/user/Navbar'
import JobHistoryPage from '../../components/user/JobHistoryPage'
import Footer from '../../components/Footer'

const Job_history = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
            <JobHistoryPage/>
        </div>
        <Footer/>
    </div>
  )
}

export default Job_history