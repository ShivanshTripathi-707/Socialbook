import React from 'react'
import profile_pic from "../../assets/profile-pic.png"
import "./Stories.css"
import Post from '../Post/Post'

const CenterContent = () => {
  return (
    <div>
        <div className="center-side-feed">
          <div className="center-content">
            <div className="story_wrapper">
            <div className="story">
              <img src={profile_pic} className='story-bg' alt="" />
              <img src={profile_pic} className='story-bg' alt="" />
              <img src={profile_pic} className='story-bg' alt="" />
              <img src={profile_pic} className='story-bg' alt="" />
              <img src={profile_pic} className='story-bg' alt="" />
              <img src={profile_pic} className='story-bg' alt="" />
              <img src={profile_pic} className='story-bg' alt="" />
              <img src={profile_pic} className='story-bg' alt="" />
            </div>
            </div>
          <Post/>
          </div>
        </div>
    </div>
  )
}

export default CenterContent