import React from 'react'
import Header from '../components/Header'
import AddCompany from '../components/AddCompany'
import RestaurentList from '../components/CompanyList'

const Home = () => {
  return (
    <div>
        <Header/>
        <AddCompany/>
        <RestaurentList/>
    </div>
  )
}

export default Home