import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice'; 

function Logout() {
    const route = useRouter()
    const dispatch = useDispatch()

    const handleLogout = ()=>{
        localStorage.removeItem('token-access')
        localStorage.removeItem('token-refresh')
        localStorage.removeItem('username')

        route.push('/login')

        dispatch(clearUser())
    }

  return (
    <>
      <a onClick={handleLogout} className="hover:text-white transition-colors duration-300 cursor-pointer">logout</a>
    </>
  )
}

export default Logout
