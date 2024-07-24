'use client'

import React from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { clearUser } from '@/app/redux/slices/userSlice';




function DeleteAcc() {
    const dispatch = useDispatch();
    const route = useRouter()
    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Are you sure? After deleting, you can't recover your account.");
        

    
        if (confirmation) {
            try {
                const token = localStorage.getItem('token-access');
                const response = await axios.delete('http://127.0.0.1:8000/api/delete_account/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 204) {
                    console.log('Account deleted successfully');
                    localStorage.removeItem('token-access');
                    localStorage.removeItem('token-refresh');
                    localStorage.removeItem('username');
                    dispatch(clearUser());
                    route.push('/login');
                } else {
                    console.error('Failed to delete account');
                }
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        } else {
            console.log('Account deletion cancelled');
        }
      };
  return (
    <button onClick={handleDeleteAccount}>delete your account</button> 

  )
}

export default DeleteAcc
