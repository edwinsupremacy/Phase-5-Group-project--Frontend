import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <div className="profile-picture">
        <img src={user.profile_picture ? `/profile_pics/${user.profile_picture}` : '/default-profile.png'} alt="Profile" />
      </div>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phone_number}</p>
      </div>
      <Link to="/edit-profile">Edit Profile</Link>
    </div>
  );
};

export default Profile;
