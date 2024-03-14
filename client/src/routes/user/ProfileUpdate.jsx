import React from 'react'
import Navbar from '../../components/company/Navbar'
import Footer from '../../components/Footer'
import UpdateProfle from '../../components/user/UpdateProfile'
import '../../css/other.css'

const SkillUpdate = () => {
  return (
    <div className='user-image'>
        <Navbar/>
        {/* <SearchBar/> */}
        <div className='container'>
        <UpdateProfle/>
        </div>
        <Footer/>
        
    </div>
  )
}

export default SkillUpdate