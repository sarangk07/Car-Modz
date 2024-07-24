'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { createShop } from '@/app/redux/slices/shopSlice';
import { useRouter } from 'next/navigation';

function SetupShop() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');
  const [shopImage, setShopImage] = useState(null);
  const [shopBgImg, setShopBgImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shopData = new FormData();
    shopData.append('shop_name', shopName);
    shopData.append('description', description);
    if (shopImage) shopData.append('shop_image', shopImage);
    if (shopBgImg) shopData.append('shop_bg_img', shopBgImg);

    
    router.push('/shop');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Shop Name" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="file" onChange={(e) => setShopImage(e.target.files[0])} />
      <input type="file" onChange={(e) => setShopBgImg(e.target.files[0])} />
      <button type="submit">Create Shop</button>
    </form>
  );
}

export default SetupShop;
