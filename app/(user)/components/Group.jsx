'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Group() {
  const [choiceG, setChoiceG] = useState('default');
  const [gTitle, setGTitle] = useState('');  
  const [gContent, setGContent] = useState('');
  const [gDP, setGDP] = useState(null);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token-access');

    if (!gTitle || !gContent || !gDP) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', gTitle);
      formData.append('description', gContent);
      formData.append('group_image', gDP);

      const response = await axios.post('http://127.0.0.1:8000/api/groups/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`  
        }
      });

      if(response.status === 200 || response.status === 201) {
        toast.success('Group created successfully!');
        setChoiceG('default'); 
        setGTitle('');
        setGContent('');
        setGDP(null); 
      }
    } catch (e) {
      toast.error(`Error creating group: ${e.response ? e.response.data : e.message}`);
    }
  };

  useEffect(() => {
    if (choiceG === 'create') {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [choiceG]);

  return (
    <>
      {choiceG === 'default' ? (
        <button onClick={() => setChoiceG('create')}>Create a Group</button>
      ) : (
        <div className='z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='relative p-8 bg-stone-800 rounded-lg'>
            <form onSubmit={handleCreateGroup} className='flex flex-col gap-4'>
              <label htmlFor="groupName">Group Name</label>
              <input 
                value={gTitle}
                onChange={(e) => setGTitle(e.target.value)} 
                id="groupName" 
                type="text" 
                className='p-2 text-black rounded-md border border-gray-700' 
              />
              
              <label htmlFor="groupDescription">Group Description</label>
              <input 
                value={gContent}
                onChange={(e) => setGContent(e.target.value)} 
                id="groupDescription" 
                type="text" 
                className='text-black p-2 rounded-md border border-gray-700' 
              />
              
              <label htmlFor="groupDP">DP</label>
              <input 
                onChange={(e) => setGDP(e.target.files[0])} 
                id="groupDP" 
                type="file" 
                className='p-2 rounded-md border border-gray-700' 
              />
              
              <div className='flex gap-4 justify-center'>
                <button type="submit" className='p-2 bg-stone-900 text-white rounded-md'>Create</button>
                <button type="button" onClick={() => setChoiceG('default')} className='p-2 bg-stone-900 text-white rounded-md'>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Group;
