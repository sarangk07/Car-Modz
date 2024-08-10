'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Comments({ postId }) {
  const [choice, setChoice] = useState('default')
  const [cmt, setCMT] = useState('')
  const [showcmt, setShowCmt] = useState(null)
  const token = localStorage.getItem('token-access');
  const [deletecmt, setDeletCmtState] = useState('default')

  const user = useSelector((state) => state.user);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/comments/',
        { post: postId, content: cmt },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      setChoice('default'); 
      alert('Comment added!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCmt = async (cmtid) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/comments/${cmtid}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('response ', response.status);
      setDeletCmtState(`${cmtid}-deleted`);
      setChoice('default'); 

    } catch (error) {
      console.log('Error deleting comment: ', error);
    }
  };

  const fetchComments = async () => {
    if (!token) {
      console.log('No token');
      return;
    }
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/comments/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShowCmt(response.data); 
      console.log('Comment response: ', response.data);
    } catch (e) {
      console.error('Comment fetching error: ', e);
    }
  };

  const handleShowComments = () => {
    fetchComments();
    setChoice('cmtShow');
  };

  return (
    <>
      {choice === 'cmtCreate' ? (
        <>
          <form onSubmit={handleCommentSubmit}>
            <input
              className='text-zinc-700 rounded-full focus:outline-none focus:ring-0 focus:border-b-cyan-400'
              type="text"
              placeholder='Type here...'
              onChange={(e) => setCMT(e.target.value)}
            />
            <button type='submit' className='pl-3 pb-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
            <div className='flex flex-col justify-around items-center'>
              <p onClick={() => setChoice('default')} className='cursor-pointer'>Cancel</p>
            </div>
          </form>
        </>
      ) : choice === 'cmtShow' ? (
        <div className='flex flex-col justify-between'>
          <div className='flex mb-3'>
            <p onClick={() => setChoice('default')} className='ml-3 cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0L9 3M3 9h12a6 6 0 1 1 0 12h-3" />
              </svg>
            </p>
          </div>
          <div>
            {showcmt?.filter(x => x.post === postId).map((comment) => (
              <div key={comment.id} className='flex p-3'>
                <p className='text-xs mr-3'>{user.id === comment.user.id ? 'You' : comment.user.fullname}</p>
                <p>{comment.content}</p>
                {user.id === comment.user.id && (
                  <button onClick={() => handleDeleteCmt(comment.id)} className='ml-3 text-red-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5L19.625 18.132a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex'>
          <p onClick={handleShowComments} className='cursor-pointer'>Comments</p>
          <button onClick={() => setChoice('cmtCreate')} className='ml-5 cursor-pointer'>Add Comment</button>
        </div>
      )}
    </>
  )
}

export default Comments
