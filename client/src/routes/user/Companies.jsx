import React from 'react'
import { Fragment } from 'react'
import Navbar from '../../components/user/Navbar'
import CompanyList from '../../components/user/CompanyList'
import SearchBar from '../../components/user/SearchBar'
import Footer from '../../components/Footer'

const Companies = () => {
  return (
    <div>
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