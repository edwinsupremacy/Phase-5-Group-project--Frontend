import React, { useState, useEffect } from 'react';
import './Contact.css';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [messageSent, setMessageSent] = useState(false); // State to track if message is sent

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:info@dinemate.com?subject=Contact from ${name}&body=${message}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
    window.location.href = mailtoLink;
    setMessageSent(true); // Set message sent to true after form submission
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <div className="contact-content">
          <div className="contact-form">
            <h2>Send us a message</h2>
            {messageSent ? ( // Conditional rendering of feedback message
              <p className="feedback-message">Message sent. Thank you for contacting us!</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn1">Send Message</button>
              </form>
            )}
          </div>
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p className='contact-headers'><strong>Address:</strong> 123 PlatePal St, Food City, FC 12345</p>
            <p className='contact-headers'><strong>Phone:</strong> (123) 456-7890</p>
            <p className='contact-headers'><strong>Email:</strong> info@auctionease.com</p>
            <p className=''><strong>Hours:</strong> Mon-Fri: 8am-5pm</p>
          </div>
        </div>
        <ReviewsSection />
      </div>
      <Footer />
    </div>
  );
};

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({
    username: '',
    rating: '',
    reviewText: ''
  });

  const handleReviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, reviewData]);
    setReviewData({
      username: '',
      rating: '',
      reviewText: ''
    });
  };

  return (
    <div className="reviews-section">
      <h2>Leave a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={reviewData.username}
            onChange={handleReviewChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating (out of 5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={reviewData.rating}
            onChange={handleReviewChange}
            min="1"
            max="5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reviewText">Review</label>
          <textarea
            id="reviewText"
            name="reviewText"
            value={reviewData.reviewText}
            onChange={handleReviewChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn1">Submit Review</button>
      </form>
      <div className="reviews-list">
        <h2>Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>Username:</strong> {review.username}</p>
            <p><strong>Rating:</strong> {review.rating} / 5</p>
            <p>{review.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
