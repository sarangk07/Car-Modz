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
        <div className='w-full flex flex-col md:flex-row md:h-screen h-[200vh]'>
            <div className='bg-violet-900 flex flex-col md:h-screen md:w-1/5 h-2/6 z-20'>
            <button onClick={()=> router.push('/home')} className='flex justify-start p-2'>back</button>
                {gpDetails ? (
                    <>
                        {/* Mobile */}
                        <div className='m-3 flex rounded-3xl md:justify-center justify-end h-1/5'>
                            <img className='rounded-3xl md:max-w-4xl md:max-h-48 max-w-52 max-h-36' src={gpDetails.group_image} alt="" />
                        </div>
                        <div className='p-3 h-4/5 md:mt-5 text-sm md:text-lg font-mono'>
                            <p>{gpDetails.name}</p>
                            <p>{gpDetails.description}</p>
                            <p>Owner: {gpDetails.owner}</p>
                            <p>Members: {gpDetails.members.length + 1}</p>
                            {isMember ? (
                                <p onClick={handleLeave} className="font-extrabold text-md cursor-pointer text-red-600">
                                    Leave
                                </p>
                            ) : (
                                <>
                                    {currentUser?.username === gpDetails.owner ? (
                                        <> 
                                        
                                        {edit == true ? 
                                        <>
                                        <p className='cursor-pointer' onClick={()=>setEdit(false)}>back</p>
                                        <EditGroup groupid={gpDetails.id}/>

                                        </>:
                                        <>
                                        <p>delete group</p>
                                        <p>remove member</p>
                                        <p className='cursor-pointer' onClick={()=>setEdit(true)}>edit</p>

                                        </>}
                                        
                                        
                                         </>
                                    ) : (
                                        <p onClick={handleJoin} className="font-extrabold text-md cursor-pointer text-green-600">
                                            Join
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <>Loading group details...</>
                )}
            </div>

            <div className='p-3 bg-black md:h-screen md:w-4/5 h-4/6'>
                
            </div>
        </div>
    );
}

export default GroupView;
