import React from 'react'
import "./LeftNav.css"
import news from "../../assets/news.png"
import groups from "../../assets/group.png"
import friends from "../../assets/friends.png"
import marketplace from "../../assets/marketplace.png"
import watch from "../../assets/watch.png"
import notification from "../../assets/notification.png"
import inbox from "../../assets/inbox.png"
import video from "../../assets/video.png"

const LeftNav = () => {

  return (
    <div>
        <div className="left-side-nav-feed">
          <div className="grp_tools hide-high-device">
          <img className='special-nav-style' src={notification} alt="" />
          <p className='hide-low-device'>Notifications</p>
          </div>
          <a href="https://mail.google.com/mail/u/0/#inbox?compose=new">
          <div className="grp_tools hide-high-device">
          <img className='special-nav-style' src={inbox} alt="" />
          <p className='hide-low-device'>Inbox</p>
          </div>
          </a>
          <a href="https://www.facebook.com/" target='_blank'>
          <div className="grp_tools hide-high-device">
          <img className='special-nav-style' src={video} alt="" />
          <p className='hide-low-device'>Video</p>
          </div>
          </a>
          <a href="https://timesofindia.indiatimes.com/" target='_blank'>
          <div className="grp_tools">
            <img src={news} alt="" />
            <p className='hide-low-device'>Latest News</p>
          </div>
          </a>
          <div className="grp_tools">
            <img src={friends} alt="" />
            <p className='hide-low-device'>Friends</p>
          </div>
          <a href="https://github.com/" target='_blank'>
          <div className="grp_tools">
            <img src={groups} alt="" />
            <p className='hide-low-device'>Group</p>
          </div>
          </a>
          <a href="https://www.flipkart.com/" target='_blank'>
          <div className="grp_tools">
            <img src={marketplace} alt="" />
            <p className='hide-low-device'>Marketplace</p>
          </div>
          </a>
          <a href="https://www.youtube.com/" target='_blank'>
          <div className="grp_tools">
            <img src={watch} alt="" />
            <p className='hide-low-device'>Watch</p>
          </div>
          </a>
          <p className='see-more'>See More</p>
          <hr />
        </div>
    </div>
  )
}

export default LeftNav