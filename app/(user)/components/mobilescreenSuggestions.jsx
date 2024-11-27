'use client'

import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Search1 from './Search1';


function AllSuggestions() {

    const route = useRouter()

    const allshops = useSelector((state) => state.user.shops);
    const allgroups = useSelector((state) => state.user.groups)
    
    
    const [filterShops, setfilterShops] = useState([]);
    const [filterGroups, setfilterGroups] = useState([]);


    useEffect(() => {
        if (allshops) {
            const shuffledShops = [...allshops].sort(() => 0.5 - Math.random());
            setfilterShops(shuffledShops.slice(0, 4));
            // console.log(shuffledShops,'---------sp---------------');

        }
    }, [allshops]);
    useEffect(() => {
        if (allgroups) {
            const shuffledGroups = [...allgroups].sort(() => 0.5 - Math.random());
            setfilterGroups(shuffledGroups.slice(0, 4));
        }
    },[allgroups])



  return (
    <div className='md:hidden flex flex-col'>
            <div className='flex justify-between mb-3'>
                <p className='text-cyan-400 text-lg'> Suggestions</p>
            </div>
        
        <div className='flex border-b border-cyan-300 flex-col mt-2 w-full overflow-auto ' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        <p className='text-cyan-400 font-bold'>Shops</p>
        <div className='flex mt-2'>
        {filterShops ? filterShops.map((x) => (
                <div key={x.id} className='mb-5  mr-20 flex w-64 '>
                    
                  <img src={x.shop_image} alt="" className='bg-stone-800 cursor-pointer w-10 rounded-xl h-10 mr-3' onClick={()=> route.push(`/shopView/${x.id}`)}/>
                  <div className='flex flex-col mr-5 '>
                    <p className='text-xs font-bold'>{x.shop_name}</p>
                    {/* <p className='text-xs mt-1 mr-5 '>{x.description}</p> */}
                  </div>
                </div>
              )) : <></>}
        </div>
        </div>
        <div className='flex border-b border-cyan-300 flex-col mt-2 mb-3 w-full overflow-auto ' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <p className='text-cyan-400 font-bold'>Groups</p>
        <div className='flex mt-2'>
        {filterGroups ? filterGroups.map((x) => (
                <div key={x.id} className='mb-5 mr-20 flex w-64 '>
                    
                  <img onClick={() => route.push(`/groupView/${x.id}/`)} src={x.group_image} alt="" className='bg-stone-800 cursor-pointer w-10 rounded-xl h-10 mr-3'/>
                  <div className='flex flex-col mr-5 '>
                    <p className='text-xs font-bold'>{x.name}</p>
                    
                  </div>
                </div>
              )) : <></>}
        </div>
        </div>
        <Search1 uniqueIdentifier="mobile"/>
    </div>
  )
}

export default AllSuggestions
