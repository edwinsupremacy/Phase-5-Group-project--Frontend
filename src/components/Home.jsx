import React, { useEffect, useState } from 'react';
import './Home.css';

const testimonialsData = [
  "Great experience selling my items! - Emmanuel Waseth",
  "I found exactly what I was looking for! - Mary Stella",
  "The bidding process is user-friendly! - Vaida Mawia ",
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
