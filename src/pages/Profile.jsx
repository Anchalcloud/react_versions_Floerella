import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../components/Navbar.jsx"

const API_URL = import.meta.env.VITE_BACKEND_URL;


function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${API_URL}/api/user/profile`,
          {
            headers: {
              token: token,
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Profile Error:", error);
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
   <> 
    <Navbar/>
    <div className="profile-page">
      <div className="profile-card">

        <h1>My Profile</h1>

        {loading ? (
          <p>Loading profile...</p>
        ) : error ? (
          <p className="profile-error">{error}</p>
        ) : (
          <>
            <div className="profile-info">
              <p>
                <strong>Name:</strong>
                <span>{user.name}</span>
              </p>

              <p>
                <strong>Email:</strong>
                <span>{user.email}</span>
              </p>
            </div>
          </>
        )}

      </div>
    </div>
   </>
  );
}

export default Profile;