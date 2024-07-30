import React, { useEffect, useState } from 'react';
import './Home.css';

const testimonialsData = [
  "I had a great experience selling my items! - Emmanuel Waseth",
  "I found exactly what I was looking for! - Mary Stella",
  "The bidding process is so smooth and user-friendly! - Vaida Mawia ",
  "I love the variety of items available! - Collins Njuguna",
  "The customer support is fantastic! - Edwin Mwangi",
  "It's easy to navigate and find great deals! - Steve Otieno",
  "I made some amazing sales through this platform! - Lionel Messi",
  "The auction process is transparent and fair! - Kylian Mbappe",
  "I appreciate the secure payment options! - Jude Bellingham",
  "This platform has become my go-to for auctions! - Lamine Yamal"
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className='main-container'>
        <h2>Welcome to the Online Auction Platform</h2>
        <p>Where buyers and sellers connect for seamless transactions.</p>
      </div>
      <div className="testimonials-container">
        <h3>User Testimonials</h3>
        <p>{testimonialsData[currentTestimonial]}</p>
      </div>
    </div>
  );
};

export default Home;
