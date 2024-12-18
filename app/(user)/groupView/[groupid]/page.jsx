'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '@/app/utils/fetchUser';
import { handleJoinGP, handleLeaveGP } from '@/app/utils/fetchUser';
import { useRouter } from 'next/navigation';
import EditGroup from '../../components/editGroup';
import { RotateLoader } from 'react-spinners';

function GroupView({ params }) {
    const [gpId, setGpId] = useState(null);
    const [gpDetails, setGpDetails] = useState(null);
    const [isMember, setIsMember] = useState(false);
    const [loadingGroup, setLoadingGroup] = useState(true);
    const currentUser = useSelector((state) => state.user);
    const [loadingUser, setLoadingUser] = useState(true); 
    const [edit,setEdit] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUserData(dispatch); 
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setLoadingUser(false);
        }
    }, [currentUser]);

    useEffect(() => {
        const token = localStorage.getItem('token-access');
        if (params.groupid) {
            setGpId(params.groupid);

            const fetchGroup = async () => {
                if (!token) {
                    console.log("Token not found!");
                    return;
                }
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/groups/${params.groupid}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data) {
                        setGpDetails(response.data);
                        
                        setIsMember(response.data.members.some((member) => member.id === currentUser?.id));
                        setLoadingGroup(false);
                    }
                } catch (e) {
                    console.log('Error fetching group details:', e);
                }
            };
            fetchGroup();
        }
    }, [params.groupid, currentUser]);

    if (loadingGroup || loadingUser) {
        return <div className='flex flex-col w-full h-screen justify-center items-center'>
      

      <RotateLoader color='#35ebc5'/>
    </div>;
    }

    
    const handleJoin = async () => {
        await handleJoinGP(gpDetails?.id, dispatch);
        setIsMember(true); 
    };

    const handleLeave = async () => {
        await handleLeaveGP(gpDetails?.id, dispatch);
        setIsMember(false);
    };

    return (
        <div className='flex flex-col md:flex-row md:h-screen h-auto w-full font-mono'>
    <div className='bg-zinc-800 flex flex-col h-auto md:h-full md:w-1/5 relative p-4'>
        <button onClick={() => router.push('/home')} className='absolute top-4 left-4 p-2 bg-gray-700 rounded hover:bg-gray-600 transition-all'>Back</button>
        
        {gpDetails ? (
            <div className='flex flex-col items-center md:items-start'>
                {/* Image Section */}
                <div className='m-2 flex justify-center rounded-3xl h-1/5'>
                    <img className='rounded-3xl w-full max-w-xs md:max-w-md max-h-32 object-cover' src={gpDetails.group_image} alt="" />
                </div>

                {/* Details Section */}
                <div className='p-2 text-sm md:text-lg font-mono space-y-1'>
                    <p className='font-bold'>{gpDetails.name}</p>
                    <p>{gpDetails.description}</p>
                    <p>Owner: {gpDetails.owner}</p>
                    <p>Members: {gpDetails.members.length + 1}</p>

                    {isMember ? (
                        <p onClick={handleLeave} className="font-extrabold text-md cursor-pointer text-red-600">Leave</p>
                    ) : (
                        <>
                            {currentUser?.username === gpDetails.owner ? (
                                <>
                                    {edit ? (
                                        <>
                                            <p className='cursor-pointer' onClick={() => setEdit(false)}>Back</p>
                                            <EditGroup groupid={gpDetails.id} />
                                        </>
                                    ) : (
                                        <>
                                            <p className='cursor-pointer'>Delete Group</p>
                                            <p className='cursor-pointer'>Remove a Member</p>
                                            <p className='cursor-pointer' onClick={() => setEdit(true)}>Edit</p>
                                        </>
                                    )}
                                </>
                            ) : (
                                <p onClick={handleJoin} className="font-extrabold text-md cursor-pointer text-green-600">Join</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        ) : (
            <>Loading group details...</>
        )}
    </div>

    <div className='bg-black p-3 md:h-full md:w-4/5 h-auto'>
 
    </div>
</div>
    );
}

export default GroupView;
