import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = ({ user, setUser }) => {
  const [username, setUsername] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('username', username);
    formData.append('phone_number', phoneNumber);
    formData.append('password', password);
    if (profilePicture) {
      // Assume a separate endpoint for uploading images and getting the URL
      const uploadResponse = await axios.post('/api/upload', profilePicture, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      formData.append('profile_picture', uploadResponse.data.url); // URL of the uploaded image
    } else {
      formData.append('profile_picture', user.profile_picture);
    }

    try {
      const response = await axios.put('/api/user/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUser(response.data); // Update user state with the new data
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Profile Picture:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
