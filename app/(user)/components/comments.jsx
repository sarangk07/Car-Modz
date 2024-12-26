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
  const [loading,setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
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
      setCMT('');
      setChoice('default'); 
      alert('Comment added!');
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false)
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
          <form onSubmit={handleCommentSubmit} className='flex flex-col w-full items-center justify-center'>
            <div>
              <input
                className='text-zinc-700 rounded-md px-2 focus:outline-none focus:ring-0 focus:border-b-cyan-400'
                type="text"
                placeholder='Type here...'
                onChange={(e) => setCMT(e.target.value)}
                required
              />
              <button type='submit' className='pl-3 relative top-[5px] mb-3'>
                {loading?
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin opacity-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                </>:
                <>
                  <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                </>}
                
              </button>
              </div>
            <div>
              <div className='flex flex-col justify-around items-center'>
                <p onClick={() => setChoice('default')} className='cursor-pointer'>Cancel</p>
              </div>
            </div>
          </form>
        </>
      ) : choice === 'cmtShow' ? (
        <div className='flex flex-col justify-between w-full'>
          <div className='flex mb-3'>
            <p onClick={() => setChoice('default')} className='ml-3 cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0L9 3M3 9h12a6 6 0 1 1 0 12h-3" />
              </svg>
            </p>
          </div>
          <div className='flex flex-col items-start bg-zinc-700 mx-3 rounded-b-md justify-start'>
            {showcmt?.filter(x => x.post === postId).map((comment) => (
              <div key={comment.id} className='flex p-3 '>
                <p className='text-xs border  p-1 rounded-sm text-cyan-200 mr-3'>{user.id === comment.user.id ? 'You' : comment.user.fullname}</p>
                <p className='flex flex-wrap '>{comment.content}</p>
                {user.id === comment.user.id && (
                  <button onClick={() => handleDeleteCmt(comment.id)} className='ml-3 text-red-300 hover:text-red-500'>
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
          <p onClick={handleShowComments} className='cursor-pointer mt-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill='white' className='size-6' viewBox="0 0 24 24"><path d="M12,9a1,1,0,1,0,1,1A1,1,0,0,0,12,9Zm7-7H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1ZM8,9a1,1,0,1,0,1,1A1,1,0,0,0,8,9Zm8,0a1,1,0,1,0,1,1A1,1,0,0,0,16,9Z"></path></svg>
          </p>
          <button onClick={() => setChoice('cmtCreate')} className='ml-5 cursor-pointer'>Add Comment</button>
        </div>
      )}
    </>
  )
}

export default Comments
