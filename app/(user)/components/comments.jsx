
'use client'

import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function Comments({postId}) {
    const [choice,setChoice] = useState('default')
    const [cmt,setCMT] = useState('')
    const [showcmt,setShowCmt] = useState(null)
    const token = localStorage.getItem('token-access');
    const [deletecmt,setDeletCmtState] = useState('default')

    const user = useSelector((state) => state.user);


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        console.log('cmt : ', cmt , 'postid : ',postId);
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/api/comments/',
            { post:postId, content: cmt },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log(response.data);
          setChoice('default'); 
          alert('comment added!')
        } catch (error) {
          console.error(error);
        }
      };


    const handleDeleteCmt = async (cmtid) => {
      
      console.log('cmt id : ',cmtid);
      try{
        const response = await axios.delete(`http://127.0.0.1:8000/api/comments/${cmtid}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        console.log('response ',response.status);
        setDeletCmtState(`${cmtid}-deleted`)
      }catch(error){
        console.log('errorrrr ... ', error);
      }

    }


const fetchComments = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/comments/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setShowCmt(response.data); 
    console.log('comment response: ', response.data);
  } catch (e) {
    console.error('comment fetching error: ', e);
  }
};

useEffect(() => {
  fetchComments();
}, [choice,deletecmt]); //
  return (
    <>
    {
        choice=='cmtCreate' ?
        <>
        <form action="" onSubmit={handleCommentSubmit}>
            <input type="text" placeholder='type here.....' onChange={(e)=>setCMT(e.target.value)}/>
            <div className='flex flex-col justify-around items-center'>
                <button type='submit'>post</button>
                <p onClick={() => setChoice('default')} className='cursor-pointer'>cancel</p>
            </div>
            
        </form>
            
        </> 
        :
        <>
        {
            choice == 'cmtShow' ? 
            <div className='flex flex-col justify-betwee'>
                <div className='flex mb-3'>
                  <p className=' underline underline-offset-4'>showing comments</p>
                  <p onClick={()=>setChoice('default')} className='ml-3 cursor-pointer'>back</p>
                </div>
                <div>
                {
                  showcmt.filter(x => x.post === postId).map((comment) => (
                    <div key={comment.id} className='flex p-3'>
                      
                      
                      {
                        user.id == comment.user.id ?
                        <>
                        <p className='text-xs mr-3'>You</p>
                        </>
                        :
                        <>
                        <p  className='text-xs mr-3'>{comment.user.fullname}</p>
                        </>
                      }
                      <p>{comment.content}</p>
                      {user.id == comment.user.id ? 
                      <>
                      <button onClick={() => handleDeleteCmt(comment.id)} className='ml-3 text-red-500'> delete</button>
                      </>
                      :
                      <>
                      </>}
                    </div>
                  ))
                }
                </div>
            </div> 
            :
            <div className='flex'>
                <p onClick={() => setChoice('cmtShow')} className='cursor-pointer'>comments</p>
                <button onClick={() => setChoice('cmtCreate')} className='ml-5 cursor-pointer'>add comments</button>

            </div>
        }
        </>
       
    }
      
    </>
  )
}

export default Comments
