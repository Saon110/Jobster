import React from 'react'
import Navbar from '../../components/user/Navbar'
import JobHistoryPage from '../../components/user/JobHistoryPage'

const Job_history = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
            <JobHistoryPage/>
        </div>
    </div>
  )
}

export default Job_history