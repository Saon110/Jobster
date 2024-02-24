import React from 'react'
import Navbar from '../../components/user/Navbar'
import ProfileDetails from '../../components/user/ProfileDetails';

const Myprofile = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
        <ProfileDetails/>
        </div>
       
    </div>
  )
}

export default Myprofile ;