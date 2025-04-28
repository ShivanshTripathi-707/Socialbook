import React, { useEffect, useContext, useState } from 'react';
import "./Post.css";
import defaultDP from "../../assets/defaultDP.jpg";
import { StoreContext } from '../../../context/AppContext';
import axios from "axios";
import { Navigate } from 'react-router-dom';
import like from "../../assets/like.png";
import likeBlue from "../../assets/like-blue.png";
import comments from "../../assets/comments.png";
import feeling from "../../assets/feeling.png";

const Post = () => {
    const { url } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [isAuth, setIsAuth] = useState(null);
    const [likes, setLikes] = useState({}); // postId -> like count
    const [likedByUser, setLikedByUser] = useState({}); // postId -> boolean

    useEffect(() => {
        async function fetchFeed() {
            try {
                const response = await axios.get(`${url}/api/feed`, { withCredentials: true });
                if (response.data.success) {
                    setIsAuth(true);

                    const sortedPosts = response.data.myPost.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setData(sortedPosts);

                    const likeCountMap = {};
                    const likedStatusMap = {};

                    const userRes = await axios.get(`${url}/api/profile`, { withCredentials: true });
                    const userId = userRes.data.user._id;

                    sortedPosts.forEach(post => {
                        likeCountMap[post._id] = post.likes?.length || 0;
                        likedStatusMap[post._id] = post.likes?.includes(userId);
                    });

                    setLikes(likeCountMap);
                    setLikedByUser(likedStatusMap);
                } else {
                    setIsAuth(false);
                }
            } catch (error) {
                console.error("Error fetching feed:", error);
                setIsAuth(false);
            }
        }

        fetchFeed();
    }, []);

    const handleLike = async (postId) => {
        try {
            const res = await axios.get(`${url}/api/like/${postId}`, { withCredentials: true });
            if (res.data.success) {
                setLikedByUser(prev => ({
                    ...prev,
                    [postId]: !prev[postId]
                }));

                setLikes(prev => ({
                    ...prev,
                    [postId]: prev[postId] + (likedByUser[postId] ? -1 : 1)
                }));
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    if (isAuth === null) return <p>Loading...</p>;
    if (isAuth === false) return <Navigate to="/" />;

    return (
        <div className='post'>
            {data.length === 0 ? (
                <p>No posts found</p>
            ) : (
                data.map((post, index) => (
                    <div className="mypost" key={post._id}>
                        <div className="identity">
                            <img
                                src={
                                    post.user?.profileImage
                                        ? `${url}/images/${post.user.profileImage}`
                                        : defaultDP
                                }
                                alt="Profile"
                            />
                            <div className="data">
                                <h2>{`${post.user?.firstName || "Anonymous"} ${post.user?.lastName || ""}`}</h2>
                                <p>{new Date(post.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="post-data">
                            <p>{post.postDesc}</p>
                            {post.postImage && (
                                <img src={`${url}/images/${post.postImage}`} alt="Post" />
                            )}
                            <div className="icons_tools">
                                <div className="myTool">
                                    <img
                                        src={likedByUser[post._id] ? likeBlue : like}
                                        id='likebtn'
                                        alt="like"
                                        onClick={() => handleLike(post._id)}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <p id='likeCount'>{likes[post._id] || 0}</p>
                                </div>

                                <div className="myTool">
                                    <img src={comments} alt="comments" />
                                    <p>20</p>
                                </div>

                                <div className="myTool">
                                    <img src={feeling} alt="feeling" />
                                    <p>20</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Post;
