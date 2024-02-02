import React from 'react'
import Header from '../components/Header'
import AddCompany from '../components/AddCompany'
import CompanyList from '../components/CompanyList'

const Home = () => {
  return (
    <div>
        <Header/>
        <AddCompany/>
        <CompanyList/>
    </div>
  )
}

export default Home