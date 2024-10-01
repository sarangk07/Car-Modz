'use client'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, fetchAllUsers, followUser, unfollowUser } from '@/app/utils/fetchUser';
import { useRouter } from 'next/navigation';

const BASE_URL = 'http://127.0.0.1:8000';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function SuggestedUsers() {
    const router = useRouter();
    const dispatch = useDispatch();
    const allusers = useSelector((state) => state.user.users);
    const user = useSelector((state) => state.user);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        if (allusers && user.id) {
            const shuffledUsers = shuffleArray(allusers.filter((x) => x.id !== user.id && !x.is_shopOwner));
            setSuggestedUsers(shuffledUsers.slice(0, 10));
        }
    }, [allusers, user.id]);

    return (
        <>
            {suggestedUsers.map((userItem) => (
                <div key={userItem.id} className='bg-stone-900 rounded-xl p-5 shadow-lg mb-4 w-full md:w-full lg:w-full'>
                    <div className='flex'>
                        <img src={userItem.profile_pic ? `${BASE_URL}${userItem.profile_pic}` : './profile.png'} alt="" className='bg-transparent cursor-pointer w-8 rounded-xl h-8 mr-3' onClick={()=> router.push(`/userView/${userItem.id}`)} />
                        <div>
                            <h3 className='text-white font-semibold'>{userItem.fullname}</h3>
                            <p className='text-xs'>{userItem.car}</p>
                            {userItem.followers.some(follower => follower.follower === user.id) ? (
                                <button onClick={() => unfollowUser(userItem.id, dispatch)} className='mt-2'>Unfollow</button>
                            ) : (
                                <button onClick={() => followUser(userItem.id, dispatch)} className='mt-2'>Follow</button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SuggestedUsers;
