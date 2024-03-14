import React from 'react'
import Navbar from '../../components/company/Navbar'
import Footer from '../../components/Footer'
import UpdateSkills from '../../components/user/UpdateSkills'
import '../../css/other.css'

const SkillUpdate = () => {
  return (
    <div className='user-image'>
        <Navbar/>
        {/* <SearchBar/> */}
        <div className='container'>
        <UpdateSkills/>
        </div>
        <Footer/>
        
    </div>
  )
}

export default SkillUpdate