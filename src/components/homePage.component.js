import React from 'react';
import { Link } from 'react-router-dom';
import homePage from '../pictures/homePage.jpg';
import './homePage.css';
import Blog from './blog.component'
const HomePage = () => {
  const scrollToBlog = () => {
    const blogSection = document.getElementById('about');
    blogSection.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
      <div className="hero" style={{backgroundImage: `url(${homePage})`}}>
        <div className="hero-content">
          <h1>Welcome to Azure Adventures!</h1>
          <p>At our travel agency, we offer a wide range of packages to destinations all over the world. Whether you're looking for a relaxing beach vacation or an adventure-packed trip, we've got you covered.</p>
          <div className="button-container">
            <button onClick={scrollToBlog}>Read More</button>
            <Link to="/api/v1/destination"><button>View Destinations</button></Link>
          </div>
        </div>
      </div>
      <Blog />
      
    </div>
  );
}

export default HomePage;