import React from 'react'
import Navbar from '../../components/company/Navbar'
import UpdateProfile from '../../components/company/UpdateProfile'
import Footer from '../../components/Footer'


const ProfileUpdate = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
        <UpdateProfile/>

        </div>
        <Footer/>
    </div>
  )
}

export default ProfileUpdate