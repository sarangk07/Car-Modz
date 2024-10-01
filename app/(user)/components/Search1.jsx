'use client'

import React, { useMemo } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


function Search1() {
    const [svalue, setSvalue] = useState('');  
    const [filteredResults, setFilteredResults] = useState([]);
    const [open,setOpen] = useState(false)
    const route = useRouter()

    console.log('ewauklt :',filteredResults);
    
    console.log(svalue,'valueeeeee');
    

    const allshops = useSelector((state) => state.user.shops);
    const allgroups = useSelector((state) => state.user.groups);
    const allusers = useSelector((state) => state.user.users);

    const handleChange = (e)=>{
        setOpen(true)
        setSvalue(e.target.value)
    }

    useMemo(() => {
        if (svalue.trim() === '') {
          setFilteredResults([]);  
        } else {
          
          const filteredShops = allshops
            .filter(shop => shop?.shop_name && shop.shop_name.toLowerCase().includes(svalue.toLowerCase()));
      
          const filteredGroups = allgroups
            .filter(group => group?.name && group.name.toLowerCase().includes(svalue.toLowerCase()));
      
          const filteredUsers = allusers
            .filter(user => user?.fullname && user.fullname.toLowerCase().includes(svalue.toLowerCase()));
      
          
          setFilteredResults([...filteredShops, ...filteredGroups, ...filteredUsers]);
        }
      }, [svalue, allshops, allgroups, allusers]);

  return (
    <>
    <div className='flex justify-center mb-4'>
         <input onChange={handleChange}  placeholder='Shops,Users,Groups...' type="search" name="" id=""  className='pl-1 rounded-sm  bg-stone-200 text-black' />   
    </div>
    {
        open === true ?
        <div className='bg-stone-700 p-2 rounded-md'>
            <div className='flex justify-end cursor-pointer'>
                <p onClick={()=>setOpen(false)}>close</p>
            </div>
            <div>
            {filteredResults.length > 0 ? (
                filteredResults.map((result, index) => (
                    <div key={index}>
                        <div className='flex'>
                            <p>{result.name || result.fullname || result.shop_name}</p>
                                
                            {result.name ?
                            <span className='ml-3 text-emerald-300 cursor-pointer'>join</span>:
                            result.fullname ?
                            <>
                            <span className='ml-3 text-cyan-300 cursor-pointer' onClick={()=> route.push(`/userView/${result.id}`)}>view</span>
                            </>:
                            result.shop_name ?
                            <>
                            <span className='ml-3 text-cyan-300 cursor-pointer' onClick={()=> route.push(`/shopView/${result.id}`)}>view</span>
                            </>
                            :
                            <></>
                            }
                        </div>
                    </div>
            ))
            ) : (
            <p>Nothing found</p>
            )}
               
            </div>
        </div>
        :
        <></>
    }
    </>
  )
}

export default Search1
