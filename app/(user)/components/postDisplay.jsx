'use client'


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, editPost} from '@/app/redux/slices/postsSlice';
import PostCreate from './PostCreate';
import Comments from './comments';
import Like from './like';
import { useRouter } from 'next/navigation';
import AllSuggestions from './mobilescreenSuggestions';
// import { fetchLikes,fetchComments } from '@/app/redux/slices/socialSlice';
import Image from 'next/image';
import Share from './Share';





const ContentWithMentions = ({ content }) => {
    const route = useRouter()

    const mentionRegex = /(@|\*)(\w+)/g;
    const parts = content.split(mentionRegex);
    const allshops = useSelector((state) => state.user.shops);

    
    
    const shopNameToIdMap = allshops.reduce((map, shop) => {
        const formattedName = shop.shop_name.replace(/\s+/g, '').toLowerCase();
        map[formattedName] = shop.id;
        return map;
      }, {});


    const handleMentionClick = (mentionSymbol, mention) => {
        if (mentionSymbol === '*') {
          const shopId = shopNameToIdMap[mention.toLowerCase()];
          
          if (shopId) {
            
            route.push(`/shopView/${shopId}`)
          } else {
            console.log('Shop not found');
          }
          
        }
      };
  
    return (
      <p className='text-xs'>
        {parts.map((part, index) => {
            if (index % 3 === 1) {
            
            return null;
            } else if (index % 3 === 2) {
            
            const mentionSymbol = parts[index - 1];
            const className = mentionSymbol === '@' ? "text-cyan-400" : "text-green-400";
            return <span
            key={index}
            className={`${className} px-1 rounded cursor-pointer`}
            onClick={() => handleMentionClick(mentionSymbol, part)}
          >
            {mentionSymbol}{part}
          </span>;
            }
            
            return part;
        })}
      </p>
    );
  };



function PostDisplay() {
    const router = useRouter();
    const dispatch = useDispatch();
    
    const user = useSelector((state) => state.user);
    const allshops = useSelector((state) => state.user.shops);
    const { items: posts, shuffledPosts, status, error } = useSelector((state) => state.posts);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5); 
 
    const [choice, setChoice] = useState('default');
    const [choice2, setChoice2] = useState('default');
    const [editingPostId, setEditingPostId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
  
    
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchPosts());
      }
    }, [status, dispatch]);
    // useEffect(() => {
    //     dispatch(fetchLikes());
    //     dispatch(fetchComments());
    //   }, [dispatch]);
  
    const handleEditClick = (post) => {
      setEditingPostId(post.id);
      setEditTitle(post.title);
      setEditContent(post.content);
    };
  
    const handleDeletePost = async (postId) => {
      if (!postId) {
        return alert('No post Found!');
      }
      try {
        await dispatch(deletePost(postId)).unwrap();
        alert('Post deleted!');
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
  
    const handleEdit = async (postId) => {
      if (!postId) {
        return alert('No post Found!');
      }
      const formData = new FormData();
      formData.append('title', editTitle);
      formData.append('content', editContent);
      
      try {
        await dispatch(editPost({ postId, formData })).unwrap();
        setEditingPostId(null);
        setEditTitle('');
        setEditContent('');
      } catch (error) {
        console.error('Error editing post:', error);
      }
    };
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  
    
    const getFilteredPosts = () => {
      switch (choice2) {
        case 'user':
          return shuffledPosts.filter(x => x.author.id === user.id);
        case 'default':
          return shuffledPosts.filter(x => x.author.id !== user.id);
        case 'shops':
          return shuffledPosts.filter(x => allshops.some(shop => shop.user === x.author.id));
        default:
          return shuffledPosts;
      }
    };
  
    const filteredPosts = getFilteredPosts();

    // Pagination---------------
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page---
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //total pages---
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    
    const renderPagination = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }

      return (
        <div className='flex mb-4 justify-center items-center space-x-2 mt-4'>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='pr-3 text-lg bg-transparent text-white rounded disabled:opacity-30'
          >
            ◀
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-2 py-2 rounded ${
                currentPage === number 
                  ? 'bg-cyan-500 border text-xs text-white' 
                  : 'bg-transparent border text-xs text-cyan-100'
              }`}
            >
              {number}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='pl-3 text-lg bg-transparent text-white rounded disabled:opacity-30'
          >
            ▶
          </button>
        </div>
      );
    };

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }


  return (
    <>
      <div className='md:w-2/3 w-full h-full flex md:m-3  flex-col'>
        <AllSuggestions/>
            
        <PostCreate/>
        <div className='flex justify-between mt-3 mb-2'>
            <p className='cursor-pointer text-cyan-400 text-lg' onClick={()=>setChoice('users')}>Users</p>
            {
            choice == 'users' ? 
                <>
                    <p onClick={()=>setChoice2('user')} className='cursor-pointer text-cyan-400 text-lg'>Own</p>
                    <p onClick={()=>setChoice2('default')} className='cursor-pointer text-cyan-400 text-lg'>Dicover</p>
                </> 
                :
            <> </>
            }
            <p onClick={()=>setChoice2('shops')} className='cursor-pointer text-cyan-400 text-lg'>Shops</p>
        </div>

        <div className='flex-1 overflow-y-auto mt-3'  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>


{/* user */}
            {shuffledPosts && choice2 === 'user' && (
                <div className='mb-5 pr-1 pl-1 md:pr-6 md:pl-6 '>
                    {currentPosts.map(x => (
                        <div key={x.id} className='ml-5 mr-5 mb-10 object-cover'>
                                <div className='rounded-xl border-t-4 border-[#1d1d1d] flex justify-between t mb-3 mt-0 pt-2 h-[10%]'>
                                
                                <div className='flex flex-col'>
                                <h2>{x.title}</h2>
                                <ContentWithMentions content={x.content} />
                                </div>
     
                            </div>
                            <Image width={0} height={0} src={x.image} alt="" objectFit='cover' layout="responsive"  className='relative w-full h-[90%] rounded-sm' />
                            <div className='rounded-xl flex-col border-b-4 border-[#1d1d1d] flex pb-3 mt-0 pt-3 h-[10%]'>
                            <div className='flex items-stretch justify-between'>
                                <div className='flex'>
                                <Like postId={x.id}/>
                                </div>
                                <Share/>
                                
                                <div>
                                <button onClick={() => handleDeletePost({ postId: x.id })}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-red-600 size-6">
                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                </svg>
                                </button>
                                </div>
                                
                                </div>
                                {editingPostId === x.id ? (
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleEdit(x.id);
                                        }}
                                        className='flex flex-col font-mono bg-stone-800 p-2 rounded-md'
                                        >
                                            <input 
                                                placeholder='title' 
                                                type="text" 
                                                value={editTitle} 
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                className='text-zinc-900 mb-2 rounded-md w-fit'
                                            />
                                            <input 
                                                placeholder='content' 
                                                type="text" 
                                                value={editContent} 
                                                className='text-zinc-900 mb-2 rounded-md'
                                                onChange={(e) => setEditContent(e.target.value)}
                                            />
                                            <button type='submit'>Save</button>
                                            <button onClick={() => setEditingPostId(null)}>Cancel</button>
                                        </form>
                                    ) : (
                                        <>
                                           
                                        </>
                                    )}
                                <div className='flex justify-center items-center'>
                                    <Comments postId={x.id}/>
                                </div>
                            </div>
                        </div>
                    ))}
                    {currentPosts.length === 0 && <h1>not found</h1>}
                </div>
            )}


{/* default */}
            {shuffledPosts && choice2 === 'default' && (
                <div className='mb-5  pr-1 pl-1 md:pr-6 md:pl-6'>
                    {currentPosts.map(x => (
                        <div key={x.id} className='rounded-xl md:mx-5 mx-0  mb-10 object-cover bg-stone-800'>
                            <div className='rounded-xl border-t-4 border-[#1d1d1d] flex justify-between  mb-3 mt-0 pt-3 h-[10%]'>
                                <div className='flex flex-col'>
                                    <h2>{x.title}</h2>
                                    <ContentWithMentions content={x.content} />
                                </div>
                                <div className='flex flex-col cursor-pointer'>
                                    {x.author.is_shopOwner ? 
                                    <div className='flex flex-row-reverse mr-2'>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 64 64"
                                          className='size-6'
                                      >
                                          <rect x="10" y="20" width="44" height="36" fill="#34d399" />
                                          <polygon points="10,20 32,5 54,20" fill="#34d399" />
                                          <rect x="18" y="20" width="28" height="36" fill="#fff"/>
                                          <rect x="22" y="30" width="8" height="8" fill="black"/>
                                          <rect x="34" y="30" width="8" height="8" fill="black"/>
                                      </svg>

                                        <p className='font-mono font-bold text-emerald-400'  >{x.author.username}</p>
                                    </div>
                                    :
                                    <div className='flex flex-row-reverse mr-2'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 64 64"
                                        className='size-6'
                                    >
                                        <circle cx="32" cy="20" r="12" fill="#34d399" />
                                        <path d="M32,36c-16,0-24,8-24,16v4h48v-4C56,44,48,36,32,36z" fill="#34d399" />
                                    </svg>

                                        <p onClick={()=> router.push(`/userView/${x.author.id}`)}>{x.author.fullname}</p>
                                    </div>}
                                    
                                </div>
                            </div>
                            <Image width={0} height={0} src={x.image} alt="" objectFit='cover' layout="responsive" className='relative w-fit h-[90%] rounded-sm' />
                            <div className='rounded-xl flex-col border-b-4 border-[#1d1d1d] flex  pb-3  mt-0 pt-2 h-[10%]'>
                            <div className='flex items-stretch justify-between'>
                                <div className='flex'>
                                <Like postId={x.id}/>
                                </div>
                                <Share/>
                                    
                                </div>
                                <div className='flex'>
                                    <Comments postId={x.id}/>
                                </div>
                            </div>
                        </div>
                    ))}
                    {currentPosts.length === 0 && <h1>not found</h1>}
                </div>
            )}


{/* shops */}

            {shuffledPosts && choice2 === 'shops' && (
                <div className='mb-5 pr-1 pl-1 md:pr-6 md:pl-6'>
                    {currentPosts.map(x => (
                        <div key={x.id} className='ml-5 mr-5 mb-10 object-cover'>
                                <div className='rounded-xl border-t-4 border-[#1d1d1d] flex justify-between t mb-3 mt-0 pt-2 h-[10%]'>
                                
                                <div className='flex flex-col'>
                                <h2>{x.title}</h2>
                                <ContentWithMentions content={x.content} />
                                </div>
                                <div className='flex flex-col'>
                                    {x.author.is_shopOwner ? 
                                    <>
                                    <p className='font-mono font-bold text-emerald-400'>{x.author.username}</p>
                                    </>
                                    :
                                    <>
                                    <p >{x.author.fullname}</p>
                                    </>}
                                    
                                </div>
              
                            </div>
                            <Image width={0} height={0} src={x.image} alt="" objectFit='cover' layout="responsive" className='relative w-full h-[90%] rounded-sm' />
                            <div className='rounded-xl flex-col border-b-4 border-[#1d1d1d] flex pb-3 mt-0 pt-3 h-[10%]'>
                            <div className='flex items-stretch justify-between'>
                                <div className='flex'>
                                  <Like postId={x.id}/>
                                </div>
                                <Share/>

                                </div>
                                {editingPostId === x.id ? (
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleEdit(x.id);
                                        }}
                                        className='flex flex-col font-mono bg-[#0b2039] p-2 rounded-md'
                                        >
                                            <input 
                                                placeholder='title' 
                                                type="text" 
                                                value={editTitle} 
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                className='text-zinc-900 mb-2 rounded-md w-fit'
                                            />
                                            <input 
                                                placeholder='content' 
                                                type="text" 
                                                value={editContent} 
                                                className='text-zinc-900 mb-2 rounded-md'
                                                onChange={(e) => setEditContent(e.target.value)}
                                            />
                                            <button type='submit'>Save</button>
                                            <button onClick={() => setEditingPostId(null)}>Cancel</button>
                                        </form>
                                    ) : (
                                        <>
                                           
                                        </>
                                    )}
                                <div className='flex'>
                                    <Comments postId={x.id}/>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* {currentPosts.filter(x => x.author.id === allshops.some(shop => shop.user === x.author.id)).length === 0 && <h1>not found</h1>} */}
                </div>
            )}
        {renderPagination()}
        </div>
        </div>
    </>
  )
}

export default PostDisplay
