'use client'

import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import DeleteAcc from './deleteAcc';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/app/redux/slices/userSlice';
import Logout from '@/app/components/Logout';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';




function EditProfile() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState('default');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState('');
  const [car, setCar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const BASE_URL = 'http://127.0.0.1:8000';

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

      // Fetch the updated user data
      const response = await axios.get(`http://127.0.0.1:8000/api/user-info/${user.username}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUser = response.data;
      dispatch(setUser(updatedUser)); // Update Redux store with the new user data
      console.log('Profile updated successfully:', updatedUser);
      setChoice('default');
      setOpen(false); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleChangePic = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (

    
    <>
   
      <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mb-4 mt-4 mx-2'>
        <div className='flex'>
          <div>
            <h3 className="text-white font-semibold">{user.fullname}</h3>
            <p className='text-xs'>{user.car}</p>
            <p>{user.email}</p>
            <div className="flex justify-between mt-2">
              <p className="text-sm">
                <span className="font-bold">{user && user.followers ? user.followers.length : 0}</span> followers
              </p>
              <p className="text-sm">
                <span className="font-bold">{user && user.following ? user.following.length : 0}</span> following
              </p>
            </div>
          </div>
          <div>
            <img src={user.profile_pic ? `${BASE_URL}${user.profile_pic}` : ''} alt="" className='bg-[#0f3460] w-8 rounded-xl h-8 ml-2'/>
          </div>
        </div>
        <div className='flex justify-around mt-2'>
          <Logout/>
          <a href="" className="hover:text-white transition-colors duration-300">more</a>
        </div>

        <button className="button" onClick={() => setOpen(true)}>
          Edit Profile
        </button>

        <Modal open={open} onClose={() => setOpen(false)} center classNames={{ modal: 'bg-transparent' }}>
          <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mb-4 mt-4 mx-2'>
            <h4 className='text-center text-white'>Edit Your Profile</h4>
            <form action="" onSubmit={handleEditProfile} className='flex flex-col items-center mt-5'>
              <label htmlFor="profilePic" className='text-white'>Upload / change DP</label>
              <input type="file" className='w-4/5 mb-2 text-zinc-600' name='profilePic' onChange={handleChangePic}/>
              <input type="text" className='w-4/5 mb-2 text-zinc-600' name='fullname' placeholder='fullname' value={fullname} onChange={(e) => setFullname(e.target.value)}/>
              <input type="text" className='w-4/5 mb-2 text-zinc-600' name='car' placeholder='change car' value={car} onChange={(e) => setCar(e.target.value)}/>
              <button type='submit' className='bg-blue-500 text-white p-2 rounded'>Update</button>
              <button type='button' className='bg-gray-500 text-white p-2 rounded mt-2' onClick={() => setOpen(false)}>Cancel</button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default EditProfile;
