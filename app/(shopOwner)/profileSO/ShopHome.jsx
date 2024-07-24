'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import Logout from '@/app/components/Logout';
import axios from 'axios';

function ShopHome() {
  const user = useSelector((state) => state.user);
  
  const router = useRouter();
  const [choice, setChoice] = useState('default');
  
  useEffect(() => {
    const fetchFun = async () => {
      const token = localStorage.getItem('token-access');
      try {
        const response = await fetch('http://127.0.0.1:8000/api/shop', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data, 'shopsss details');
      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };
    fetchFun();
  }, []);

  return (
    <div className='flex bg-slate-400 h-[1550px] w-full'>
      <div className='w-1/3 hidden md:flex md:flex-col'>
        <div>
          <h3>{user.username}</h3>
          <p>{user.fullname}</p>
          <p>{user.email}</p>
        </div>
        <div className='flex flex-col'>
          <button onClick={() => setChoice('edit')}>Edit / Update Shop Info</button>

          {choice === 'edit' && (
            <form onSubmit={handleUpdate}>
              <label htmlFor="shop_name">Change your name</label>
              <input
                type="text"
                id="shop_name"
                value={shopData.shop_name}
                onChange={(e) => setShopData({ ...shopData, shop_name: e.target.value })}
                required
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                value={shopData.description}
                onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
                required
              />
              <label htmlFor="shop_image">Shop Image</label>
              <input type="file" id="shop_image" onChange={(e) => setShopData({ ...shopData, shop_image: e.target.files[0] })} />
              <label htmlFor="shop_bg_img">Shop Background Image</label>
              <input type="file" id="shop_bg_img" onChange={(e) => setShopData({ ...shopData, shop_bg_img: e.target.files[0] })} />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setChoice('default')}>Cancel</button>
            </form>
          )}

          <Logout />
        </div>
      </div>
      <div className='w-2/3'>
        <div className='h-1/3'>
          <div>Top</div>
          <div>Shop info</div>
        </div>
        <div className='h-1/3'>
          <div>Mid</div>
          <div>Customers posts</div>
        </div>
        <div className='h-1/3'>
          <div>Bottom</div>
          <div>Messages</div>
        </div>
      </div>
    </div>
  );
}

export default ShopHome;
