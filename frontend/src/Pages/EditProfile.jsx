import React, { useContext, useEffect, useState } from 'react'
import "./App.css"
import logo from "../assets/logo.png"
import axios from "axios"
import {StoreContext} from "../../context/AppContext"
import {useNavigate, Navigate} from "react-router-dom"

const EditProfile = () => {
  const [isAuth, setIsAuth] = useState(null)
  const {url} = useContext(StoreContext);
  const navigate = useNavigate()
  const [profileImage, setprofileImage] = useState(false)

  const [data, setData] = useState({
    fatherName : "",
    school : "",
    address : "",
    about : ""
  })

  useEffect(()=> {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${url}/api/profile`, { withCredentials: true })
        if (res.data.success) {
          setIsAuth(true)
        } else {
          setIsAuth(false)
        }
      } catch (err) {
        setIsAuth(false)
      }
    }
    checkAuth()
  }, [url])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value})
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fatherName", data.fatherName)
    formData.append("school", data.school)
    formData.append("address", data.address)
    formData.append("about", data.about)
    formData.append("profileImage", profileImage)

    try {
      let response = await axios.post(`${url}/api/updateProfile`, formData, {withCredentials : true})
      if(response.data.success){
        alert(response.data.message)
        navigate("/profile")
      }else{
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }

  if (isAuth === null) return <p>Loading...</p>;
  if (isAuth === false) return <Navigate to="/" />;

  return (
    <div className='edit-profile-paged'>
      <center><img src={logo} alt="" /></center>
      <div className="add-post-form">
        <form onSubmit={handleEdit}>
          <input type="file" name="profileImage" id='file' onChange={(e)=> setprofileImage(e.target.files[0])} hidden/>
          <label htmlFor="file" id='upload-file' >Upload Profile Image</label>
          <input type="text" name='fatherName' onChange={handleChange} value={data.fatherName} placeholder="father's name"/>
          <input type="text" name='school' onChange={handleChange} value={data.school} placeholder="school name"/>
          <input type="text" name='address' onChange={handleChange} value={data.address} placeholder="Your address"/>
          <textarea name="about" onChange={handleChange} value={data.about} placeholder='Describe yourself....'></textarea>
          <button className='btn2' type='submit'>Update profile</button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile