import React, { Fragment, useEffect, useState } from 'react';
import { FaSearch, FaCalendarAlt, FaCheck, FaDesktop } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
    <Fragment>
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
      <div className="images-container">
        <img src="https://cdn.shopify.com/s/files/1/0526/8658/6018/files/hero02_aa0c3ccb-58f4-4368-b1e6-8c96cbefc872_1024x1024.png?v=1685874270" alt="Vintage Watch" className="image" />
        <img src="https://lh3.googleusercontent.com/p/AF1QipNzAtQ_vEgpJ-uTghQDBkyWu5eDSh41iK_rZ0hx=s680-w680-h510" alt="Vintage Car" className="image" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfXKGBZLSG2wlO3G857LZEML1OHD5hYG1avA&s" alt="Vintage Wall Clock" className="image" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPZRuX5biVMI7TEfkkdCtKDqrgQ9cvCu4Sg&s" alt="Vintage Mirror" className="image" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9DZ-ScHADyif_YskHFUHk17WSAAeNpAFlOg&s" alt="Vintage Furniture" className="image" />
      </div>

      <div className="how-it-works">
        <h2>Simple Steps to Your Next Great Tech Acquisition</h2>
        <ol>
          <li>
            <h3><FaSearch /> Discover</h3>
            <p>Browse our curated list of top-rated tech devices</p>
          </li>
          <li>
            <h3><FaCalendarAlt /> Select</h3>
            <p>Choose your preference</p>
          </li>
          <li>
            <h3><FaCheck /> Book</h3>
            <p>Instantly confirm your order details</p>
          </li>
          <li>
            <h3><FaDesktop /> Innovate</h3>
            <p>Pick up and enjoy your perfectly prepared tech space at delivery point</p>
          </li>
        </ol>
      </div>
      <section className="special-offer">
        <h2>New to TechMarz?</h2>
        <p>Enjoy 20% off your first order</p>
        <Link to="/book" className="cta-button pulse">Claim Offer</Link>
      </section>
    </Fragment>
  );
};

export default Home;
