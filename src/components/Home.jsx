import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaStar, FaGift, FaCog, FaSearch, FaGavel, FaCheck, FaHistory, FaArrowRight } from 'react-icons/fa';
// import backgroundImage from '../assets/images/VintageBackground.jpeg';
import vintageAward from '../assets/images/VintageAward.jpeg';
import antiqueAward from '../assets/images/AntiqueAward.jpeg';
import Footer from './Footer';
import './Home.css';

const testimonials = [
  {
    text: "Great experience selling my items!",
    author: "Emmanuel Waseth",
    image: "https://png.pngtree.com/png-clipart/20231020/original/pngtree-avatar-of-a-brunette-man-png-image_13379741.png"
  },
  {
    text: "I found exactly what I was looking for!",
    author: "Mary Stella",
    image: "https://png.pngtree.com/png-vector/20240724/ourmid/pngtree-administrator-admin-avatar-png-image_12853668.png"
  },
  {
    text: "The bidding process is user-friendly!",
    author: "Vaida Mawia",
    image: "https://png.pngtree.com/png-vector/20240724/ourmid/pngtree-administrator-admin-avatar-png-image_12853671.png"
  },
  {
    text: "Loved the variety of items available!",
    author: "Collins Njuguna",
    image: "https://png.pngtree.com/png-clipart/20231020/original/pngtree-avatar-of-a-brunette-man-png-image_13379740.png"
  },
  {
    text: "The customer support is fantastic!",
    author: "Edwin Mwangi",
    image: "https://png.pngtree.com/png-clipart/20231020/original/pngtree-avatar-of-a-brunette-man-png-image_13379742.png"
  },
  {
    text: "Easy to navigate and find great deals!",
    author: "Steve Otieno",
    image: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
  },
  {
    text: "Made amazing sales through this platform!",
    author: "Leo Messi",
    image: "https://b.fssta.com/uploads/application/soccer/headshots/711.vresize.350.350.medium.24.png"
  },
  {
    text: "The auction process is transparent!",
    author: "Kylian Mbappe",
    image: "https://b.fssta.com/uploads/application/soccer/headshots/40670.vresize.350.350.medium.72.png"
  },
  {
    text: "I loved the secure payment options!",
    author: "Jude Bellingham",
    image: "https://b.fssta.com/uploads/application/soccer/headshots/71310.vresize.350.350.medium.84.png"
  },
  {
    text: "Impressed with the auction process!",
    author: "Cristiano Ronaldo",
    image: "https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.19.png"
  },
  {
    text: "I am thrilled with the results!",
    author: "Neymar Jr.",
    image: "https://b.fssta.com/uploads/application/soccer/headshots/713.vresize.350.350.medium.34.png"
  },
];

const HomePage = () => {
  const [auctionCount, setAuctionCount] = useState(500);
  const [greeting, setGreeting] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // const backgroundImageStyle = {
  //   content: '',
  //   position: 'absolute',
  //   top: '0',
  //   left: '0',
  //   width: '100%',
  //   height: '100%',
  //   backgroundImage: `url(${backgroundImage})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   zIndex: '-1',
  // };

  useEffect(() => {
    // Simulating auction count increase
    const auctionInterval = setInterval(() => {
      setAuctionCount(prevCount => prevCount + 1);
    }, 5000);

    // Set greeting based on time of day
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good morning');
      else if (hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');
    };

    updateGreeting();
    const greetingInterval = setInterval(updateGreeting, 60000); // Update greeting every minute

    // Rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => {
      clearInterval(auctionInterval);
      clearInterval(greetingInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <><div className="home-page">
      {/* <div style={backgroundImageStyle}></div> */}
      <div className="hero-section">
        <div className="hero-grid">
          <div className="hero-image"></div>
          <div className="hero-content">
            <span className="greeting">{greeting}!</span>
            <h1>Discover Rare Treasures at Vintage Auctions</h1>
            <h2 className="secondary-headline">Browse, Bid, and Own a Piece of History</h2>
            <p className="secondary-subheadline">Experience the thrill of auctions from the comfort of your home</p>
            <Link
              className="cta-button pulse"
              to="/auction-items"
              style={{
                display: 'inline-block',
                marginTop: '2rem',
                fontSize: '1.25rem',
                textDecoration: 'none',
                color: '#FFF',
                backgroundColor: '#A0937D',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                transition: 'background-color 0.3s, color 0.3s',
                border: '2px solid #A0937D',
                textAlign: 'center',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#B6C7AA';
                e.currentTarget.style.color = '#3C3C3C';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#A0937D';
                e.currentTarget.style.color = '#FFF';
              }}
            >
              Explore Auctions
            </Link>
            <div className="social-proof">
              <span>{auctionCount.toLocaleString()}+</span>
              <p className='socialproof-header'>Items Sold</p>
            </div>

            <div className="hero-benefits">
              <h3>Why Choose Vintage Auctions?</h3>
              <div className="benefits">
                <div className="benefit-item">
                  <FaClock className="benefit-icon" />
                  <span id='benefit-header'>Timeless Collections</span>
                </div>
                <div className="benefit-item">
                  <FaStar className="benefit-icon" />
                  <span id='benefit-header'>Authentic Pieces</span>
                </div>
                <div className="benefit-item">
                  <FaGift className="benefit-icon" />
                  <span id='benefit-header'>Exclusive Offers</span>
                </div>
                <div className="benefit-item">
                  <FaCog className="benefit-icon" />
                  <span id='benefit-header'>Easy Bidding</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>
            <h3><FaSearch /> Discover</h3>
            <p>Browse our curated selection of vintage items</p>
          </li>
          <li>
            <h3><FaGavel /> Bid</h3>
            <p>Place your bids on desired items</p>
          </li>
          <li>
            <h3><FaCheck /> Win</h3>
            <p>Secure your winning bids</p>
          </li>
          <li>
            <h3><FaHistory /> Collect</h3>
            <p>Own a piece of history</p>
          </li>
        </ol>
      </section>

      <section className="featured-tech-spaces">
        <div className="featured-card">
          <FaHistory className="featured-icon" />
          <h2>Explore Antique Collections</h2>
          <p>Find unique pieces that tell stories of the past</p>
          <Link to="/auction-items" className="view-all-btn">
            View All Items
            <FaArrowRight className="arrow-icon" />
          </Link>
        </div>
      </section>

      <section className="testimonial">
        <h2>What Our Collectors Say</h2>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`testimonial-item ${index === currentTestimonial ? 'active' : ''}`}>
            <div className="testimonial-content">
              <img className="testimonial-avatar" src={testimonial.image} alt={`${testimonial.author}'s Avatar`} />
              <p className="testimonial-text">{testimonial.text}</p>
              <h3 className="testimonial-author">{testimonial.author}</h3>
            </div>
          </div>
        ))}
      </section>

      <section className="vintage-awards">
        <h2>Award-Winning Auction House</h2>
        <div className="awards-grid">
          <div className="award-item">
            <img src={vintageAward} alt="Vintage Award" className="award-image" />
            <p>Best Vintage Auction House 2022</p>
          </div>
          <div className="award-item">
            <img src={antiqueAward} alt="Antique Award" className="award-image" />
            <p>Excellence in Antique Sales 2021</p>
          </div>
        </div>
      </section>
    </div><Footer /></>
  );
};

export default HomePage;
