'use client'

import React from 'react'
import Carousel from '@/app/components/carousal';

import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUserData,fetchAllUsers,followUser,unfollowUser, fetchAllShops } from '@/app/utils/fetchUser';
import { useRouter } from 'next/navigation';
import Logout from '@/app/components/Logout';
import axios from 'axios';
import { clearUser } from '@/app/redux/slices/userSlice';
import PostDisplay from './postDisplay';

import SuggestedUsers from './suggestedUser';
import EditProfile from './EditProfile';




function UserHome() {
  const route = useRouter()
  const images = [
    'https://i.pinimg.com/originals/bf/72/f9/bf72f91268216b97ef0f8976e8314432.jpg',
    'https://i.pinimg.com/originals/14/c5/91/14c5913ac14df4378a20cda4c7c7eb26.jpg',
    'https://i.pinimg.com/originals/1a/1e/22/1a1e220a07b5a89ef92732a03a153889.jpg',
  ];

  const user = useSelector((state) => state.user);
  const allusers = useSelector((state) => state.user.users);
  const allshops = useSelector((state) => state.user.shops);
  console.log(user,"user infos");
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 
  



  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();

    if (!user.username && !loading) {
      route.push('/login');
    }
}, [dispatch, user.username, loading, route]);






//   const [fullname,setFullname] = useState('')
//   // const [email,setEmail] = useState('')
//   const [car,setCar] = useState('')
//   const [username,setusername] = useState('')
//   const [selectedFile, setSelectedFile] = useState(null);





//   const handleEditProfile = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token-access');
  
//     const formData = new FormData();
  
//     if (fullname) formData.append('fullname', fullname);
//     if (car) formData.append('car', car);
//     if (username) formData.append('username', username);
//     if (selectedFile) formData.append('profile_pic', selectedFile);
  
//     if (formData.entries().next().done) {
//       alert('No fields to update');
//       return;
//     }
  
//     try {
//       const response = await axios.patch(
//         'http://127.0.0.1:8000/api/user/update/',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       console.log('Profile updated successfully:', response.data);
//       setChoice('default');
//       // Optionally, update the user state here
//     } catch (error) {
//       console.error('Error updating profile:', error.response ? error.response.data : error.message);
//       alert('Failed to update profile. Please try again.');
//     }
//   };


//   const handleChangePic = (event) => {
//     setSelectedFile(event.target.files[0]);
// };

//for local img loading/displaying[for completion of uploaded img url] ......
const BASE_URL = 'http://127.0.0.1:8000';









  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='bg-[#1a1a2e] w-full text-[#f4ecee] h-[1550px] flex flex-col justify-stretch items-stretch'>
      <div className="h-fit bg-[#1a1a2e] border-b border-[#0f3460] shadow-md"></div>
      <div className="h-5/6 flex">
        <div className='flex-col bg-[#16213e] md:w-1/6 border-r border-[#0f3460] hidden md:flex'>

{/* user profile details---------------- */}

<EditProfile/>
           


{/* shop suggestions---------------- */}


            <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mb-4 mx-2'>
              <p className='text-white font-semibold mb-5'>Suggestions</p>
              <div className='flex flex-col  mb-2'>

              {allshops ? allshops.map((x) => (
                <div key={x.id} className='mb-3'>
                  <img src={x.shop_image} alt="" className=' w-10 rounded-xl h-10 mr-3'/>

                  <p className='text-xs'>{x.shop_name}</p>
                  <p className='text-xs mt-1'>{x.description}</p>
                </div>
              )) : <></>}
                  
              </div>
            </div>

 
{/* similar car owner suggestions---------------- */}


            <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mx-2'>
              <p className='text-white font-semibold mb-2'>Similar cars owners</p>
              {allusers.filter((x) => x.car === user.car && x.id !== user.id).map((x) => (
                <div key={x.id} className='flex justify-between items-center mb-2 bg-[#16213e] rounded-lg p-2'>
                  <div className='flex items-center'>
                    <img src={x.profile_pic ? `${BASE_URL}${x.profile_pic}` : './profile.png'} alt="" className=' w-8 rounded-xl h-8 mr-2' />
                    <p className='text-sm'>{x.fullname}</p>
                  </div>
                  <div>
                    
                    <p className='text-xs mt-1 hover:text-white transition-colors duration-300 cursor-pointer border border-cyan-200'>Message</p>
                  </div>
                </div>
              ))}
            </div>


{/* suggested users---------------- */}


            <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mx-2 mt-3 overflow-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <p className='text-white font-semibold mb-2'>Suggestons</p>
              <SuggestedUsers/>
            </div>
        </div>


{/* main div---------------- */}


        <div className='md:w-5/6 w-full'>
            <div className="header h-1/3 w-full bg-[#1a1a2e] border-b border-[#0f3460]">
                <div className='h-3/4 m:h-full w-full'>
                  <Carousel images={images}/>
                </div>


{/* user info in mobile view only---------------- */}


                <div className='h-1/4 -top-28 relative w-full md:hidden'>
                  <div className='flex  justify-between items-start p-4 bg-[#16213e] rounded-xl m-2'>
                    <div className='-mb-3'>
                      <h3 className="text-white font-semibold">{user.username}</h3>
                      <p className='text-xs'>{user.car}</p>
                      <p>{user.email}</p>
                       {/* <button onClick={()=>setChoice('edit-profile')}>edit</button> */}
                       <Logout/>
                       <EditProfile/>
                    </div>
                    <div className="flex flex-col justify-between mt-2">
                    <img src={user.profile_pic ? `${BASE_URL}${user.profile_pic}` :'./profile.png'} alt="" className=' w-20 rounded-xl h-24'/>

                    <p className="text-sm">
                      <span className="font-bold">{user && user.followers ? user.followers.length : 0}</span> followers
                    </p>
                    <p className="text-sm">
                      <span className="font-bold">{user && user.following ? user.following.length : 0}</span> following
                    </p>
                  </div>
                  </div>
                </div>
            </div>

            <div className="flex  h-2/3 w-full bg-[#1a1a2e] p-4">
              {/* <p className="text-white font-semibold mb-4">Body</p> */}
              <div className='md:w-1/3 hidden md:flex border-r border-[#0f3460]'>chats
              
              <p>pendings......
                
                *chating
                *user view popup small 
                *shop&user search
                
              </p>
              
              </div>

                <PostDisplay/>
              
            </div>
        </div>
      </div>
      <div className="footer h-1/6 bg-[#16213e] border-t border-[#0f3460]">
        <div className='flex justify-center h-fit bg-[#0f3460] text-white p-2'>ModHeven</div>
        <div className='flex flex-col items-center justify-center h-fit mt-4'>
          <p className="text-white mb-2">Contact Us</p>
          <ul className='flex space-x-4'>
            <li className="hover:text-white transition-colors duration-300">Report</li>
            <li className="hover:text-white transition-colors duration-300">Help Desk</li>
            {/* <li className="hover:text-white transition-colors duration-300">Instagram</li>
            <li className="hover:text-white transition-colors duration-300">Telegram</li> */}
          </ul>
        </div>
      </div>
    </div>
  ) 
}

export default UserHome