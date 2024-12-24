'use client'

import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups, handleJoinGP, handleLeaveGP } from '@/app/utils/fetchUser';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Groups() {
  const dispatch = useDispatch();
  const router = useRouter();
  const allGroups = useSelector((state) => state.user.groups);
  const currentUser = useSelector((state) => state.user); 

  const handleFetchGroups = useCallback(() => {
    fetchGroups(dispatch);
  }, [dispatch]);

  useEffect(() => {
    handleFetchGroups();
  }, [handleFetchGroups]);

  const handleJoin = (groupId) => {
    handleJoinGP(groupId, dispatch);
  };

  const handleLeave = (groupId) => {
    handleLeaveGP(groupId, dispatch);
  };

  return (
    < >
      <div>
        {Array.isArray(allGroups) && allGroups.length > 0 ? (
          allGroups.map((group) => (
            <div key={group.id} className="mb-3 mr-1 p-2 pt-5 rounded-md list-none bg-stone-900">
              {group.group_image && (
                <img onClick={() => router.push(`/groupView/${group.id}/`)} className="rounded-md cursor-pointer max-h-20" src={group.group_image} alt={group.name} width="100" height="100" />
              )}
              <li className="font-bold">{group.name}</li>
              <li>{group.description}</li>
              <li>Members: {1 + group.members.length}</li>

              {/* Check if the current user is already a member of the group */}
              {group.members.some((member) => member.id === currentUser.id) ? (
                <p
                  className="font-extrabold text-md cursor-pointer text-red-600"
                  onClick={() => handleLeave(group.id)}
                >
                  Leave
                </p>
              ) : (
                <>
                  {currentUser.username == group.owner ?
                    <>
                    
                    </>
                    :
                  <>
                    <p
                      className="font-extrabold text-md cursor-pointer text-green-600"
                      onClick={() => handleJoin(group.id)}
                    >
                      
                      Join
                    </p>
                  </>}
                </>
                
              )}
            </div>
          ))
        ) : (
          <p>No groups found! (Length: {Array.isArray(allGroups) ? allGroups.length : 'N/A'})</p>
        )}
      </div>
    </>
  );
}

export default Groups;
