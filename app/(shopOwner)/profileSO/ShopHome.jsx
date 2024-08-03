'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setShop } from '@/app/redux/slices/shopSlice';
import Logout from '@/app/components/Logout';
import axios from 'axios';

function ShopHome() {
  const user = useSelector((state) => state.user);
  const shop = useSelector((state) => state.shop); 
  const dispatch = useDispatch();

  
  const router = useRouter();
  const [choice, setChoice] = useState('default');
  const [shopData, setShopData] = useState({
    shop_name: '',
    description: '',
    shop_image: null,
    shop_bg_img: null,
  });
  
  useEffect(() => {
    const fetchShopData = async () => {
      const token = localStorage.getItem('token-access');

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/shop', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        
        const data = response.data; 
        dispatch(setShop(data));
        console.log(data, 'shop details');
      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };
    fetchShopData();
  }, [dispatch]);
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (shopData.shop_name){
      formData.append('shop_name', shopData.shop_name);
    }
    if (shopData.description){
      formData.append('description', shopData.description);
    }
    if (shopData.shop_image) {
      formData.append('shop_image', shopData.shop_image);
    }
    if (shopData.shop_bg_img) {
      formData.append('shop_bg_img', shopData.shop_bg_img);
    }

    if (formData.entries().next().done) {
      alert('No fields to update');
      return;
    }

    try{
      const token = localStorage.getItem('token-access');
      if (!token) {
        alert('no token found')
        return;
      }

      const response = await axios.patch(`http://127.0.0.1:8000/api/shop/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      dispatch(setShop(response.data));
      console.log('Update shop :', response.data);
      setChoice('default');

    }
    catch(error){
      console.log('Update error:', error);
    }
    
  };

  return (
    <div className='flex flex-col md:flex-row bg-slate-900 h-[1550px] font-mono w-full'>
      <div className='flex flex-col md:flex md:flex-col md:h-full md:w-1/3 w-full'>
          <div className='flex flex-col md:h-fit md:flex md:flex-col md:rounded-xl bg-slate-800 md:m-2 rounded-md mt-5 mb-5  p-3'>
            <div>
              <h3>{user.username}</h3>
              <p>{user.fullname}</p>
              <p>{user.email}</p>
              <Logout />

            </div>
           
          </div>

          <div className='bg-slate-800 md:rounded-xl md:h-3/5 md:m-2 mt-5 mb-5 p-3'>
            <div className='md:h-fit mb-2 md:mt-2 md:rounded-lg md:p-1 rounded-md p-2 bg-slate-700'>
              {/* <div>Top</div> */}
              {/* <div>Shop info</div> */}
              {shop && Object.keys(shop).length > 0 ? (
                <>
                <div>
                  <div className='relative '>
                    <img src={shop.shop_bg_img} alt="" className='w-full h-20 bg-black absolute' />
                    <img src={shop.shop_image} alt="" className='w-16 rounded-3xl h-16 bg-white relative top-2 left-2'/>
                  </div>
                  <div className='relative mt-7'>
                    <div className='font-bold'>{shop.shop_name}</div>
                    <div className='text-xs'>{shop.description}</div>
                    {/* <div>created at: {shop.created_at}</div> */}
                    <div>{shop.is_verified ? 'Verified' : 'Shop Is Not Verified'}</div>
                    <div>rating: {shop.rating || 'Not rated'}</div>
                    <button onClick={() => setChoice('edit')} className='font-bold text-cyan-300'>Edit / Update Shop Info</button>
                  </div>
                </div>
                <div className='flex flex-col'>
                  {choice === 'edit' && (
                  // <h3 onClick={() => setChoice('default')}>cancel</h3>

                    <form onSubmit={handleUpdate} className='flex flex-col bg-zinc-700'>
                      <label htmlFor="shop_name">Change Shop name</label>
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
                      <button type="submit">Update</button>
                      <button type="button" onClick={() => setChoice('default')}>Cancel</button>
                    </form>
                  )}

                </div>
                </>
              ) : (
                <div>No shop data available</div>
              )}
            </div>


            <div className='mb-2 md:mt-2 rounded-md md:rounded-lg p-2 md:h-fit bg-slate-700'>
              <div>Mid</div>
              <div>Customers posts</div>
              <div>Products</div>
              <div>Messages</div>
            </div>


            <div className='bg-slate-700 mt-2 rounded-md md:rounded-lg p-2 md:h-fit'>
              <div>report</div>
              <div></div>
            </div>
          </div>




      </div>
          <div className='md:w-2/3 w-full md:m-2 md:rounded-xl md:p-3 bg-gray-800'>
            body
          </div>
    </div>
  );
}

export default ShopHome;