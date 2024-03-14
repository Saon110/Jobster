import React from 'react'
import { Fragment } from 'react'
import Navbar from '../../components/user/Navbar'
import CompanyList from '../../components/user/CompanyList'
import SearchBar from '../../components/user/SearchBar'
import Footer from '../../components/Footer'
import '../../css/other.css'

const Companies = () => {
  return (
    <div className='user-image'>
        <Navbar/>
        {/* <SearchBar/> */}
        <div className='container'>
        <CompanyList/>
        </div>
        <Footer/>
    </div>
  )
}

export default Companies