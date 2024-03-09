import React from 'react'
import Navbar from '../../components/user/Navbar'
import ApplicationPage from '../../components/user/ApplicationPage'
import Footer from '../../components/Footer'

const Applications = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
          <ApplicationPage/>
      

        </div>
        <Footer/>
        
        
        </div>
  )
}

export default Applications