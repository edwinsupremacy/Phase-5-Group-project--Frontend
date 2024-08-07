import React, { useState } from 'react';
import './Contact.css';
import { FaFacebook, FaTwitter, FaInstagram, FaStar } from 'react-icons/fa'; // Import icons

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [messageSent, setMessageSent] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [reviews, setReviews] = useState([]); // State to store reviews
    const [reviewData, setReviewData] = useState({
        reviewName: '',
        rating: '',
        reviewMessage: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReviewChange = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        const { name, email, message } = formData;
        const mailtoLink = `mailto:info@dinemate.com?subject=Contact from ${name}&body=${message}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
        window.location.href = mailtoLink;
        setMessageSent(true);
        setLoading(false); 
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            setReviews([...reviews, reviewData]);
            setReviewData({ reviewName: '', rating: '', reviewMessage: '' });
        } else {
         
            console.error('Failed to submit review');
        }
    };
    

    return (
        <div className="contact-container">
            <div className="contact-section section1">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-section section2">
                <div className="contact-content">
                    <div className="contact-form">
                        <h2>Send us a message</h2>
                        {loading && <p className="loading-indicator">Sending...</p>} 
                        {messageSent ? (
                            <p className="feedback-message">Message sent. Thank you for contacting us!</p>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className={formData.name ? 'filled' : ''}>Name</label>
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
                                    <label htmlFor="email" className={formData.email ? 'filled' : ''}>Email</label>
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
                                    <label htmlFor="message" className={formData.message ? 'filled' : ''}>Message</label>
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
                        <p className='contact-headers'><strong>Address:</strong> 123 Vintage Auction House St, Vint City, VC 12345</p>
                        <p className='contact-headers'><strong>Phone:</strong> (254) 756-7890-4895</p>
                        <p className='contact-headers'><strong>Email:</strong> info@Vintageauctionehse.com</p>
                        <p className=''><strong>Hours:</strong> Mon-Fri: 8am-5pm</p>
                    </div>
                </div>
            </div>
            <div className="contact-section section3">
                <h2>We are here to help</h2>
                <p>Contact us for any queries or support. We are always ready to assist you.</p>
            </div>
            <div className="contact-section section4">
                <h2>Stay Connected</h2>
                <p>Follow us on our social media channels for the latest updates.</p>
                <div className="social-media">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                </div>
            </div>

            {/* Vintage-Themed Reviews and Ratings Section */}
            <div className="reviews-section">
                <h2>Customer Reviews</h2>
                <div className="review-form">
                    <h3>Leave a Review</h3>
                    <form onSubmit={handleReviewSubmit}>
                        <div className="form-group">
                            <label htmlFor="reviewName">Name</label>
                            <input
                                type="text"
                                id="reviewName"
                                name="reviewName"
                                value={reviewData.reviewName}
                                onChange={handleReviewChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <select
                                id="rating"
                                name="rating"
                                value={reviewData.rating}
                                onChange={handleReviewChange}
                                required
                            >
                                <option value="" disabled>Select Rating</option>
                                <option value="1">1 - Very Poor</option>
                                <option value="2">2 - Poor</option>
                                <option value="3">3 - Average</option>
                                <option value="4">4 - Good</option>
                                <option value="5">5 - Excellent</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="reviewMessage">Review</label>
                            <textarea
                                id="reviewMessage"
                                name="reviewMessage"
                                value={reviewData.reviewMessage}
                                onChange={handleReviewChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn1">Submit Review</button>
                    </form>
                </div>
                <div className="reviews-list">
                    <h3>What Our Users Say</h3>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <h4>{review.reviewName}</h4>
                                <p className="rating">{[...Array(Number(review.rating))].map((_, i) => <FaStar key={i} />)}</p>
                                <p>{review.reviewMessage}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet. Be the first to leave a review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
