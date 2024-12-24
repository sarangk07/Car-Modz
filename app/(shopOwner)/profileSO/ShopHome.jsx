
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShop } from '@/app/redux/slices/shopSlice';
import Logout from '@/app/components/Logout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Products from './components/Products';
import { RotateLoader } from 'react-spinners';
import { editPost } from '@/app/redux/slices/postsSlice';



function ShopHome() {
  const user = useSelector((state) => state.user);
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [bodyChoice, setBodyChoice] = useState('default');
  const [choice, setChoice] = useState('default');
  const [createpost, createpostChoice] = useState('default');
  const [posts,setPosts] = useState([]);
  const [shopData, setShopData] = useState({
    shop_name: '',
    description: '',
    shop_image: null,
    shop_bg_img: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasShop, setHasShop] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [shopPosts, setShopPosts] = useState([]);
  const [del,setDel] = useState('default')

  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');





  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    
    e.preventDefault();
    const token = localStorage.getItem('token-access');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    formData.append('author', user.id);
    formData.append('author_type', user.is_shopOwner ? 'shop_owner' : 'user');

    try {
      // const loadingToast = toast.loading('Creating...');
      
      const response = await axios.post('http://127.0.0.1:8000/api/posts/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Post created:', response.data);
      createpostChoice('default');
      setTitle('');
      setContent('');
      setSelectedFile(null);
      toast.success('post created!')
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error creating post')
    }
  };






  useEffect(() => {
    const fetchShopData = async () => {
      const token = localStorage.getItem('token-access');
      setIsLoading(true);

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/shop/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;
        dispatch(setShop(data));
        setHasShop(true);
        console.log(data, 'shop details');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setHasShop(false);
          console.log('No shop found for this user');
        } else {
          console.error('Error fetching shop details:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchShopData();
  }, [dispatch]);




  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token-access');
  
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/user-posts/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!shop.shop_name) return;
  
        const filteredPosts = response.data.filter((post) => {
          const descriptionWords = post.content.split(' ');
          const shopName = descriptionWords.find((word) => word.startsWith('*'));
          if (!shopName) return false;
  
          const cleanShopName = shopName.replace('*', '').replace(/\s/g, '').toLowerCase();
          const currentShopName = shop.shop_name.replace(/\s/g, '').toLowerCase();
  
          return cleanShopName === currentShopName;
        });
  
        console.log('filtered posts====================================', filteredPosts);
        setPosts(filteredPosts);

        const shopFilteredPosts = response.data.filter((post) => {
          return post.author.id === shop.user;
        });
  
        console.log('shop posts====================================', shopFilteredPosts);
        setShopPosts(shopFilteredPosts);
  
      } catch (e) {
        console.log(e, 'error');
      }
    };
  
    if (shop.shop_name) {
      fetchPosts();
    }
  }, [shop.shop_name,shop.id,del,editingPostId]);




  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
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

  




  const handleDeletePost = async ({postId}) => {
    if(!postId){
        return alert('No post Found!')
        }
        const token = localStorage.getItem('token-access');

        try{
            const response = await axios.delete(`http://127.0.0.1:8000/api/posts/${postId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            console.log('post delete response : ', response);
            alert('post deleted!')
            setDel(`deleted${postId}`)
            
        }catch(error){
            alert('error: ',error.message)
        }
    }




  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (shopData.shop_name.trim()) {
      formData.append('shop_name', shopData.shop_name.trim());
    }
    if (shopData.description.trim()) {
      formData.append('description', shopData.description.trim());
    }
    if (shopData.shop_image instanceof File) {
      formData.append('shop_image', shopData.shop_image);
    }
    if (shopData.shop_bg_img instanceof File) {
      formData.append('shop_bg_img', shopData.shop_bg_img);
    }

    if (formData.entries().next().done) {
      alert('No fields to update');
      return;
    }

    try {
      const token = localStorage.getItem('token-access');

      if (!token) {
        alert('No token found');
        return;
      }

      let response;
      // const loadingToast = toast.loading('loading...');

      if (hasShop) {

// Update existing shop------------------------
        response = await axios.patch('http://127.0.0.1:8000/api/shop/', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {

// Create new shop----------------------
        response = await axios.post('http://127.0.0.1:8000/api/shop/create/', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      dispatch(setShop(response.data));
      setHasShop(true);
      // toast.success(hasShop ? 'Updated' : 'Created', 'shop:', { id: loadingToast })
      console.log(hasShop ? 'Updated' : 'Created', 'shop:', response.data);
      setChoice('default');
    } catch (error) {
      console.error(hasShop ? 'Update' : 'Create', 'error:', error.response ? error.response.data : error.message);
      
      // toast.error(`Failed to ${hasShop ? 'update' : 'create'} shop. Please try again.`, { id: loadingToast })

      
    }
  };

  if (isLoading) {
    return <div className='flex flex-col w-full h-screen justify-center items-center'>
    <RotateLoader color='#35ebc5'/>
  </div>;
  }

  return (
    <>
    <Toaster
      
      position="top-center"
      reverseOrder={false}
    />
    
    <div className='flex flex-col cursor-default md:flex-row bg-slate-900 h-[1550px] font-mono w-full'>
      <div className='flex flex-col md:flex md:flex-col md:h-full md:w-1/3 w-full'>
{/* User info and logout */}
        <div className='flex flex-col md:h-fit md:flex md:flex-col md:rounded-xl bg-slate-800 md:m-2 rounded-md mt-5 mb-5 p-3'>
          <div>
            <h3>{user.username}</h3>
            <p>{user.fullname}</p>
            <p>{user.email}</p>
            <Logout />
          </div>
        </div>

{/* Shop info */}
        <div className='bg-slate-800 md:rounded-xl md:h-3/5 md:m-2 mt-5 mb-5 p-3'>
          <div className='md:h-fit mb-2 md:mt-2 md:rounded-lg md:p-1 rounded-md p-2 bg-slate-700'>
            {hasShop ? (
              <>
                <div>
                  <div className='relative'>
                    <img src={shop.shop_bg_img} alt="" className='w-full h-20 bg-black absolute' />
                    <img src={shop.shop_image} alt="" className='w-16 rounded-3xl h-16 bg-white relative top-2 left-2'/>
                  </div>
                  <div className='relative mt-7'>
                    <div className='font-bold'>{shop.shop_name}</div>
                    <div className='text-xs'>{shop.description}</div>
                    <div>{shop.is_verified ? 'Verified' : 'Shop Is Not Verified'}</div>
                    <div>rating: {shop.rating || 'Not rated'}</div>
                    <button onClick={() => setChoice('edit')} className='font-bold text-cyan-300'>Edit Shop Info</button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <p>SetUp Your Shop 1st !.</p>
                <button onClick={() => setChoice('edit')} className='font-bold text-cyan-300'>Create Shop</button>
              </div>
            )}
            {choice === 'edit' && (
              <form onSubmit={handleSubmit} className='flex flex-col bg-zinc-700'>
                <label htmlFor="shop_name">Shop name</label>
                <input
                  type="text"
                  id="shop_name"
                  className='text-gray-700'
                  value={shopData.shop_name}
                  onChange={(e) => setShopData({ ...shopData, shop_name: e.target.value })}
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className='text-gray-700'
                  id="description"
                  value={shopData.description}
                  onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
                />
                <label htmlFor="shop_image">Shop Image</label>
                <input type="file" id="shop_image" onChange={(e) => setShopData({ ...shopData, shop_image: e.target.files[0] })} />
                <label htmlFor="shop_bg_img">Shop Background Image [horizontal]</label>
                <input type="file" id="shop_bg_img" onChange={(e) => setShopData({ ...shopData, shop_bg_img: e.target.files[0] })} />
                <button type="submit">{hasShop ? 'Update' : 'Create'} Shop</button>
                <button type="button" onClick={() => setChoice('default')}>Cancel</button>
              </form>
            )}
          </div>

          
          <div className='mb-2 md:mt-2 rounded-md md:rounded-lg p-2 md:h-fit bg-slate-700'>
            <div className='mb-2 cursor-pointer w-fit' onClick={() => createpostChoice('create')}>Create a post</div>
            <div className='mb-2 cursor-pointer w-fit' onClick={()=> setBodyChoice('shopPost')}>My Posts</div>

            <div onClick={() => setBodyChoice('CustomersPost')} className='mb-2 w-fit cursor-pointer'>Customers posts</div>

              {
                createpost == 'create' ?
                <>
                <form onSubmit={handlePostSubmit} className='flex flex-col bg-[#1e1e36] items-center rounded-md p-4'>
                    <label htmlFor="title" className="mb-2">Title</label>
                    <input
                      type="text"
                      id="title"
                      className='text-gray-700 rounded-md mb-2 p-2 w-56 '
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <label htmlFor="content" className="mb-2">Description</label>
                    <textarea name="" id="" className='text-gray-700 rounded-md mb-2 p-2 w-56 '
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    />
                    
                    <label htmlFor="image" className="mt-4 mb-2">Upload Image</label>
                    <input
                      type="file"
                      id="image"
                      className='text-gray-700 mb-2 text-xs bg-blue-300 rounded-full'
                      onChange={handleFileChange}
                    />
                    {selectedFile && (
                      <div className='flex flex-col items-center mt-4'>
                        <h2>Preview:</h2>
                        {selectedFile.type.startsWith('image/') ? (
                          <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ maxWidth: '30%' }} />
                        ) : (
                          <p>File type not supported for preview.</p>
                        )}
                      </div>
                    )}
                    <button type='submit' className='text-green-500' >POST</button>
                    <button className='w-fit' onClick={() => createpostChoice('default')}>cancel</button>

                  </form>
                </>
                :
                <>
                </>
              }


            <div onClick={() => setBodyChoice('default')} className='mb-2 cursor-pointer'>Products</div>
            <div className='mb-2 cursor-pointer'>Messages</div>
            <div className='mb-2 cursor-pointer'>Bookings</div>
          </div>

          
          <div className='bg-slate-700 mt-2 rounded-md md:rounded-lg p-2 md:h-fit'>
            <div>settings</div>
            <div>report an issue?</div>
          </div>
        </div>
      </div>

    {bodyChoice === 'default' ? (
      <div className='md:w-2/3 w-full md:m-2 md:rounded-xl md:p-3 bg-gray-800'>
        <Products shopId={shop.id}/>
      </div>
      ) : bodyChoice === 'shopPost' ? (
        <div className='md:w-2/3 w-full  md:m-2 overflow-y-auto md:rounded-xl md:p-3 bg-gray-800' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div>
            {shopPosts.length > 0 ? shopPosts.map((x) => (


              <div key={x.id} className="ml-5 h-fit mr-5 mb-10 object-cover p-10">
                <div className="rounded-xl border-t-4 border-cyan-300 flex justify-between mb-3 mt-0 pt-2 h-[10%]">
                  <div className="flex flex-col">
                    {/* <h1>{x.author.fullname}</h1> */}
                    <h2>{x.title}</h2>
                    <p>{x.content}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <img
                    src={x.image}
                    alt=""
                    className="relative w-full h-auto max-h-[40vh] object-cover rounded-sm"
                  />
                </div>
                <button className="mr-5" onClick={() => handleEditClick(x)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                  </svg>
                </button>
                <button onClick={() => handleDeletePost({ postId: x.id })}>delete</button>
                {editingPostId === x.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEdit(x.id);
                    }}
                    className="flex flex-col font-mono bg-stone-800 p-2 rounded-md"
                  >
                    <input
                      placeholder="title"
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="text-zinc-900 mb-2 rounded-md w-fit"
                    />
                    <input
                      placeholder="content"
                      type="text"
                      value={editContent}
                      className="text-zinc-900 mb-2 rounded-md"
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button type="submit">Save</button>
                    <button onClick={() => setEditingPostId(null)}>Cancel</button>
                  </form>
                ) : (
                  <></>
                )}
              </div>

            )) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      ) : bodyChoice === 'CustomersPost' ? (
        <div className='md:w-2/3 w-full md:m-2 overflow-y-auto md:rounded-xl md:p-3 bg-gray-800' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div>
            {posts.length > 0 ? posts.map((x) => (
              <div key={x.id} className='ml-5 mr-5 mb-10 object-cover p-10'>
                <div className='rounded-xl border-t-4 border-cyan-300 flex justify-between mb-3 mt-0 pt-2 h-[10%]'>
                  <div className='flex flex-col'>
                    <h1>{x.author.fullname}</h1>
                    <h2>{x.title}</h2>
                    <p>{x.content}</p>
                  </div>
                </div>
                <div className='flex justify-center'>
                  <img src={x.image} alt="" className='relative w-[80vh] rounded-sm' />
                </div>
              </div>
            )) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      ) : (
        <div>Nothing Found......</div>
      )}
    </div>
    </>
  );
}

export default ShopHome;