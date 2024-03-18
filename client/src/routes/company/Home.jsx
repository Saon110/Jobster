import React from 'react';
import HomePage from '../../components/company/Home';
import Footer from '../../components/Footer';
import '../../css/home.css'; // Import CSS file for styling
import Navbar from '../../components/company/Navbar';

const Home = () => {
  return (
    <div className="site-content">
      <Navbar />
      <div className="container">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
