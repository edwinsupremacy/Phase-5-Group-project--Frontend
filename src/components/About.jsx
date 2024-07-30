import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>About Our Online Auction Platform</h2>
      <div className="cards-container">
        <div className="card">
          <h3>Seamless Transactions</h3>
          <p>
            Facilitate efficient transactions between buyers and sellers. Users can create accounts, list items, place bids, and manage transactions in a user-friendly environment. Real-time bidding ensures a dynamic auction experience.
          </p>
        </div>
        <div className="card">
          <h3>Seller and Buyer Features</h3>
          <p>
            Sellers can list items, provide descriptions, set starting bids, and monitor bids. Buyers can search items, place bids, and view bid history. Both parties have tools for a smooth auction experience.
          </p>
        </div>
        <div className="card">
          <h3>Administrative Features</h3>
          <p>
            Admins oversee activities, manage user accounts, and moderate content. They can manage items and users, view payments, and handle disputes. Secure payment systems ensure safe transactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
