'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Like({ postId }) {
  const [btnState, setBtnState] = useState('default');
  const [isLiked, setIsLiked] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token-access') : null;

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
      console.log(response.data);
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
      console.log(response.data);
    } catch (error) {
      console.error('Error disliking post:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <button onClick={isLiked ? handleDislike : handleLike}>
        {isLiked ? 'Dislike' : 'Like'}
      </button>
    </div>
  );
}

export default Like;
