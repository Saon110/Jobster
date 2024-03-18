import React from 'react'
import Apply from '../../components/company/Application'
import Navbar from '../../components/company/Navbar'
import Footer from '../../components/Footer'
import '../../css/other.css'
const Application = () => {
  return (
    <div className='site-content'>
    <Navbar/>
    <div className='container'>
    <Apply/>
    </div>
    <Footer/>
    
</div>
  )
}

export default Application