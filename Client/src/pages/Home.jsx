import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import TopBar from '../components/TopBar'
import ProfileCard from '../components/ProfileCard'
import FriendsCard from '../components/FriendsCard'
import { friends, requests, user } from '../components/data'
import { Link } from 'react-router-dom'
import NoProfile from '../assets/ProfilePng.png'
import CustomeButton from '../components/CustomeButton'

const Home = () => {
  // const {user} =localStorage.getItem('userId')
  //useSelector((state)=>state.user)
  const [users,setusers]=useState(user)
  const [friendRequest,setFriendRequest]=useState(requests)
  console.log(friendRequest);
  return (
    <div className='home w-full px- lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
      <TopBar/>
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
        {/* LIFT */}
        <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
          <ProfileCard user={users} />\
          <FriendsCard friends={users?.friends}/>
        </div>
        {/* CENTER */}
        <div className='flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto'></div>
        {/* RIGHT */}
        <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
          {/* FRIEND REQUEST */}
          <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
            <div className='flex item-center jstify-between text-xl text-ascente-1 pb-2 border-b border-[#66666645]'>
              <span>Friend Request</span>
              <span>{friendRequest?.length}</span>
            </div>
            <div className='w-full flex flex-col gap-4 pt-4'>
              {friendRequest?.map((i)=>(
                <div key={i._id} className='flex item-center justify-between'>
                  <Link to={`profile ${i.requestFrom._id}`} className='w-full flex gap-4 item-center cursor-pointer'>
                    <img src={i?.requestFrom?.profileUrl??NoProfile} alt={i.requestFrom?.firstName} className='w-10 h-10 object-cover rounder-full'/>
                    <div className='flex-1'>
                      <p className='text-base font-medium text-ascent-1'>
                        {i?.requestFrom?.firstName}{i?.requestFrom?.lastName}
                      </p>
                      <span className='text-sm text-ascent-2'>
                        {i.requestFrom?.profession??"No Profession"}
                      </span>

                    </div>
                  </Link>
                  <div className='h-6 flex gap-1'>
                    <CustomeButton titile='Accept' containerStyle="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full" />
                    <CustomeButton titile='Deny ' containerStyle="border border -[#66] text-xs text-ascent-1 px-1.5 py-1 rounded-full" />                  
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* SUGGESTED FRIENDS */}
          <div className='w-full bg-primary shadow-sm rounded-lg px-5 py-5'>
            <div className='flex items-center justuify-between tex-lg text-ascent-1 border-b border-[#66666645]'>
              <span>Friend Suggestion</span>
            </div>
            <div className=''></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home