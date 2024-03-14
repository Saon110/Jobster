import React from 'react'
import Navbar from '../../components/user/Navbar'
import ProfileDetails from '../../components/user/ProfileDetails';
import Footer from '../../components/Footer';
import '../../css/other.css'
const Myprofile = () => {
  return (
    <div className='user-image'>
        <Navbar/>
        <div className='container'>
        <ProfileDetails/>
        </div>
        <Footer/>
       
    </div>
  )
}

export default Myprofile ;