import React, { useContext, useState } from 'react'
import "./Account.css"
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import axios from "axios";
import { StoreContext } from '../../../context/AppContext';


const Login = () => {
  const navigate = useNavigate()
  const { url } = useContext(StoreContext)
  
  const [data, setData] = useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value})
  }

  axios.defaults.withCredentials = true;
  const handleLogin = async (e) => {
    e.preventDefault()
    let response = await axios.post(`${url}/api/login`, data)
    if(response.data.success){
      alert(response.data.message)
      navigate("/feed")
    }else{
      alert(response.data.message)
    }
  }

  return (
    <div className='loginPage'>
      <div className="main">
        <div className='left'>
          <img src={logo} alt="" />
          <p>Socialbook helps you to connect with world and worldwide peoples</p>
        </div>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder='Email or phone number' name='email' onChange={handleChange} required/>
          <input type="password" name="password" placeholder='Password' onChange={handleChange} required/>
          <button className='btn1'>Log In</button>
          <p>Or</p>
          <hr />
          <center><button onClick={()=> navigate("/signup")} className='btn-new-acc'>Create a new account</button></center>
        </form>
      </div>
    </div>
  )
}

export default Login