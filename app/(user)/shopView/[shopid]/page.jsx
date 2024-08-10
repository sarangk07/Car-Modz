'use client'

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchAllShops } from '@/app/utils/fetchUser'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/navigation'


function ShopView(params) {

  const [shopid, setShopid] = useState(null);
  const [shop, setShop] = useState(null);
  const allshops = useSelector((state) => state.user.shops);
  const [choice,setChoice] = useState('default');
  const [sort1, setSort1] = useState('default')

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  const [products, setProducts] = useState([])
  const productNames = ["Alloy", "Body Kit", "Exhaust", "Others"]



  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token-access')

      const response = await axios.get('http://127.0.0.1:8000/api/products/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProducts(response.data)
      console.log('productssss',response.data);
      
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])



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



const filteredProducts = products
    .filter(product => shopid && product.owner && product.owner === parseInt(shopid))
    .filter(product => {
      if (sort1 === 'default') return true;
      if (sort1 === 'bodykits' && product.product_name === 'Body Kit') return true;
      if (sort1 === 'alloys' && product.product_name === 'Alloy') return true;
      if (sort1 === 'exhausts' && product.product_name === 'Exhaust') return true;
      if (sort1 === 'others' && product.product_name === 'Others') return true;
      return false;
    });




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
    <div className='w-full h-screen flex md:flex-row flex-col bg-stone-800'>
      <div className='bg-neutral-500 md:w-1/3 m-2 p-2 rounded-md'>
      <p className='cursor-pointer' onClick={()=> router.push('/home')}>back</p>
        <div className='bg-green-600 text-gray-200 font-mono font-bold rounded-lg h-fit m-2'>
          <div className='relative'>
            <img src={shop.shop_bg_img} alt="bg-img" className='relative h-40 w-full' />
            <img src={shop.shop_image} alt="profile-img" className='absolute rounded-xl top-5 left-10  w-32 h-32 border-2 border-green-400'/>
          </div>
          <div className='p-3'>
            <p className='cursor-default font-extrabold'>{shop.shop_name}</p>
            <p className='cursor-default font-light'>{shop.description}</p>
            <p className='cursor-pointer'>Message</p>
            <p className='cursor-default'>Rate Shop</p>
            <p className='cursor-default text-gray-800'>Report Shop</p>
          </div>
        </div>
        <div className='bg-neutral-800 rounded-lg p-3 m-2'>
          <p className='cursor-pointer' onClick={()=> setChoice('default')}>Products</p>
          <p className='cursor-pointer' onClick={()=> setChoice('posts')}>Posts</p>

        </div>
      </div>
      <div className='bg-neutral-500 md:w-2/3 m-2 p-2 rounded-md'>
        
        {
          choice == 'posts' ?
          <>
          <div>
            NO Post .... Found!!!
          </div>
          </>
          :
          <>
          <h1 className='mb-5 ml-2 mt-10'>List of Products</h1>
            <div className='flex ml-2 mb-3 border-2 w-fit'>
              <p className='mr-4 ml-2 cursor-pointer' onClick={() => setSort1('alloys')}>Alloys</p>
              <p className='mr-4 cursor-pointer' onClick={() => setSort1('bodykits')}>Body Kits</p>
              <p className='mr-4 cursor-pointer' onClick={() => setSort1('exhausts')}>Exhausts</p>
              <p className='mr-4 cursor-pointer' onClick={() => setSort1('others')}>Others</p>
              <p className='mr-4 cursor-pointer' onClick={() => setSort1('default')}>All</p>
            </div>

            <div className='overflow-x-auto scrollbar-track-neutral-500 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-green-400'>
              <div className='flex'>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className='m-2 p-2 flex bg-stone-800 rounded-md' style={{ minWidth: '200px' }}>
                      <div className='pr-2'>
                        <img src={product.image} className='md:w-24 w-20 rounded-md' alt="" />
                      </div>
                      <div className='text-xs flex flex-col cursor-default'>
                        {/* <p>{product.product_name}</p> */}
                        <p className='text-yellow-500 font-serif font-bold'>{product.description}</p>
                        <p>Price: {product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <p>Status: {product.status}</p>
                        <button className='mt-2 mb-2 text-left text-green-400 w-fit'>BOOK</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='m-2 p-2 '>No products found!</p>
                )}
              </div>
            </div>
          
          </>
        }
      </div>
    </div>
  )
}

export default ShopView
