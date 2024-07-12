'use client'

import React from 'react'
import Carousel from '../components/carousal'
// import Link from 'next/link';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUserData,fetchAllUsers  } from '../utils/fetchUser';
import { useRouter } from 'next/navigation';
import Logout from '../components/Logout';
import axios from 'axios';
import { clearUser } from '../redux/slices/userSlice';
import PostCreate from '../(user)/components/PostCreate';


function Home() {
  const route = useRouter()
  const images = [
    'https://i.pinimg.com/originals/bf/72/f9/bf72f91268216b97ef0f8976e8314432.jpg',
    'https://i.pinimg.com/originals/14/c5/91/14c5913ac14df4378a20cda4c7c7eb26.jpg',
    'https://i.pinimg.com/originals/1a/1e/22/1a1e220a07b5a89ef92732a03a153889.jpg',
  ];

  const user = useSelector((state) => state.user);
  const allusers = useSelector((state) => state.user.users);
  console.log(user,"user infos");
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 
  const [choice,setChoice] = useState('default')
  

 

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm("Are you sure? After deleting, you can't recover your account.");

    if (confirmation) {
        try {
            const token = localStorage.getItem('token-access');
            const response = await axios.delete('http://127.0.0.1:8000/api/delete_account/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 204) {
                console.log('Account deleted successfully');
                localStorage.removeItem('token-access');
                localStorage.removeItem('token-refresh');
                localStorage.removeItem('username');
                dispatch(clearUser());
                route.push('/login');
            } else {
                console.error('Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    } else {
        console.log('Account deletion cancelled');
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      console.log('Starting fetchUserData');
      await fetchUserData(dispatch);
      console.log('Completed fetchUserData');
      
      console.log('Starting fetchAllUsers');
      await fetchAllUsers(dispatch);
      
      console.log('Completed fetchAllUsers');
      setLoading(false); 
    };

    fetchData();

    if (!user.username && !loading) {
      route.push('/login');
    }
  }, [dispatch, user.username, loading, route]);
  console.log(allusers,'all users');




  const [fullname,setFullname] = useState('')
  // const [email,setEmail] = useState('')
  const [car,setCar] = useState('')
  const [username,setusername] = useState('')



  const handleEditProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token-access');
    console.log('datas: ', fullname, car, username);

    // Create an object to hold the updated fields
    let updatedData = {};

    if (fullname) updatedData.fullname = fullname;
    if (car) updatedData.car = car;
    if (username) updatedData.username = username;

    // If no fields are updated, return early
    if (Object.keys(updatedData).length === 0) {
      alert('No fields to update');
      return;
    }
    console.log('datas: ', fullname, car, username);

    try {
      const response = await axios.patch(
        'http://127.0.0.1:8000/api/user/update/',
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Profile updated successfully:', response.data);
      setChoice('default');
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      alert('Failed to update profile. Please try again.');
    }


    setChoice('default')
  };



  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='bg-[#1a1a2e] w-full text-[#f4ecee] h-[1550px] flex flex-col justify-stretch items-stretch'>
      <div className="h-fit bg-[#1a1a2e] border-b border-[#0f3460] shadow-md">nav</div>
      <div className="h-5/6 flex">
        <div className='flex-col bg-[#16213e] md:w-1/6 border-r border-[#0f3460] hidden md:flex'>
            <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mb-4 mt-4 mx-2'>
              <div className='flex'>
                <div>
                  <h3 className="text-white font-semibold">{user.fullname}</h3>
                  <p className='text-xs'>{user.car}</p>
                  <p>{user.email}</p>
                </div>
                <div>
                <img src="https://i.pinimg.com/564x/f5/04/7f/f5047fb11c11eef52ab8e661addbc9ed.jpg" alt="" className='bg-[#0f3460] w-16 rounded-xl h-10 ml-2'/>
                </div>
                </div>
              <div className='flex justify-around mt-2'>
                <Logout/>
                {/* <button onClick={handleDeleteAccount}>delete your account</button> */}
                <a href="" className="hover:text-white transition-colors duration-300">more</a>
              </div>
              <button onClick={()=>setChoice('edit-profile')}>edit</button>
            </div>
              {
                choice == 'edit-profile' ?
                <>
                <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mb-4 mt-4 mx-2 '>
                  <h4 className='text-center'>Edit Your Profile</h4>
                  <form action="" onSubmit={handleEditProfile } className=' flex flex-col items-center mt-5' >
                    <input type="text" className='w-4/5 mb-2'  name='fullname' placeholder='fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
                    {/* <input type="email" className='w-4/5 mb-2' placeholder='change email' name='email' onChange={(e)=>setEmail(e.target.value)}/> */}
                    <input type="text" className='w-4/5 mb-2' placeholder='change car' name='car' value={car}  onChange={(e)=>setCar(e.target.value)}/>
                    <input type="text" className='w-4/5 mb-2' placeholder='change username' name='username' value={username}  onChange={(e)=>setusername(e.target.value)}/>
                    <button type='submit'>Update</button>
                  </form>
                </div>
                </> 
                
                :
                
                <>
                
                </>
              }

            <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mb-4 mx-2'>
              <p className='text-white font-semibold mb-2'>Suggestions</p>
              <div className='flex items-center mb-2'>
                  <img src="https://wolfmoto.in/wp-content/themes/wolf-motors/images/logo.png" alt="" className='bg-[#0f3460] w-10 rounded-xl h-10 mr-3'/>
                <div>
                  <p className='text-xs'>Wolf Performance</p>
                  <p className='text-xs mt-1'>Rating</p>
                </div>
              </div>

              <div className='flex items-center'>
                <img src="https://code6.racing/image/catalog/logo.png" alt="" className='bg-[#0f3460] w-10 rounded-xl h-10 mr-3'/>
                <div>
                  <p className='text-xs'>Code 6</p>
                  <p className='text-xs mt-1'>Rating</p>
                </div>
              </div>
            </div>

            <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mx-2'>
              <p className='text-white font-semibold mb-2'>Similar cars owners</p>
              {allusers.filter((x) => x.car === user.car && x.id !== user.id).map((x) => (
                <div key={x.id} className='flex justify-between items-center mb-2 bg-[#16213e] rounded-lg p-2'>
                  <div className='flex items-center'>
                    <img src={x.profile_pic} alt="" className='bg-[#0f3460] w-8 rounded-xl h-8 mr-2' />
                    <p>{x.fullname}</p>
                  </div>
                  <div>
                    <p className="text-xs hover:text-white transition-colors duration-300 cursor-pointer">Connect</p>
                    <p className='text-xs mt-1 hover:text-white transition-colors duration-300 cursor-pointer'>Message</p>
                  </div>
                </div>
              ))}
            </div>




            <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mx-2'>
              <p className='text-white font-semibold mb-2'>Suggestons</p>
              {allusers.map((x) => (
              <div key={x.id} className='flex justify-between items-center mb-2 bg-[#16213e] rounded-lg p-2'>
                <div className='flex items-center'>
                  <img src={x.profile_pic} alt="" className='bg-[#0f3460] w-8 rounded-xl h-8 mr-2' />
                  <p>{x.fullname}</p>
                </div>
                <div>
                  <p className="text-xs hover:text-white transition-colors duration-300 cursor-pointer">Connect</p>
                  <p className='text-xs mt-1 hover:text-white transition-colors duration-300 cursor-pointer'>Message</p>
                </div>
              </div>
            ))}
            </div>
        </div>
        <div className='md:w-5/6 w-full'>
            <div className="header h-1/3 w-full bg-[#1a1a2e] border-b border-[#0f3460]">
                <div className='h-3/4 m:h-full w-full'>
                  <Carousel images={images}/>
                </div>
                <div className='h-1/4 w-full md:hidden'>
                  <div className='flex justify-between items-start p-4 bg-[#16213e] rounded-xl m-2'>
                    <div>
                      <h3 className="text-white font-semibold">{user.username}</h3>
                      <p className='text-xs'>{user.car}</p>
                      <p>{user.email}</p>
                    </div>
                    <img src="https://i.pinimg.com/564x/f5/04/7f/f5047fb11c11eef52ab8e661addbc9ed.jpg" alt="" className='bg-[#0f3460] w-10 rounded-xl h-10'/>
                  </div>
                </div>
            </div>

            <div className="flex  h-2/3 w-full bg-[#1a1a2e] p-4">
              {/* <p className="text-white font-semibold mb-4">Body</p> */}
              <div className='md:w-1/3 hidden md:flex border-r border-[#0f3460]'>chats</div>
              <div className='md:w-2/3 h-full flex flex-col'>
                <div className="text-center mb-4">posts</div>
                <PostCreate/>
                <div className='flex-1 overflow-y-auto m-3'  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className='border-b-4 border-zinc-900 bg-zinc-700 h-[100vh] mb-5 object-cover rounded-3xl'>
                    <img src="https://i.pinimg.com/564x/f5/04/7f/f5047fb11c11eef52ab8e661addbc9ed.jpg" alt="" className='relative w-full h-[90%] rounded-3xl' />
                    <div className='flex justify-between items-center mt-0 mb-0 pt-5 ml-5 mr-5 h-[10%]'>
                      <button>like</button>
                      <button>comment</button>
                      <button>share</button>
                    </div>    
                  </div>

                  <div className='border-b-4 border-zinc-900 bg-zinc-700 h-[100vh] mb-5 object-cover rounded-3xl'>
                    <img src="https://i.pinimg.com/originals/d3/d4/43/d3d44386662eaf2c3b6b070bc29226ed.jpg " alt="" className='relative w-full h-[90%] rounded-3xl' />
                    <div className='flex justify-between items-center mt-0 mb-0 pt-5 ml-5 mr-5 h-[10%]'>
                      <button>like</button>
                      
                      <button>comment</button>
                      <button>share</button>
                    </div>     
                  </div>
                </div>
              </div>
              
            </div>
        </div>
      </div>
      <div className="footer h-1/6 bg-[#16213e] border-t border-[#0f3460]">
        <div className='flex justify-center h-fit bg-[#0f3460] text-white p-2'>site info</div>
        <div className='flex flex-col items-center justify-center h-fit mt-4'>
          <p className="text-white mb-2">follow us on</p>
          <ul className='flex space-x-4'>
            <li className="hover:text-white transition-colors duration-300">Facebook</li>
            <li className="hover:text-white transition-colors duration-300">X</li>
            <li className="hover:text-white transition-colors duration-300">Instagram</li>
            <li className="hover:text-white transition-colors duration-300">Telegram</li>
          </ul>
        </div>
      </div>
    </div>
  ) 
}

export default Home