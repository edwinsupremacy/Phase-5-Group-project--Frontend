import React, { useState } from 'react';
import './Contact.css';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [messageSent, setMessageSent] = useState(false); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;
        const mailtoLink = `mailto:info@dinemate.com?subject=Contact from ${name}&body=${message}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
        window.location.href = mailtoLink;
        setMessageSent(true); 
    };

    return (
        <><div className="contact-container">
            <div className="contact-section section1">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-section section2">
                <div className="contact-content">
                    <div className="contact-form">
                        <h2>Send us a message</h2>
                        {messageSent ? ( 
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
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required />
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
                        <p className='contact-headers'><strong>Address:</strong> 123 Vintage Auction House St, Vint City, VC 12345</p>
                        <p className='contact-headers'><strong>Phone:</strong> (123) 456-7890</p>
                        <p className='contact-headers'><strong>Email:</strong> info@eauctionease.com</p>
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
            </div>
        </div>
        {/* <Footer /> */}
        </>
    );
};

export default Contact;
