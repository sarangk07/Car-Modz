'use client'

import { useEffect, useState ,useCallback} from 'react';
import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/app/redux/slices/userSlice';
import Logout from '@/app/components/Logout';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Group from './Group';
import { getUserProfileImage } from '@/app/components/imageUtils';



function EditProfile() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState('default');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState('');
  const [car, setCar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const BASE_URL = 'http://127.0.0.1:8000';

  const [greeting, setGreeting] = useState('');
  

  const updateTimeBasedContent = useCallback(() => {
    const hours = new Date().getHours();
    let newGreeting;
    let newTheme;

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
  
  




  const handleEditProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token-access');

    const formData = new FormData();
    if (fullname) formData.append('fullname', fullname);
    if (car) formData.append('car', car);
    if (selectedFile) formData.append('profile_pic', selectedFile);

    if (formData.entries().next().done) {
      alert('No fields to update');
      return;
    }

    try {
      await axios.patch('http://127.0.0.1:8000/api/user/update/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

    
      const response = await axios.get(`http://127.0.0.1:8000/api/user-info/${user.username}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUser = response.data;
      dispatch(setUser(updatedUser));
      console.log('Profile updated successfully:', updatedUser);
      setChoice('default');
      setOpen(false); 
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleChangePic = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageClick = () => {
    if (user.profile_pic) {
      setImageModalOpen(true);
    }
  };

  return (

    
    <>
   
      <div className='md:bg-cyan-700   rounded-xl md:p-5 shadow-lg border-b-4 border-r-4 border-cyan-900 md:mb-4  md:mt-4 md:mx-2'>
        <div className='hidden md:flex w-full md:justify-center'>
          <div className='w-3/3'>
            <div className='flex justify-end'>
              <img onClick={handleImageClick} src={getUserProfileImage(user.profile_pic)} alt="" className='bg-transparent border border-opacity-50 border-l-cyan-300 border-x-4 border-y-2  border-r-cyan-300 border-t-cyan-500 w-20 rounded-full h-20'/>
            </div>
            <h3 className="text-white font-semibold"><span>{greeting}</span> {user.fullname}</h3>
            <p className='text-xs'>{user.car}</p>
            <p>{user.email}</p>
            <div className="flex justify-between mt-2">
              <p className="text-sm">
                <span className="font-bold text-cyan-400">{user && user.followers ? user.followers.length : 0}</span> followers
              </p>
              <p className="text-sm">
                <span className="font-bold text-cyan-400">{user && user.following ? user.following.length : 0}</span> following
              </p>
            </div>
          </div>
          {/* <div className='w-2/3'>
          </div> */}
        </div>
        <div className='md:flex md:justify-around md:mt-2 hidden '>
          <Logout/>
          <button  className="hover:text-white transition-colors duration-300 " disabled>more</button>
        </div>
        <div className='flex flex-col  items-start'>
        <button className="text-sm bg-transparent" onClick={() => setOpen(true)}>
          Edit Profile
        </button>

        <Group/>
        </div>
        

        <Modal open={open} onClose={() => setOpen(false)} center classNames={{ 
            modal: 'editProfileModal',
            overlay: 'editProfileOverlay'
          }}>
          <div className='bg-stone-800  font-mono rounded-xl p-5 shadow-lg mb-4 mt-4 mx-2'>
            <h4 className='text-center  text-white'>Edit Your Profile</h4>
            <form action="" onSubmit={handleEditProfile} className='flex flex-col items-center mt-5'>
              <label htmlFor="profilePic" className='text-white'>Profile Pic</label>
              <input type="file" className='w-4/5 mb-2 text-zinc-200 border rounded-sm bg-cyan-500' name='profilePic' onChange={handleChangePic}/>
              <input type="text" className='w-4/5 mb-2 text-zinc-600 rounded-sm' name='fullname' placeholder='fullname' value={fullname} onChange={(e) => setFullname(e.target.value)}/>
              <input type="text" className='w-4/5 mb-2 text-zinc-600 rounded-sm' name='car' placeholder='change car' value={car} onChange={(e) => setCar(e.target.value)}/>
              <button type='submit' className='bg-blue-500 text-white p-2 rounded'>Update</button>
              {/* <button type='button' className='bg-gray-500 text-white p-2 rounded mt-2' onClick={() => setOpen(false)}>Cancel</button> */}
            </form>
          </div>
        </Modal>



        <Modal 
            open={imageModalOpen} 
            onClose={() => setImageModalOpen(false)} 
            center
              classNames={{
                modal: 'customImageModal',
                overlay: 'customOverlay'
              }}
            >
            <div className="imageContainer">
              <img 
                src={user.profile_pic ? `${BASE_URL}${user.profile_pic}` : './profile.png'} 
                alt="Profile" 
                className="profileImage "
              />
            </div>
        </Modal>
      </div>





      <style jsx global>{`
        .customImageModal {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          width: auto !important;
          max-width: 30% !important;
          max-height:100% !important;
          overflow: hidden !important;
        }
        .customOverlay {
          background: rgba(0, 0, 0, 0.8) !important;
        }
        .react-responsive-modal-closeButton {
          fill: white !important;
          top: 10px !important;
          right: 10px !important;
          z-index: 1;
        }
        .imageContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .profileImage {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          
        }


        .editProfileModal {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .editProfileOverlay {
          background: rgba(0, 0, 0, 0.8) !important;
        }
      `}</style>
    </>
  );
}

export default EditProfile;
