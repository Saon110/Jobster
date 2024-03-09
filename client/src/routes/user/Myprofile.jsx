import React from 'react'
import Navbar from '../../components/user/Navbar'
import ProfileDetails from '../../components/user/ProfileDetails';
import Footer from '../../components/Footer';

const Myprofile = () => {
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

export default Myprofile ;