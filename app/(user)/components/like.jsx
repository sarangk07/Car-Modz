'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';


function Like({ postId }) {
  const [btnState, setBtnState] = useState('default');
  const [isLiked, setIsLiked] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token-access') : null;
  const [likes, setLikes] = useState(null);


  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/${postId}/like-status/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsLiked(response.data.is_liked);
      } catch (error) {
        console.error('Error fetching like status:', error.response?.data || error.message);
      }
    };



    fetchLikeStatus();
  }, [postId]);


  useEffect(() => {
    const likeCount = async () => {
      try {
          const token = localStorage.getItem('token-access');
          const response = await axios.get('http://127.0.0.1:8000/api/likes/', {
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });
          console.log('likes::::::::: ', response.data);
          setLikes(response.data)
      } catch (e) {
          console.log(e, 'error');
      }
  };

  likeCount();


  },[btnState])

  const handleLike = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/likes/',
        { post: postId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLiked(true);
      setBtnState('liked');

      // toast.custom(
      //   <div style={{ backgroundColor: 'transparent', padding: 0 }}>
      //     <img src="./1PyX.gif" alt="like gif" style={{ backgroundColor: 'transparent' }} />
      //   </div>,
      //   {
      //     duration: 1000,
      //     style: {
      //       background: 'transparent',
      //       boxShadow: 'none',
      //     },
      //   }
      // );
      toast.success('')
      
      
      console.log(response.data,': like response');
    } catch (error) {
      console.error('Error liking post:', error.response?.data || error.message);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/posts/${postId}/dislike/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLiked(false);
      setBtnState('default');
      console.log(response.data,': dislike response');
    } catch (error) {
      console.error('Error disliking post:', error.response?.data || error.message);
    }
  };

  return (
    <>
    <Toaster
      
      position="top-center"
      reverseOrder={false}
    />
    <div className='flex'>

      <button onClick={isLiked ? handleDislike : handleLike} className='mr-3'>
        {isLiked ? 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6  text-cyan-400">
        <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
      </svg>
      
      
        :
      
         
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
      </svg>
      }
      </button>
      <p className='text-cyan-400 font-extrabold'>
      {likes && likes.filter(like => like.post === postId).length}
      </p>
    </div>
    </>
  );
}

export default Like;
