'use client'

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchAllShops } from '@/app/utils/fetchUser'
import { useDispatch } from 'react-redux'
import axios from 'axios'

function ShopView(params) {
  const [shopid, setShopid] = useState(null);
  const [shop, setShop] = useState(null);
  const allshops = useSelector((state) => state.user.shops);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
 




  


  useEffect(() => {
      setShopid(params.params.shopid);
  }, [params.params.shopid]);



  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchAllShops(dispatch);
      console.log('Completed fetchAllShops');
      setIsLoading(false);
     
    };

    fetchData();

    
}, [dispatch]);



  useEffect(() => {
      if (shopid !== null) {
          console.log('allshops============', allshops);
          console.log('shopid===========', shopid);

          const filteredShop = allshops.find((x) => x.id === parseInt(shopid));
          console.log('filteredShop=================', filteredShop);
          setShop(filteredShop);
      }
  }, [shopid, allshops]);












  if (isLoading) {
    return <p>Loading shops...</p>;
  }

  if (!shop) {
    return <p>Shop not found. Please check the shop ID.</p>;
  }
  return (
    <div className='w-full h-screen flex bg-red-950'>
      <div className='bg-orange-300 w-1/3 m-2 p-2 rounded-md'>
        <div className='bg-slate-500 h-fit m-2'>
          <div className='relative'>
            <img src={shop.shop_bg_img} alt="bg-img" className='relative h-40 w-full' />
            <img src={shop.shop_image} alt="profile-img" className='absolute rounded-xl top-5 left-10  w-32 h-32'/>
          </div>
          <div className='p-3'>
            <p>{shop.shop_name}</p>
            <p>{shop.description}</p>
            <p>message</p>
            <p>rate shop</p>
          </div>
        </div>
        <div className='bg-orange-700 m-2'>
          <p>products</p>
          <p>mentons</p>

        </div>
      </div>
      <div className='bg-orange-300 w-2/3 m-2 p-2 rounded-md'>
        body
      </div>
    </div>
  )
}

export default ShopView
