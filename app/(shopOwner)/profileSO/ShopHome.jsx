
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShop } from '@/app/redux/slices/shopSlice';
import Logout from '@/app/components/Logout';
import axios from 'axios';

function ShopHome() {
  const user = useSelector((state) => state.user);
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [bodyChoice, setBodyChoice] = useState('default');
  const [choice, setChoice] = useState('default');
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
      console.log(hasShop ? 'Updated' : 'Created', 'shop:', response.data);
      setChoice('default');
    } catch (error) {
      console.error(hasShop ? 'Update' : 'Create', 'error:', error.response ? error.response.data : error.message);
      alert(`Failed to ${hasShop ? 'update' : 'create'} shop. Please try again.`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
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
                <p>You haven't created a shop yet.</p>
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
          Products
        </div>
      ) : (
        <div className='md:w-2/3 w-full md:m-2 md:rounded-xl md:p-3 bg-gray-800'>
          Posts
        </div>
      )}
    </div>
  );
}

export default ShopHome;