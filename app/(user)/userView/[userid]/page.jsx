'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAUserInfo } from '@/app/utils/fetchUser';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Comments from '../../components/comments';
import Like from '../../components/like';
import { unfollowUser,followUser } from '@/app/utils/fetchUser';
import { useDispatch } from 'react-redux';

import { RotateLoader } from 'react-spinners';


function UserView({ params }) {
  const [userId, setUserid] = useState(null);
  const [userinfo, setUserinfo] = useState(null);
  const [post,setPosts] = useState([]);
  const router = useRouter();
  const BASE_URL = 'http://127.0.0.1:8000';
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
  

  const user = useSelector((state) => state.user);


  useEffect(() => {
    if (params?.userid) {
      setUserid(params.userid);
      setLoading(true)
      const fetchUserInfo = async () => {
        try {
          const response = await fetchAUserInfo(params.userid); 
          setUserinfo(response);
        } catch (error) {
          console.error("Failed to fetch user info", error);
        }
      };

      fetchUserInfo();
      setLoading(false)
    } else {
      setUserid(null);
      setUserinfo(null); 
    }
  }, [params]);


  const handleFollow = async () => {
    await followUser(userinfo.id, dispatch);
    setUserinfo({
      ...userinfo,
      followers: [...userinfo.followers, { id: user.id }],
    });
  };
  
  const handleUnfollow = async () => {
    await unfollowUser(userinfo.id, dispatch);
    setUserinfo({
      ...userinfo,
      followers: userinfo.followers.filter(follower => follower.id !== user.id),
    });
  };
  




  useEffect(() => {
    const token = localStorage.getItem('token-access');
    setLoading(true)
    const fetchPost = async () => {
      if (!userId) {
        console.log('User ID is not available');
        return;
      }
  
      if (!token) {
        console.error('No access token found in localStorage');
        return;
      }
  
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/user-posts/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        setPosts(response.data);
        console.log('postsssss..........',response.data);
        
      } catch (error) {
        if (error.response) {
          
          console.error('Error fetching posts:', error.response.status, error.response.data);
        } else if (error.request) {
          
          console.error('No response received:', error.request);
        } else {
          
          console.error('Error setting up request:', error.message);
        }
      }
    };
  
    fetchPost();
    setLoading(false)
  }, [userId]);
  if(loading){
    return <div className='flex flex-col w-full h-screen justify-center items-center'>
      <RotateLoader color='#35ebc5'/>
    </div>;
  }


  return (

    <div className='flex flex-col md:flex-row h-screen text-zinc-800 bg-blue-200'>
  
    {/* User details */}
    <div className='bg-blue-200 md:w-1/5 h-auto md:h-full p-4 flex flex-col items-center'>
        <p className='cursor-pointer mb-4 text-white' onClick={() => router.push('/home')}>{`< Back`}</p>

        <div className='flex flex-col items-center text-zinc-800 mb-6'>
            {userinfo ? (
                <img className='rounded-full w-32 h-32 border-4 border-blue-300' src={userinfo.profile_pic ? `${BASE_URL}${userinfo.profile_pic}` : ''} alt="User pic" />
            ) : (
                <img src='./profile.png' alt="Default profile pic" className='rounded-full w-32 h-32 border-4 border-zinc-800' />
            )}

            <div className='text-center text-xs text-zinc-800 mt-2'>
                <p>Followers: {userinfo?.followers?.length || 0}</p>
                <p>Following: {userinfo?.following?.length || 0}</p>
            </div>
        </div>

        <div className='text-center text-zinc-800'>
            <p className='text-lg font-bold'>{userinfo?.fullname || "User Name"}</p>
            <p>@{userinfo?.username || "username"}</p>
            <p>{userinfo?.car || "Car Model"}</p>
            <div className='mt-4 space-y-2'>
                <p className='cursor-pointer hover:text-blue-400'>Message</p>
                <p className='cursor-pointer hover:text-red-400'>Report</p> 
            </div>
        </div>
    </div>

    {/* Post content details */}
    <div className='bg-zinc-800 md:w-4/5 h-auto md:h-full p-3  md:overflow-y-scroll'>
        <div className='pt-3'>
            {post.length === 0 ? (
                <h1 className='text-white text-center'>No posts found</h1>
            ) : (
                post.map(x => (
                    <div key={x.id} className='bg-zinc-900 rounded-xl p-4 mb-6 shadow-lg transition-transform transform hover:scale-[1.01] '>
                        <h2 className='text-xl font-semibold text-white'>{x.title}</h2>
                        {x.image && (
                            <img src={x.image} alt="" className='w-full h-auto md:h-auto md:w-72 rounded-lg mt-2' />
                        )}
                        <div className='flex justify-between items-center mt-3'>
                            <Like postId={x.id} />
                            <Comments postId={x.id} />
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
</div>
  );
}

export default UserView;
