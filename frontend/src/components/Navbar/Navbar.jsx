import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import logo2 from "../../assets/logo2.png"
import notification from "../../assets/notification.png"
import inbox from "../../assets/inbox.png"
import video from "../../assets/video.png"
import defaultDP from "../../assets/defaultDP.jpg"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../../context/AppContext'

const Navbar = () => {
    const { url } = useContext(StoreContext);
    const navigate = useNavigate()
    const [data, setData] = useState({})

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await axios.get(`${url}/api/profile`, { withCredentials: true });
                if (res.data.success) {
                    setData(res.data.user);
                } else {
                    alert(res.data.message)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchProfile();
    }, [])

    return (
        <div className='nav'>
            <div className="left_side">
                <img src={logo2} alt="" />
                <div className="tools">
                    <img className='hide-low-device' src={notification} alt="" />
                    <a href="https://mail.google.com/mail/u/0/#inbox?compose=new" target='_blank'>
                    <img className='hide-low-device' src={inbox} alt="" />
                    </a>
                    <a href="https://www.facebook.com/" target='_blank'>
                    <img className='hide-low-device' src={video} alt="" />
                    </a>
                </div>
            </div>
            <div className="right_side">
                <input type="search" name="search" placeholder='Search...' />
                <div className="profileIcon">
                    <img src={data.profileImage ? `${url}/images/${data.profileImage}` : defaultDP} alt="" onClick={() => navigate("/profile")} />
                </div>
            </div>
        </div>
    )
}

export default Navbar