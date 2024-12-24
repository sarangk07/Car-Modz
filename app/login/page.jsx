'use client'

import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch,useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { setUser } from '../redux/slices/userSlice';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';



//ISSUE IN TOKEN AUTH....EXPIR.

//axios instance with default config-------
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });
  
  //handle token expiration globally----------------
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem('token-refresh');
          const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
          
          if (response.status === 200) {
            const { access } = response.data;
            localStorage.setItem('token-access', access);
            api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            originalRequest.headers['Authorization'] = `Bearer ${access}`;
            
            return api(originalRequest);
          }
        } catch (refreshError) {
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );


function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [registerCredentials, setRegisterCredentials] = useState({ username: '', fullname: '', email: '', car: '', password: '', confirmPassword: '' });
    const [page, setPage] = useState('login');
    const [isShopOwner, setIsShopOwner] = useState(false);
    const user = useSelector((state) => state.user);
    const [loading,setLoading] = useState(false)
    
    useEffect(() => {
        const token = localStorage.getItem('token-access');
        if (token) {
            validateToken(token);
        }
    }, [router]);

    const validateToken = async (token) => {
        try {
            const response = await api.post('/token/verify/', { token });
            if (response.status === 200) {
                router.push('/home');
            }
        } catch (error) {
            localStorage.removeItem('token-access');
            localStorage.removeItem('token-refresh');
            localStorage.removeItem('username',)
        }
    };

    useEffect(()=>{
        setRegisterCredentials({ username: '', fullname: '', email: '', car: '', password: '', confirmPassword: '' })
        setCredentials({ username: '', password: '' })
        
    },[page])

   

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
        setLoading(true);
        try {
            const response = await api.post('/token/', { username, password });
            
            if (response.status === 200) {
                const { access, refresh, user } = response.data;
                
                
                api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                
                
                localStorage.setItem('token-access', access);
                localStorage.setItem('token-refresh', refresh);
                localStorage.setItem('username', user.username);
                
                
                dispatch(setUser({ 
                    username, 
                    accessToken: access, 
                    refreshToken: refresh, 
                    userInfo: user 
                }));
                
                toast.success("Welcome...");
                router.push('/home');
            }
        } catch (error) {
            handleLoginError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginError = (error) => {
        if (error.response) {
            if (error.response.status === 400) {
                toast.error("Invalid username or password.");
            } else if (error.response.status === 401) {
                toast.error("Unauthorized. Please check your credentials.");
            } else {
                toast.error("An error occurred during login.");
            }
        } else {
            toast.error("Server not responding.");
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
            await login(credentials.username, credentials.password);
        } else {
            toast.error('Please fill in all fields');
        }
    };

   


    const register = async (registerCredentials) => {
        // const loadingToast = toast.loading('loading...');
        setLoading(true)

        try {
            const payload = { ...registerCredentials };
            if (isShopOwner) {
                payload.is_shopOwner = true;
            }

            // const response = await axios.post('http://127.0.0.1:8000/api/register/', payload);
            const response = await api.post('/register/', payload);
            
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
        setLoading(false)
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
                <div className='flex flex-col items-center mt-20 w-full h-full overflow-x-hidden'>
                    
                    <div 
                        className="z-10 flex rounded-tl-3xl rounded-br-3xl flex-col items-center overflow-hidden w-[90%] max-w-[650px] h-[500px]"
                        style={{
                            backgroundImage: "url('./login.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        >
                    
                    <div className={` backdrop-blur-sm backdrop-grayscale backdrop-brightness-75 absolute right-[5rem] md:right-[31rem] w-[200px]  md:w-[325px] h-[510px]`}/>
                    <div className={` backdrop-blur-sm backdrop-grayscale backdrop-brightness-75 absolute left-[5rem] md:left-[31rem] w-[200px] md:w-[325px] h-[510px]`}/>
                    
                    <form onSubmit={handleSubmit} className='z-10 text-white flex flex-col h-full items-center font-mono justify-around'>
                        <h1>LOGIN</h1>
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
                        <div className='flex flex-col '>
                            <div className='p-5 flex  justify-center'>
                                {loading ? 
                                <>
                                <div>
                                    <BeatLoader color='#4ade80'/>
                                </div>
                                </> 
                                :
                                <>
                                <button type='submit' className='m-0 px-2 border flex rounded-md justify-center  '>Enter</button>
                                </>}
                            </div>
                            <p>Forgot password?</p>
                            <p onClick={() => setPage('register')} className='cursor-pointer'>register</p>
                        </div>
                    </form>
                </div>
            </div>
            
            ) : (
                <div className='  flex flex-col items-center mt-20 w-screen h-full'>
                    <div 
                        className="z-10 rounded-tr-3xl rounded-bl-3xl text-sm md:text-md flex flex-col items-center overflow-hidden w-[90%] max-w-[650px] h-[500px]"
                        style={{
                            backgroundImage: "url('./register.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        >
                    
                    <div className='backdrop-blur-sm backdrop-grayscale backdrop-brightness-75 absolute right-[5rem] md:right-[28rem] w-[200px] md:w-[325px] h-[510px]'/>
                    <div className='backdrop-blur-sm backdrop-grayscale backdrop-brightness-75 absolute left-[5rem] md:left-[30rem] w-[200px] md:w-[325px] h-[510px]'/>

                        
                        
                        <form onSubmit={handleSubmitR} className='flex z-10 flex-col h-full items-center font-mono justify-around'>
                            <h1 className='mb-4'>REGISTER</h1>
                           <div className='md:flex md:ml-3'>
                           
                            <div className='flex flex-col'>
                                <label htmlFor="username" className='mb-5'>Username</label>
                                <input
                                    name="username"
                                    onChange={handleChangeR}
                                    type="text"
                                    className=' bg-transparent mr-3  border-b-2 border-b-slate-800 focus:outline-none focus:ring-0 focus:border-b-slate-800 m-0'
                                    placeholder="fixed , can't change"
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="fullname" className='mb-5 md:text-right'>Fullname</label>
                                <input
                                    name="fullname"
                                    onChange={handleChangeR}
                                    type="text"
                                    className='bg-transparent md:text-right border-b-2 border-b-slate-800 focus:outline-none focus:ring-0 focus:border-b-slate-800 m-0'
                                    placeholder='Enter fullname'
                                    required
                                />
                            </div>
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
                                {loading ? 
                                <>
                                <div className='flex justify-center '>
                                    <BeatLoader color='#ec4899'/>
                                </div>
                                </> 
                                :
                                <>
                                <button type='submit' className='m-0 px-2 border flex rounded-md justify-center  '>Enter</button>
                                </>}
                                <div className='flex'>
                                <p onClick={() => setPage('login')} className='cursor-pointer'>Have account, login</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
