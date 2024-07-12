
import axios from 'axios';
import { setUser,setUsers } from '../redux/slices/userSlice';

export const fetchUserData = async (dispatch) => {
  const username = localStorage.getItem('username');
  const authToken = localStorage.getItem('token-access');
  console.log(username,authToken);

  if (!username || !authToken) {
    console.error('Username or auth token not found in localStorage');
    return null;
  }

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/user-info/${username}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    
    dispatch(setUser({
      ...response.data,
      accessToken: authToken,
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};




// Fetch all users from API
export const fetchAllUsers = async (dispatch) =>{
  const authToken = localStorage.getItem('token-access');
  
  if (!authToken) {
    console.error('Auth token not found in localStorage');
    return null;
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/users/', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('Response from fetchAllUsers:', response.data); 
    dispatch(setUsers(response.data));
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    return null;
  }
};
