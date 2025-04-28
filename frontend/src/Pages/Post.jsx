import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import CenterContent from '../components/Stories/CenterContent'
import LeftNav from '../components/LeftNav/LeftNav'
import Right from '../components/RightSide/Right'

const Post = () => {
  return (
    <div className='feed'>
      <Navbar />
      <div className="main_feed_box">
        <LeftNav/>
        <CenterContent/>
        <Right/>
      </div>
    </div>
  )
}

export default Post