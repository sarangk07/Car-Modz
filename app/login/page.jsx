

'use client'

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [registerCredentials, setRegisterCredentials] = useState({ username: '', fullname: '', email: '', car: '', password: '', confirmPassword: '' });
    const [page, setPage] = useState('login');
    const [isShopOwner, setIsShopOwner] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleChangeR = (e) => {
        setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = () => {
        setIsShopOwner(!isShopOwner);
    };

    const login = async (username, password) => {
        const loadingToast = toast.loading('Logging in...');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
            if (response.status === 200) {
                const { access, refresh, user } = response.data;
                localStorage.setItem('token-access', access);
                localStorage.setItem('token-refresh', refresh);
                localStorage.setItem('username', user.username);
                dispatch(setUser({ username, accessToken: access, refreshToken: refresh, userInfo: user }));
                setCredentials({ username: '', password: '' });
                toast.success("Sucess", { id: loadingToast })
                router.push('home');
            } else {
                toast.error("Login failed. Please try again.", { id: loadingToast })

                console.error('Login failed. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error("Invalid username or password. Please try again.")
                    console.error('Invalid username or password. Please try again.');
                } else if (error.response.status === 401) {
                    toast.error("Unauthorized. Please check your credentials.")
                    console.error('Unauthorized. Please check your credentials.');
                } else {
                    toast.error("An error occurred during login.")
                    console.error('An error occurred during login.');
                }
            } else if (error.request) {
                toast.error('No response received: ', error.request)
                console.error('No response received:', error.request);
            } else {
                toast.error("Error setting up request: ",error.message)
                console.error('Error setting up request:', error.message);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
            login(credentials.username, credentials.password);
        } else {
            toast(
                'Please fill in all fields',
                {
                  duration: 2000,
                }
              );
            console.error('Please fill in all fields');
        }
    };

    const register = async (registerCredentials) => {
        const loadingToast = toast.loading('loading...');

        try {
            const payload = { ...registerCredentials };
            if (isShopOwner) {
                payload.is_shopOwner = true;
            }

            const response = await axios.post('http://127.0.0.1:8000/api/register/', payload);
            if (response.status === 201) {
                console.log('Registration successful');
                setRegisterCredentials({ username: '', fullname: '', email: '', car: '', password: '', confirmPassword: '' }); 

                setPage('login');
                toast.success("Created", { id: loadingToast })

            } else {
                toast.error("Registration failed",{ id: loadingToast })
                console.error('Registration failed');
            }
        } catch (error) {
            toast.error('Registration error:', error)
            console.error('Registration error:', error.message);
        }
    };

    const handleSubmitR = (e) => {
        e.preventDefault();
        const { username, fullname, email, car, password, confirmPassword } = registerCredentials;
        if (username && fullname && email && password && password === confirmPassword) {
            register({ username, fullname, email, car: isShopOwner ? '' : car, password });
        } else {
            toast.error('Please fill in all fields correctly and ensure passwords match')

            console.error('Please fill in all fields correctly and ensure passwords match');
        }
    };

    return (
        <>
        <Toaster
            position="top-center"
            reverseOrder={false}
            />
            {page === 'login' ? (
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
                                    className='bg-transparent border-b-2 border-b-slate-800 focus:outline-none focus:ring-0 focus:border-b-slate-800 m-0'
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
                                    className='bg-transparent border-b-2 border-b-slate-800 focus:outline-none focus:ring-0 focus:border-b-slate-800 m-0'
                                    placeholder='Enter password'
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <button type='submit' className='pb-5'>Enter</button>
                                <p>Forgot password?</p>
                                <p onClick={() => setPage('register')} className='cursor-pointer'>register</p>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col items-center mt-20 w-screen h-full'>
                    <div className='flex flex-col items-center bg-slate-700 w-[650px] h-[500px]'>
                        <h1>REGISTER</h1>
                        <form onSubmit={handleSubmitR} className='flex flex-col h-full items-center justify-around'>
                            <div className='flex flex-col'>
                                <label htmlFor="username" className='mb-5'>Username</label>
                                <input
                                    name="username"
                                    onChange={handleChangeR}
                                    type="text"
                                    className=' bg-transparent border-b-2 border-b-slate-800 focus:outline-none focus:ring-0 focus:border-b-slate-800 m-0'
                                    placeholder="fixed , can't change"
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="fullname" className='mb-5'>Fullname</label>
                                <input
                                    name="fullname"
                                    onChange={handleChangeR}
                                    type="text"
                                    className='bg-transparent border-b-2 border-b-slate-800 focus:outline-none focus:ring-0 focus:border-b-slate-800 m-0'
                                    placeholder='Enter fullname'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="isShopOwner">Shop Owner?</label>
                                <input type="checkbox" name="isShopOwner" id="isShopOwner" checked={isShopOwner} onChange={handleCheckboxChange} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="email" className='mb-5'>Email</label>
                                <input
                                    name="email"
                                    onChange={handleChangeR}
                                    type="email"
                                    className='bg-transparent border-b-2 border-b-slate-800 focus:outline-none focus:ring-0 focus:border-b-slate-800 m-0'
                                    placeholder='Enter email'
                                    required
                                />
                            </div>
                            {!isShopOwner && (
                                <div className='flex flex-col'>
                                    <label htmlFor="car" className='mb-5'>Your car</label>
                                    <input
                                        name="car"
                                        onChange={handleChangeR}
                                        type="text"
                                        className='bg-transparent border-b-2 border-b-slate-800 focus:outline-none focus:ring-0 focus:border-b-slate-800 m-0'
                                    />
                                </div>
                            )}
                            <div className='flex flex-col'>
                                <label htmlFor="password" className='mb-5'>Password</label>
                                <input
                                    name="password"
                                    onChange={handleChangeR}
                                    type="password"
                                    className='bg-transparent border-b-2 border-b-slate-800 focus:outline-none focus:ring-0 focus:border-b-slate-800 m-0'
                                    placeholder='Enter password'
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="confirmPassword" className='mb-5'>Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    onChange={handleChangeR}
                                    type="password"
                                    className='bg-transparent border-b-2 border-b-slate-800 focus:outline-none focus:ring-0 focus:border-b-slate-800 m-0'
                                    placeholder='Enter password'
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <button type='submit' className='pb-5'>Enter</button>
                                <p>Forgot password?</p>
                                <p onClick={() => setPage('login')} className='cursor-pointer'>Have account, login</p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
