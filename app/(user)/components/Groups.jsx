'use client'

import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups, handleJoinGP, handleLeaveGP } from '@/app/utils/fetchUser';
import { useRouter } from 'next/navigation';

function Groups() {
  const dispatch = useDispatch();
  const router = useRouter();
  const allGroups = useSelector((state) => state.user.groups);
  const currentUser = useSelector((state) => state.user); 

  const [randomGroups, setRandomGroups] = useState([]);

  const handleFetchGroups = useCallback(() => {
    fetchGroups(dispatch);
  }, [dispatch]);

  
  useEffect(() => {
    if (Array.isArray(allGroups) && allGroups.length > 0 && randomGroups.length === 0) {
      if (allGroups.length <= 4) {
        setRandomGroups(allGroups);
      } else {
        const shuffled = [...allGroups].sort(() => 0.5 - Math.random());
        setRandomGroups(shuffled.slice(0, 4));
      }
    }
  }, [allGroups, randomGroups.length]);

  
  useEffect(() => {
    if (randomGroups.length > 0 && Array.isArray(allGroups)) {
      const updatedGroups = randomGroups.map(randomGroup => 
        allGroups.find(group => group.id === randomGroup.id) || randomGroup
      );
      setRandomGroups(updatedGroups);
    }
  }, [allGroups]);

  const handleJoin = (groupId) => {
    handleJoinGP(groupId, dispatch);
  };

  const handleLeave = (groupId) => {
    handleLeaveGP(groupId, dispatch);
  };
  
  useEffect(()=>{
    handleFetchGroups()
  },[])

  return (
    <>
      <div>
        {randomGroups.length > 0 ? (
          randomGroups.map((group) => (
            <div key={group.id} className="mb-3 mr-1 p-2 pt-5 rounded-md list-none bg-stone-900">
              {group.group_image && (
                <img 
                  onClick={() => router.push(`/groupView/${group.id}/`)} 
                  className="rounded-md cursor-pointer max-h-20" 
                  src={group.group_image} 
                  alt={group.name} 
                  width="100" 
                  height="100" 
                />
              )}
              <li className="font-bold">{group.name}</li>
              <li>{group.description}</li>
              <li>Members: {1 + group.members.length}</li>

              {group.members.some((member) => member.id === currentUser.id) ? (
                <p
                  className="font-extrabold text-md cursor-pointer text-red-600"
                  onClick={() => handleLeave(group.id)}
                >
                  Leave
                </p>
              ) : (
                currentUser.username !== group.owner && (
                  <p
                    className="font-extrabold text-md cursor-pointer text-green-600"
                    onClick={() => handleJoin(group.id)}
                  >
                    Join
                  </p>
                )
              )}
            </div>
          ))
        ) : (
          <p>No groups found!</p>
        )}
      </div>
    </>
  );
}

export default Groups;