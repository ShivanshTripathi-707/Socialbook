import React, { useContext, useState } from 'react'
import "./Account.css"
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { StoreContext } from '../../../context/AppContext';

const SignUp = () => {
  const navigate = useNavigate()
  const { url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    Date: "",
    Month: "",
    Year: "",
    email: "",
    password: "",
    gender: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.post(`${url}/api/register`, data)
    if(response.data.success){
      alert(response.data.message)
      navigate("/")
    }else{
      alert(response.data.message)
    }
  };

  return (
    <div className='signUp'>
      <div className="main">
        <center><img src={logo} alt="Logo" /></center>
        <form onSubmit={handleSubmit}>
          <h1>Create a new account</h1>
          <p>Quick and easy</p>
          <hr />
          <div className="names">
            <input type="text" name='firstName' placeholder='Name' required onChange={handleChange} />
            <input type="text" name='lastName' placeholder='Last Name' required onChange={handleChange} />
          </div>
          <div className="otherInfo">
            <span>birthday *</span>
            <div className="selection">
              <select name="Date" onChange={handleChange}>
                {[...Array(31)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
              <select name="Month" onChange={handleChange}>
                {["January","February","March","April","May","June","July","August","September","October","November","December"]
                  .map(month => <option key={month} value={month}>{month}</option>)}
              </select>
              <select name="Year" onChange={handleChange}>
                {Array.from({length: 19}, (_, i) => 2007 + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="otherInfo">
            <span>gender *</span>
            <div className="selection">
              {["Male", "Female", "Other"].map(gender => (
                <div className="option" key={gender}>
                  <label htmlFor={gender}>{gender}</label>
                  <input type="radio" name="gender" value={gender} id={gender} onChange={handleChange} />
                </div>
              ))}
            </div>
          </div>
          <input type="email" name='email' placeholder='Your Email' required onChange={handleChange} />
          <input type="password" name='password' placeholder='Password' required onChange={handleChange} />
          <p>Your contact information may have been uploaded to Facebook by people who use our service. Learn more</p>
          <p>Clicking Sign Up means you agree to our Terms, Privacy Policy and Cookie Policy. You may receive SMS notifications from us. You can opt out at any time.</p>
          <center><button type='submit' className='btn-new-acc'>Sign Up</button></center>
          <Link to="/"><p id='route'>Already have an account</p></Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp
