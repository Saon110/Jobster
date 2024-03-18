import React from 'react'
import Navbar from '../../components/company/Navbar'
import UpdateProfile from '../../components/company/UpdateProfile'
import Footer from '../../components/Footer'
import '../../css/other.css'

const ProfileUpdate = () => {
  return (
    <div className='site-content'>
        <Navbar/>
        <div className='container'>
        <UpdateProfile/>

        </div>
        <Footer/>
    </div>
  )
}

export default ProfileUpdate