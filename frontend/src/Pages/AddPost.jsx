import React, { useContext, useState } from 'react'
import "./App.css"
import logo from "../assets/logo.png"
import axios from "axios";
import { StoreContext } from "../../context/AppContext"
import { useNavigate } from "react-router-dom"

const AddPost = () => {
  const {url} = useContext(StoreContext)
  const navigate = useNavigate()

  const [postImage, setpostImage] = useState(false)
  const [data, setData] = useState({
    postDesc : ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value})
  }

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("postDesc", data.postDesc)
      formData.append("postImage", postImage);

      let response = await axios.post(`${url}/api/newPost`, formData, {withCredentials : true})
      if(response.data.success){
        alert(response.data.message)
        navigate("/feed")
      }else{
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className='add-post'>
      <center><img className='logo' src={logo} alt="" /></center>
      <div className="add-post-form">
        <form onSubmit={handlePost}>
          <input type="file" name="postImage" onChange={(e)=> setpostImage(e.target.files[0])} id='file' hidden/>
          <label htmlFor="file" id='upload-file'>Upload Image</label>
          <textarea name="postDesc" onChange={handleChange} placeholder='Describe your post....'></textarea>
          <button className='btn2' type='submit'>Upload Post</button>
        </form>
      </div>
    </div>
  )
}

export default AddPost