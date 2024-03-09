import React from 'react'
import Navbar from '../../components/user/Navbar'
import InterviewPage from '../../components/user/InterviewPage'
import Footer from '../../components/Footer'

const Interviews = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
            <InterviewPage/>

        </div>
        <Footer/>
    </div>
  )
}

export default Interviews