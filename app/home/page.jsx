'use client'

import React from 'react'
import UserHome from '../(user)/components/UserHome'
import ShopHome from '../(shopOwner)/profileSO/ShopHome';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.user);

  return (
    <>
    {
      user.is_shopOwner ? 
      <>
        <ShopHome/>
      </> :
      <>
        <UserHome/>
      </>
    }
    </>
  )
}

export default Home
