import React from 'react'
import Navbar from '../../components/company/Navbar'
import ProfileDetails from '../../components/company/ProfileDetails'
import Footer from '../../components/Footer'
import '../../css/other.css'

const Profile = () => {
  return (
    <div className='site-content'>
        <Navbar/>
        <div className='container'>
        <ProfileDetails/>

        </div>
        <Footer/>
    </div>
  )
}

export default Profile