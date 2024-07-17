'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostCreate from './PostCreate';
import { useSelector } from 'react-redux';

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
                            <p onClick={()=>setChoice2('user')}>own</p>
                            <p onClick={()=>setChoice2('default')}>dicover</p>
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
                                    <div className='rounded-xl border-b-4 border-blue-300 flex justify-between items-center mt-0 pt-2 h-[10%]'>
                                        <button>like</button>
                                        <button>comment</button>
                                        <button>share</button>
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
                                    <div className='rounded-xl border-t-4 border-blue-300 flex justify-between t mb-3 mt-0 pt-2 h-[10%]'>
                                        <div className='flex flex-col'>
                                            <h2>{x.title}</h2>
                                            <p className='text-sm'>{x.content}</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p>{x.author.fullname}</p>
                                        </div>
                                    </div>
                                    <img src={x.image} alt="" className='relative w-full h-[90%] rounded-sm' />
                                    <div className='rounded-xl border-b-4 border-blue-300 flex justify-between items-center mt-0 pt-2 h-[10%]'>
                                        <button>like</button>
                                        <button>comment</button>
                                        <button>share</button>
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
