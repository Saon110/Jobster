import React from 'react'
import Navbar from '../../components/user/Navbar'
import InterviewPage from '../../components/user/InterviewPage'
import Footer from '../../components/Footer'
import '../../css/other.css'
const Interviews = () => {
  return (
    <div className='user-image'>
        <Navbar/>
        <div className='container'>
            <InterviewPage/>

        </div>
        <Footer/>
    </div>
  )
}

export default Interviews