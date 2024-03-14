import React from 'react'
import Header from '../../components/user/Header'
import AddCompany from '../../components/user/AddCompany'
import CompanyList from '../../components/user/CompanyList'
import Navbar from '../../components/user/Navbar'
import Footer from '../../components/Footer'
import '../../css/userHome.css'

const Home = () => {
  return (
    <div className="site-content">
      <Navbar />
      
      <Footer />
    </div>
  )
}

export default Home