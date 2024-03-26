import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import NoProfile from '../assets/ProfilePng.png'

const PostCard = ({post,user,deletePost,likePost}) => {
    const [showAll,setShowAll]=useState(0)
    const [showReplay,setShowReplay]=useState(0);
    const [comments,setComments]=useState([])
    const [loading,setLoading]=useState(false);
    const [replayComments,setReplayComments]=useState(0);
    const [showComments,setShowComments]=useState(0)
  return (
    <div className='mb-2 bg-primary p-4 rounded-xl'>
        <div className='flex gap-3 items-center mb-2'>
            <Link to={`/profile/${post?.userId?._id}`}>
                <img src={post?.userId?.profileUrl??NoProfile} alt={post?.userId?.firstName} className='w-14 h-14 object-cover rounded-full' />
            </Link>
        </div>
    </div>
  )
}

export default PostCard