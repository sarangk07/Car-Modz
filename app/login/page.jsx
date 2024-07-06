'use client'

import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

// import { toast } from 'react-toastify'; // Ensure you have react-toastify installed and configured

function Login() {
    const router = useRouter()
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [page,setPage] = useState('login');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
            if (response.status === 200) {
                console.log('response:', response.data);
                console.log("token-A", response.data.access);
                console.log("token-R", response.data.refresh);
                console.log('user:', response.data.user);


                dispatch(setUser({ username, accessToken: response.data.access, refreshToken: response.data.refresh, userInfo:response.data.user }));
                
                router.push('home');
                
            } else {
                toast.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            // toast.error('An error occurred during login');
        } finally {
            console.log('Login attempt completed');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
            login(credentials.username, credentials.password);
        } else {
            // toast.error('Please fill in all fields');
            console.log('fill the forms');
        }
    };

    return (
        <>
        {page == 'login' ? 
    <>
    <div className='flex flex-col items-center mt-20 w-screen h-full'>
            <div className='flex flex-col items-center bg-slate-700 w-[650px] h-[500px]'>
                <h1>LOGIN</h1>
                <form onSubmit={handleSubmit} className='flex flex-col h-full items-center justify-around'>
                    <div className='flex flex-col'>
                        <label htmlFor="username" className='mb-5'>Username</label>
                        <input
                            name="username"
                            onChange={handleChange}
                            type="text"
                            className='bg-transparent border-b-2 border-b-slate-800 m-0'
                            placeholder='Enter username'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='mb-5'>Password</label>
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            className='bg-transparent border-b-2 border-b-slate-800 m-0'
                            placeholder='Enter password'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <button type='submit' className='pb-5'>Enter</button>
                        <p>Forgot password?</p>
                        <p onClick={()=>setPage('register')}>register</p>
                    </div>
                </form>
            </div>
        </div>
    </>   
    
    
    :

    <>
    <div className='flex flex-col items-center mt-20 w-screen h-full'>
            <div className='flex flex-col items-center bg-slate-700 w-[650px] h-[500px]'>
                <h1>REGISTER</h1>
                <form onSubmit={handleSubmit} className='flex flex-col h-full items-center justify-around'>
                    <div className='flex flex-col'>
                        <label htmlFor="username" className='mb-5'>Username</label>
                        <input
                            name="username"
                            // onChange={handleChange}
                            type="text"
                            className='bg-transparent border-b-2 border-b-slate-800 m-0'
                            placeholder='Enter username'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="fullname" className='mb-5'>Fullname</label>
                        <input
                            name="fullname"
                            // onChange={handleChange}
                            type="text"
                            className='bg-transparent border-b-2 border-b-slate-800 m-0'
                            placeholder='Enter fullname'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='mb-5'>password</label>
                        <input
                            name="password"
                            // onChange={handleChange}
                            type="password"
                            className='bg-transparent border-b-2 border-b-slate-800 m-0'
                            placeholder='Enter password'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='mb-5'>con-Password</label>
                        <input
                            name="password"
                            // onChange={handleChange}
                            type="password"
                            className='bg-transparent border-b-2 border-b-slate-800 m-0'
                            placeholder='Enter password'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <button type='submit' className='pb-5'>Enter</button>
                        <p>Forgot password?</p>
                        <p onClick={()=>setPage('login')}>have account , login</p>
                    </div>
                </form>
            </div>
        </div>
    </>
    
    }
        
        </>
    );
}

export default Login;
