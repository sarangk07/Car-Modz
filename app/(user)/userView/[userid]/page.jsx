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
    <div className='w-full flex flex-col font-mono md:flex-row h-screen bg-slate-200'>
      {/* User details */}
      <div className='h-[35%] md:h-screen bg-zinc-900 md:w-1/5'>
        <p className='cursor-pointer mb-1' onClick={()=> router.push('/home')}>{`<`}</p>

        <div className='md:hidden flex justify-between'>
          <div className='flex flex-col rounded-lg mb-3 bg-zinc-800'>
            
            {userinfo ? (
              <img className='rounded-lg mx-2 w-40 h-40'  src={userinfo.profile_pic ? `${BASE_URL}${userinfo.profile_pic}` : '/./profile.png'} alt="User pic"  />
            ) : (
              <img src='/./profile.png' alt="Default profile pic" className='rounded-md p-3 w-40 h-40' />
            )}

            <div className='flex text-xs mb-4 pl-3 pt-3 justify-between'>
              <div>
                <p>followers</p>
                <p>{userinfo?.followers?.length || 0}</p>
              </div>
              <div>
                <p>following</p>
                <p>{userinfo?.following?.length || 0}</p>
              </div>
            </div>
          </div>
          <div>
            <div className='p-3 mr-3 cursor-default'>
              <p className='text-lg font-bold'>{userinfo?.fullname || ""}</p>
              <p>{userinfo?.username || ""}</p>
              <p>{userinfo?.car || ""}</p>
              {/* {userinfo?.followers.some(follower => follower.id === user?.id) ? (
                <button onClick={handleUnfollow} className='mt-2'>Unfollow</button>
              ) : (
                <button onClick={handleFollow} className='mt-2'>Follow</button>
              )} */}

              {/* <button className='cursor-pointer'>Follow</button> */}
              <p className='cursor-pointer'>Message</p>
              <p className='cursor-pointer'>Report</p> 
            </div>
          </div>
        </div>



        <div className='hidden md:flex md:flex-col'>
            <div className='flex flex-col p-4'>
            
            {userinfo ? (
              <img src={userinfo.profile_pic ? `${BASE_URL}${userinfo.profile_pic}` : '/./profile.png'} alt="User pic" className='rounded-lg p-3 w-40 h-40' />
            ) : (
              <img src='/./profile.png' alt="Default profile pic" className='rounded-md p-3 w-40 h-40' />
            )}

            <div className='flex text-xs pl-3 pt-3 justify-between'>
              <div>
                <p>followers</p>
                <p>{userinfo?.followers?.length || 0}</p>
              </div>
              <div>
                <p>following</p>
                <p>{userinfo?.following?.length || 0}</p>
              </div>
            </div>
          </div>

          <div>
            <div className='p-3 px-5 flex flex-col items-center cursor-default mr-3'>
              <p className='text-lg font-bold'>{userinfo?.fullname || ""}</p>
              <p>{userinfo?.username || ""}</p>
              <p>{userinfo?.car || ""}</p>
              {/* {userinfo?.followers.some(follower => follower.id === user?.id) ? (
                <button onClick={handleUnfollow} className='mt-2'>Unfollow</button>
              ) : (
                <button onClick={handleFollow} className='mt-2'>Follow</button>
              )} */}
              <p className='cursor-pointer'>Message</p>
              <p className='cursor-pointer'>Report</p> 
            </div>
          </div>

        </div>


      </div>

      {/* Post, content details */}
      <div className='h-[65%] md:h-screen bg-zinc-800 md:w-4/5 overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className='pt-3'>
          
          <div className='mb-5 relative w-fit pr-1 pl-1 md:pr-6 md:pl-6 '>
                    {post.map(x => (
                        <div key={x.id} className='rounded-xl ml-5 mr-5 p-2 mb-10 object-cover bg-zinc-900'>
                            <div className='rounded-xl border-t-4 border-[#1d1d1d] flex justify-between  mb-3 mt-0 pt-3 h-[10%]'>
                                <div className='flex flex-col'>
                                    <h2>{x.title}</h2>
                                    {/* <ContentWithMentions content={x.content} /> */}
                                </div>
                                
                            </div>
                            <img src={x.image} alt="" className='relative w-fit h-[90%] rounded-sm' />
                            <div className='rounded-xl flex-col border-b-4 border-[#1d1d1d] flex  pb-3  mt-0 pt-2 h-[10%]'>
                            <div className='flex items-stretch justify-between'>
                                <div className='flex'>
                                <Like postId={x.id}/>
                                </div>
                                
                                <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>
                                </button>
                                    
                                </div>
                                <div className='flex'>
                                    <Comments postId={x.id}/>
                                </div>
                            </div>
                        </div>
                    ))}
                    {post.filter(x => x.author.id !== user.id).length === 0 && <h1>not found</h1>}
                </div>
        </div>
      </div>
    </div>
  );
}

export default UserView;
