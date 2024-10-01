'use client'

import axios from 'axios';
import React, { useState } from 'react';

function EditGroup({ groupid }) {
  const [gname, setGname] = useState('');
  const [gcontent, setGcontent] = useState('');
  const [gDp, setGdp] = useState(null);  
  const [dpPreview, setDpPreview] = useState(null); 
  const [message, setMessage] = useState('');  
  const [isLoading, setIsLoading] = useState(false);  

  console.log('gp-id', groupid);

  const handleEdit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    setIsLoading(true);  

    try {
      const token = localStorage.getItem('token-access');
      const formData = new FormData();

      if (gname) formData.append('name', gname);
      if (gcontent) formData.append('description', gcontent);
      if (gDp) formData.append('group_image', gDp);

      if (groupid && token) {
        let response = await axios.patch(`http://127.0.0.1:8000/api/groups/${groupid}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('responseeee', response.data);

        
        setGname('');
        setGcontent('');
        setGdp(null);
        setDpPreview(null);  

        
        setMessage('Group updated successfully!');
      } else {
        setMessage('No group ID or token found!');
      }
    } catch (e) {
      console.error('Error while editing:', e.response ? e.response.data : e.message);
      setMessage('Failed to update group. Please try again.');
    } finally {
      setIsLoading(false);  
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGdp(file);
    
    
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setDpPreview(previewUrl);
    } else {
      setDpPreview(null);
    }
  };

  return (
    <div className="text-zinc-900 bg-violet-700 rounded-md">
      <form action="" onSubmit={handleEdit} className='text-zinc-900 p-3 flex flex-col'>
        <input 
          className='text-zinc-900' 
          type="text" 
          placeholder='Group name' 
          value={gname} 
          onChange={(e) => setGname(e.target.value)} 
        />
        <input 
          className='text-zinc-900' 
          type="text" 
          placeholder='Description' 
          value={gcontent}  
          onChange={(e) => setGcontent(e.target.value)} 
        />
        
        
        <input 
          className='text-zinc-100  text-xs' 
          type="file" 
          onChange={handleFileChange}  
        />
        
       
        {dpPreview && (
          <div className='mt-4'>
            <p>Image Preview:</p>
            <img src={dpPreview} alt="Group DP Preview" className="w-20 h-20 object-cover" />
          </div>
        )}

        <button 
          className='text-zinc-100' 
          type='submit' 
          disabled={isLoading}  
        >
          {isLoading ? 'Updating...' : 'Submit'}
        </button>
      </form>

      
      {message && <p className={`mt-2 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
    </div>
  );
}

export default EditGroup;
