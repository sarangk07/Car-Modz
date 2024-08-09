
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShop } from '@/app/redux/slices/shopSlice';
import Logout from '@/app/components/Logout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Products from './components/Products';

function ShopHome() {
  const user = useSelector((state) => state.user);
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [bodyChoice, setBodyChoice] = useState('default');
  const [choice, setChoice] = useState('default');
  const [posts,setPosts] = useState([]);
  const [shopData, setShopData] = useState({
    shop_name: '',
    description: '',
    shop_image: null,
    shop_bg_img: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasShop, setHasShop] = useState(false);

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
  
        const response = await axios.get('http://127.0.0.1:8000/api/posts/', {
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
  
      } catch (e) {
        console.log(e, 'error');
      }
    };
  
    if (shop.shop_name) {
      fetchPosts();
    }
  }, [shop.shop_name]);
  





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
    return <div>Loading...</div>;
  }

  return (
    <>
    <Toaster
      
      position="top-center"
      reverseOrder={false}
    />
    
    <div className='flex flex-col md:flex-row bg-slate-900 h-[1550px] font-mono w-full'>
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
            <div onClick={() => setBodyChoice('CustomersPost')} className='cursor-pointer'>Customers posts</div>
            <div onClick={() => setBodyChoice('default')} className='cursor-pointer'>Products</div>
            <div>Messages</div>
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





      ) : (






        <div className='md:w-2/3 w-full md:m-2 overflow-y-auto md:rounded-xl md:p-3 bg-gray-800'  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div >
            {posts.length > 0 ? posts.map((x) => (
              <div key={x.id} className='ml-5 mr-5 mb-10 object-cover  p-10' >
              <div className='rounded-xl border-t-4 border-cyan-300  flex justify-between  mb-3 mt-0 pt-2 h-[10%]'>
              
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
              <>
                <p>No posts available</p>
              </>
            )}
          </div>
        </div>

      )}
    </div>
    </>
  );
}

export default ShopHome;