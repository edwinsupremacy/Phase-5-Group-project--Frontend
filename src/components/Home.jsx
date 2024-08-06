import React, { Fragment, useEffect, useState } from 'react';
import { FaSearch, FaCalendarAlt, FaCheck, FaDesktop } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const testimonialsData = [
  "Great experience selling my items! - Emmanuel Waseth",
  "I found exactly what I was looking for! - Mary Stella",
  "The bidding process is user-friendly! - Vaida Mawia",
  "Loved the variety of items available! - Collins Njuguna",
  "The customer support is fantastic! - Edwin Mwangi",
  "Easy to navigate and find great deals! - Steve Otieno",
  "Made amazing sales through this platform! - Leo Messi",
  "The auction process is transparent! - Kylian Mbappe",
  "I loved the secure payment options! - Jude Bellingham",
  "I am glad I found this platform! - Brent Faiyaz",
  "I am thrilled with the results! - Elon Musk",
  "Impressed with the auction process! - Cristiano Ronaldo",
  "I am grateful for this platform! - Diego Maradona",
  "I am impressed with the auction process! - Kobbie Mainoo",
  "I am thrilled with the results! - Neymar Jr.",
  "I am glad I found this platform! - Xavi Hernandez",
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
  
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 2000);

   
    return () => clearInterval(interval);
  }, []);

  
  const homeContainerStyle = {
    backgroundImage: 'url(https://img.pikbest.com/ai/illus_our/20230422/496433dd6ebc4a5b3e3d36817ff489c5.jpg!w700wp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '1000px',
    minHeight: '80vh',
    borderRadius: '45px',
    padding: '20px',
    color: '#fff', 
    marginTop: '100px',
  };

  return (
    <Fragment>
      <div style={homeContainerStyle}>
        <div className='main-container'>
          <h2>Welcome to the Vintage Auction House</h2>
          <p>Where buyers and sellers connect for seamless transactions.</p>
        </div>
        <div className="testimonials-container">
          <h3>User Testimonials</h3>
          <p>{testimonialsData[currentTestimonial]}</p>
        </div>
      </div>
      <div className="cta-container" style={{ marginTop: '10px' }}> {/* Lower the CTA container */}
        <span className="cta-background">
          Are you looking to find your next great acquisition? <Link to="/auction-items" className="cta-link">Browse here</Link>
        </span>
      </div>
    </Fragment>
  );
};

export default Home;
