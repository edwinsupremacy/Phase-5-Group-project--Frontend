import React from 'react';
import './About.css';
import seamlessTransactions from '../assets/images/seamless-transactions.jpeg';
import admin from '../assets/images/admin.jpg';
import onlineSelling from '../assets/images/online-selling.jpg';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <div className="about-page">
        <div className="about-section">
          <div className="about-container">
            <h2>About Our Online Auction Platform</h2>
            <div className="cards-wrapper">
              <div className="card">
                <img src={seamlessTransactions} alt="Seamless Transactions" className="card-image" />
                <h3>Seamless Transactions</h3>
                <p>
                  Facilitate efficient transactions between buyers and sellers. Users can create accounts, list items, place bids, and manage transactions in a user-friendly environment. Real-time bidding ensures a dynamic auction experience.
                </p>
              </div>
              <div className="card">
                <img src={onlineSelling} alt="Seller and Buyer Features" className="card-image" />
                <h3>Seller and Buyer Features</h3>
                <p>
                  Sellers can list items, provide descriptions, set starting bids, and monitor bids. Buyers can search items, place bids, and view bid history. Both parties have tools for a smooth auction experience.
                </p>
              </div>
              <div className="card">
                <img src={admin} alt="Administrative Features" className="card-image" />
                <h3>Administrative Features</h3>
                <p>
                  Admins oversee activities, manage user accounts, and moderate content. They can manage items and users, view payments, and handle disputes. Secure payment systems ensure safe transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
