import React, { useContext, useEffect, useState } from 'react'
import "./App.css"
import banner from "../assets/advertisement.png"
import defaultDP from "../assets/defaultDP.jpg"
import logo from "../assets/logo.png"
import { useNavigate, Navigate } from 'react-router-dom'
import { StoreContext } from '../../context/AppContext'
import axios from "axios"

const Profile = () => {
  const { url } = useContext(StoreContext)
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(`${url}/api/profile`, { withCredentials: true });
        if (res.data.success) {
          setIsAuth(true);
          setData(res.data.user);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    }
    fetchProfile();
  }, [])

  if (isAuth === null) return <p>Loading...</p>;
  if (isAuth === false) return <Navigate to="/" />;

  return (
    <div className='profile'>
      <center><img className='logo' src={logo} alt="" /></center>
      <img className='banner' src={banner} alt="" />
      <div className="profile-data">
        <img
          src={data.profileImage ? `${url}/images/${data.profileImage}` : defaultDP}
          alt="Profile"
        />
        <div className="name-about">
          <h2>{`${data.firstName} ${data.lastName}`}</h2>
          <p>{data.about && data.about.trim() !== "" ? data.about : "Not provided"}</p>
        </div>
      </div>
      <div className="buttons">
        <button>Add Story</button>
        <button onClick={() => navigate("/add-post")}>Add New Post</button>
      </div>
      <div className="profile_other-info">
        <p id='data-info'>Personal Information</p>
        <p>Date of birth : <span>{`${data.Date} ${data.Month} ${data.Year}`}</span></p>
        <p>Father's Name : <span>{data.fatherName && data.fatherName.trim() !== "" ? data.fatherName : "Not provided"}</span></p>
        <p>Gender : <span>{data.gender}</span></p>
        <p>School : <span>{data.school && data.school.trim() !== "" ? data.school : "Not provided"}</span></p>
        <p>Address : <span>{data.address && data.address.trim() !== "" ? data.address : "Not provided"}</span></p>
      </div>
      <div className="your_posts">
        <p id='data-info'>Your posts</p>
        <div className="post_container">
          {
            data.posts
              .filter(post => post.postImage && post.postImage.trim() !== "")
              .map((post, index) => (
                <img key={index} src={`${url}/images/${post.postImage}`} alt={`Post ${index}`} />
              ))
          }
        </div>
      </div>
      <button className='btn1 edit-profile' onClick={() => navigate(`/edit-profile`)}>Edit Profile</button>
    </div>
  )
}

export default Profile
