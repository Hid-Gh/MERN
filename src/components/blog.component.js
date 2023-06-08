import React from 'react';
import './blog.css';

const Blog = () => {
  return (
    <div>
      <div class="bodyToBe">
      <div className="about" id="about">
        <h2>About Us</h2>
        <p>We are a team of experienced travel agents who are passionate about helping our clients create unforgettable beach vacations. We believe that everyone deserves a break from the stress of everyday life, and there's no better way to relax than by spending time on the beach.</p>
        <p>Our team has traveled to all the top beach destinations around the world, and we use our firsthand knowledge and expertise to create custom vacation packages tailored to our clients' needs and preferences. We take care of all the details, from flights and accommodations to activities and excursions, so our clients can simply relax and enjoy their vacation.</p>
        <div className="contact">
          <h3>Contact Us</h3>
          <ul>
            <li>123 Main St</li>
            <li>New York, NY 10001</li>
            <li>info@azureAdventure.com</li>
            <li>(123) 456-7890</li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Blog;