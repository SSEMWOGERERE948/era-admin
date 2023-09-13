import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Perform any additional logout logic or cleanup tasks here

    // For example, clear any user session or local storage
    localStorage.removeItem('userToken');

    // Reload the page and navigate back to the login page
    window.location.reload();
    history.push('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Hotel Admin Dashboard</h2>

        <div className="dashboard-section">
          <Link to="/bookings" className="dashboard-section button-link">
            <h3>Bookings</h3>
          </Link>
        </div>

        <div className="dashboard-section">
          <Link to="/rooms" className="dashboard-section button-link">
            <h3>Rooms</h3>
          </Link>
        </div>

        <div className="dashboard-section">
          <Link to="/contacts" className="dashboard-section button-link">
            <h3>Contact Information</h3>
          </Link>
        </div>
      </div>
      <button className="back-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
