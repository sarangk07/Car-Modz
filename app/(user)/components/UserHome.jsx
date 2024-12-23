'use client'

import React from 'react'
import Carousel from '@/app/components/carousal';
import { useState,useEffect,useCallback } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUserData,fetchAllUsers,followUser,unfollowUser, fetchAllShops } from '@/app/utils/fetchUser';
import { useRouter } from 'next/navigation';
import Logout from '@/app/components/Logout';
// import Group from './Group';
import Groups from './Groups';
import Image from 'next/image';
import PostDisplay from './postDisplay';

import SuggestedUsers from './suggestedUser';
import EditProfile from './EditProfile';
import Search1 from './Search1';
import { RotateLoader } from 'react-spinners';


import { getUserProfileImage } from '@/app/components/imageUtils';



function UserHome() {
  const route = useRouter()

  //advertisements
  const images = [
    'https://i.pinimg.com/1200x/3c/43/42/3c4342a9c6bfa19849a771018ae3eed2.jpg',
    'https://i.pinimg.com/1200x/97/0b/2e/970b2ec2d750b42e2a54a0875338551f.jpg',
    'https://i.pinimg.com/1200x/45/38/47/453847b532a83f9384ebcef558321d5c.jpg',
    
    'https://i.pinimg.com/1200x/51/68/72/5168724e48399a683dab97554fd7ad02.jpg',
  ];

  const user = useSelector((state) => state.user);
  const allusers = useSelector((state) => state.user.users);
  const allshops = useSelector((state) => state.user.shops);
 

  const [gmChoice,setGMChoice] = useState('group');
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 

  const [filterShops, setfilterShops] = useState([]);

  useEffect(() => {
    if (allshops) {
        const shuffledShops = [...allshops].sort(() => 0.5 - Math.random());
        setfilterShops(shuffledShops.slice(0, 4));
    }
}, [allshops]);
  



useEffect(() => {
  const fetchData = async () => {
    try {
      console.log('Starting fetchUserData');
      await fetchUserData(dispatch);
      console.log('Completed fetchUserData');

      console.log('Starting fetchAllUsers');
      await fetchAllUsers(dispatch);
      console.log('Completed fetchAllUsers');

      console.log('Starting fetchAllShops');
      await fetchAllShops(dispatch);
      console.log('Completed fetchAllShops');
      
      setLoading(false);
    } catch (error) {
      console.error('Fetch data error:', error);
      // Redirect to login if there's an error fetching data
      route.push('/login');
      setLoading(false);
    }
  };

  // // Check if user is not authenticated
  const atoken = localStorage.getItem('token-access')
  if (!atoken) {
    route.push('/login');
    return;
  }

  fetchData();
}, [dispatch, user.username, route]);





const [greeting, setGreeting] = useState('');
const updateTimeBasedContent = useCallback(() => {
  const hours = new Date().getHours();
  let newGreeting;
  if (hours < 12) {
    newGreeting = 'Good Morning';
  } else if (hours < 18) {
    newGreeting = 'Good Afternoon';
  } else {
    newGreeting = 'Good Evening';
  }
  setGreeting(newGreeting);
}, []);
useEffect(() => {
  updateTimeBasedContent();
  const timer = setInterval(updateTimeBasedContent, 60000); 

  return () => clearInterval(timer);
}, [updateTimeBasedContent]);



  if (loading) {
    return <div className='flex flex-col w-full h-screen justify-center items-center'>
      {/* <Image width={0} height={0} src="/loading.gif" alt="" className='w-fit'></Image>
      {/* <img src="./loading.gif" alt="" className='w-fit'/> */}
      {/* <p className='text-md font-mono animate-pulse'>loading...</p> */}

      <RotateLoader color='#35ebc5'/>
    </div>;
  }
  return (

    // MAINDIV
    <div className='font-Kanit bg-stone-500 w-full text-[#f4ecee] h-[1750px] flex flex-col justify-stretch items-stretch cursor-default'>


{/* SUBONE`` */}
      <div className="h-[5%]   z-50 bg-gradient-to-t from-cyan-800  to-stone-900 border-b-4 border-[#1d1d1d] shadow-md flex justify-between ">
        <div className='mr-5l size-16 md:size-20'>
          <p className="flex flex-co ml-5 mt-2 mb-2 font-sour font-extrabold text-2xl">Torque<span className="text-cyan-500">T</span>ribe</p>
        </div>
        {/* <div>search</div> */}
      </div>


{/* SUBTWO */}
      <div className="h-[93%] flex">
        <div className='flex-col bg-stone-800 md:w-1/6   border-r-4 border-[#1d1d1d] hidden md:flex'>

{/* user profile details---------------- */}

<EditProfile/>

{/* shop suggestions---------------- */}
            <div className='bg-cyan-700 rounded-t-lg p-2 shadow-lg mb-4 mx-2'>
            <Search1 uniqueIdentifier="desktop"/>
            </div>

            <div className='bg-stone-900 rounded-xl p-5 shadow-lg mb-4 mx-2'>
              <p className='text-cyan-400 font-semibold text-lg mb-5'>Suggestions</p>
              <div className='flex flex-col  mb-2'>

              {filterShops ? filterShops.map((x) => (
                <div key={x.id} className='mb-3 '>
                  <Image width={100} height={100} src={x.shop_image} alt={x.shop_name} className='cursor-pointer w-10 rounded-xl h-10 mr-3' onClick={()=> route.push(`/shopView/${x.id}`)}/>
                  <p className='text-xs'>{x.shop_name}</p>
                  <p className='text-xs mt-1'>{x.description}</p>
                </div>
              )) : <></>}
                  
              </div>
            </div>

 
{/* similar car owner suggestions---------------- */}


            <div className='bg-stone-900 rounded-xl p-5 shadow-lg mx-2'>
              <p className='text-cyan-400 text-lg font-semibold mb-2'>Similar cars owners</p>
              {allusers.filter((x) => x.car === user.car && x.id !== user.id).map((x) => (
                <div key={x.id} className='flex justify-between items-center mb-2 border-[#1d1d1d] rounded-lg p-2'>
                  <div className='flex items-center'>
                  <Image 
                    width={100} 
                    height={100} 
                    src={getUserProfileImage(x.profile_pic)} 
                    alt={x.fullname} 
                    className='w-8 rounded-xl h-8 mr-2' 
                  />
                  </div>
                  <div>
                    <p className='text-xs mt-1 hover:text-white transition-colors duration-300 cursor-pointer border border-cyan-200'>Message</p>
                  </div>
                </div>
              ))}
            </div>


{/* suggested users---------------- */}


            <div className='bg-stone-900 rounded-xl p-5 shadow-lg mx-2 mt-3 overflow-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <p className='text-cyan-400 text-lg font-semibold mb-2'>Suggestons</p>
              <SuggestedUsers/>
            </div>
        </div>


{/* main div---------------- */}


        <div className='md:w-5/6 w-full'>
            <div className="header h-[25%] w-full bg-stone-800 border-b-2 border-[#1d1d1d]">
                <div className='h-3/4 m:h-full w-full'>
                  <Carousel images={images}/>
                </div>


{/* user info in mobile view only---------------- */}


                <div className='h-1/4 -top-28 relative w-full md:hidden'>
                
                  <div className='flex  justify-between items-start p-4 bg-cyan-800 rounded-t-xl m-2 border-b-4 border-r-4 border-cyan-900'>
                    <div className='-mb-3 border-0'>
                      <h2 className="text-white text-lg font-bold">{greeting} {user.fullname}</h2>
                      <p>{user.email}</p>
                      <h3 className="text-white text-xs">username : {user.username}</h3>
                      <p className='text-xs'>Vehicle : {user.car}</p>
                       <Logout/>
                       <EditProfile/>
                       <p>more...</p>
                    </div>
                    <div className="flex flex-col justify-between mt-2">
                    <img 
                      width={100} 
                      height={100} 
                      src={getUserProfileImage(user.profile_pic)} 
                      alt={user.fullname} 
                      className='w-20 rounded-xl h-24'
                    />

                    <p className="text-sm">
                      <span className="font-bold text-cyan-400">{user && user.followers ? user.followers.length : 0}</span> followers
                    </p>
                    <p className="text-sm">
                      <span className="font-bold text-cyan-400">{user && user.following ? user.following.length : 0}</span> following
                    </p>
                  </div>
                  </div>
                </div>   
            </div>


            <div className="flex  h-[75%] w-full bg-stone-800 p-4">
              {/* <p className="text-white font-semibold mb-4">Body</p> */}
              <div className='md:w-1/3 hidden md:flex flex-col  border-r-2 border-[#1d1d1d]'>
                <div className='flex justify-around mb-4 cursor-pointer'>
                  <p className='text-cyan-400 text-lg' onClick={()=>setGMChoice('group')}>Group</p>
                  <p className='text-cyan-400 text-lg' onClick={()=>setGMChoice('message')}>Messages</p>
                </div>
                <div >
                  {gmChoice == 'group' ?
                  <>
                    <Groups/>
                  </>
                  :
                  <>
                    <p>
                      Messages
                    </p>
                  </>}
                
                </div>
                
              
              </div>

                <PostDisplay/>
              
            </div>
        </div>
      </div>




{/* SUBTHREE */}
      <div className="footer h-[2%] bg-stone-900 border-t border-[#1d1d1d]">
        <div className='flex justify-center h-fit bg-stone-950 text-white p-2'>Mode Arena 2024</div>
      </div>


    </div>
  ) 
}

export default UserHome