import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const testimonialsData = [
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

  const testimonialsContainerStyle = {
    width: '600px', // Set a specific width for the testimonials container
    margin: '20px auto', // Center the container
    padding: '20px',
    backgroundColor: 'rgba(246, 230, 203, 0.8)',
    borderRadius: '45px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    animation: 'pulse 2s infinite', // Add pulse animation
  };

  const testimonialStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '10px',
  };

  const testimonialImageStyle = {
    borderRadius: '50%', // Make the image circular
    width: '80px', // Set the width
    height: '80px', // Set the height
    objectFit: 'cover', // Cover the image within the circle
    marginBottom: '10px', // Space between image and text
  };

  return (
    <Fragment>
      <div style={homeContainerStyle}>
        <div className='main-container'>
          <h2>Welcome to the Vintage Auction House</h2>
          <p>Where buyers and sellers connect for seamless transactions.</p>
        </div>
        <div style={testimonialsContainerStyle}>
          <h3>User Testimonials</h3>
          <div style={testimonialStyle}>
            <img
              src={testimonialsData[currentTestimonial].image}
              alt={testimonialsData[currentTestimonial].author}
              style={testimonialImageStyle}
            />
            <p>
              {testimonialsData[currentTestimonial].text} -
              <strong> {testimonialsData[currentTestimonial].author}</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="cta-container" style={{ marginTop: '10px' }}>
        <span className="cta-background">
          Are you looking to find your next great acquisition?
          <Link to="/auction-items" className="cta-link"> Browse here</Link>
        </span>
      </div>
    </Fragment>
  );
};

export default Home;
