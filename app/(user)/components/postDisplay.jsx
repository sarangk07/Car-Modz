'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostCreate from './PostCreate';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Comments from './comments';
import Like from './like';

function PostDisplay() {
    const user = useSelector((state) => state.user);
    const [post, setPost] = useState(null);
    const [choice,setChoice] = useState('default')
    const [choice2,setChoice2] = useState('default')

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token-access');
                const response = await axios.get('http://127.0.0.1:8000/api/posts/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log('posts', response.data);
                setPost(response.data); 
            } catch (e) {
                console.log(e, 'error');
            }
        };

        fetchPosts();


        

    }, []);
  return (
    <>
      <div className='md:w-2/3 h-full flex flex-col'>
                {/* <div className="text-center mb-4">posts</div> */}
                <PostCreate/>
                <div className='flex justify-between mt-3 mb-2'>
                  <p className='cursor-pointer' onClick={()=>setChoice('users')}>users</p>
                  {
                    choice == 'users' ? 
                        <>
                            <p onClick={()=>setChoice2('user')} className='cursor-pointer'>own</p>
                            <p onClick={()=>setChoice2('default')} className='cursor-pointer'>dicover</p>
                        </> 
                        :
                    <> </>
                  }

                  <p className='cursor-pointer'>shops</p>
                </div>
                <div className='flex-1 overflow-y-auto m-3'  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                 {post && choice2 === 'user' && (
                        <div className='mb-5 pr-5 pl-5'>
                            {post.filter(x => x.author.id  === user.id).map(x => (
                                <div key={x.id} className='ml-5 mr-5 mb-10 object-cover'>
                                     <div className='rounded-xl border-t-4 border-blue-300 flex justify-between t mb-3 mt-0 pt-2 h-[10%]'>
                                        
                                        <div className='flex flex-col'>
                                        <h2>{x.title}</h2>
                                        <p className='text-sm'>{x.content}</p>
                                        </div>
                                        {/* <div><p>{user.username}</p></div> */}
                                        
                                        
                                    </div>
                                    <img src={x.image} alt="" className='relative w-full h-[90%] rounded-sm' />
                                    <div className='rounded-xl flex-col border-b-4 border-blue-300 flex pb-3 mt-0 pt-3 h-[10%]'>
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
                            {post.filter(x => x.author.id  === user.id).length === 0 && <h1>not found</h1>}
                        </div>
                    )}

                    {post && choice2 === 'default' && (
                        <div className='mb-5 pr-5 pl-5'>
                            {post.filter(x => x.author.id !== user.id).map(x => (
                                <div key={x.id} className='ml-5 mr-5 mb-10 object-cover'>
                                    <div className='rounded-xl border-t-4 border-blue-300 flex justify-between  mb-3 mt-0 pt-3 h-[10%]'>
                                        <div className='flex flex-col'>
                                            <h2>{x.title}</h2>
                                            <p className='text-sm'>{x.content}</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p>{x.author.fullname}</p>
                                        </div>
                                    </div>
                                    <img src={x.image} alt="" className='relative w-full h-[90%] rounded-sm' />
                                    <div className='rounded-xl flex-col border-b-4 border-blue-300 flex  pb-3 mt-0 pt-2 h-[10%]'>
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
                    )}
                  
                </div>
              </div>
    </>
  )
}

export default PostDisplay
