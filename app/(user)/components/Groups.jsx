'use client'

import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups } from '@/app/utils/fetchUser';

function Groups() {
  const [choice5, setChoice5] = useState('default');
  const dispatch = useDispatch();
  
  // Updated selector
  const allGroups = useSelector((state) => {
    console.log('Entire Redux state:', state);
    console.log('Groups in Redux state:', state.user.groups);
    return state.user.groups;
  });

  const handleFetchGroups = useCallback(() => {
    fetchGroups(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (choice5 === 'listGroups') {
      handleFetchGroups();
    }
  }, [choice5, handleFetchGroups]);

  console.log('allGroups in component:', allGroups); // Debugging log

  return (
    <div>
      {choice5 === 'default' && (
        <button onClick={() => setChoice5('listGroups')}>Groups</button>
      )}
      {choice5 === 'listGroups' && (
        <div>
        <button onClick={()=>setChoice5('default')}>back</button>
          {Array.isArray(allGroups) && allGroups.length > 0 ? (
            allGroups.map((x) => (
              <div key={x.id} className='pb-6 pt-5 list-none'>
                {x.group_image && (
                  <img className='rounded-md' src={x.group_image} alt={x.name} width="100" height="100" />
                )}
                <li className='font-bold'>{x.name}</li>
                <li>{x.description}</li>
                
              </div>
            ))
          ) : (
            <p>No groups found! (Length: {Array.isArray(allGroups) ? allGroups.length : 'N/A'})</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Groups;