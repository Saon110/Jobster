import React from 'react'
import Navbar from '../../components/company/Navbar'
import ProfileDetails from '../../components/company/ProfileDetails'
import Footer from '../../components/Footer'


const Profile = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
        <ProfileDetails/>

        </div>
        <Footer/>
    </div>
  )
}

export default Profile