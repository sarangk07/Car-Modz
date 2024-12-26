
// import axios from 'axios';
// import { setUser,setUsers,updateFollowingCount,updateFollowerCount,setShops,setGroups  } from '../redux/slices/userSlice';
// import toast from 'react-hot-toast';



// export const fetchUserData = async (dispatch) => {
//   const username = localStorage.getItem('username');
//   const authToken = localStorage.getItem('token-access');
//   // console.log(username,authToken);

//   if (!username || !authToken) {
//     console.error('Username or auth token not found in localStorage');
//     return null;
//   }

//   try {
//     const response = await axios.get(`http://127.0.0.1:8000/api/user-info/${username}/`, {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });

    
//     console.log('Full response from backend:', response);
//     console.log('Response data:', response.data);
//     console.log('Followers count:', response.data.followers_count);
//     console.log('Following count:', response.data.following_count);




    
//     dispatch(updateFollowerCount(response.data.followers_count));
//     dispatch(updateFollowingCount(response.data.following_count));
    
//     dispatch(setUser({
//       ...response.data,
//       accessToken: authToken,
//     }));
    
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return null;
//   }
// };




// // Fetch all users from API
// export const fetchAllUsers = async (dispatch) =>{
//   const authToken = localStorage.getItem('token-access');
//   const username = localStorage.getItem('username');

  
//   if (!authToken || !username) {
//     console.error('unAutharised');
//     return null;
//   }

//   try {
//     const response = await axios.get('http://127.0.0.1:8000/api/users/', {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });
//     console.log('Response from fetchAllUsers:', response.data); 
//     dispatch(setUsers(response.data));
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching all users:', error);
//     return null;
//   }
// };


// // API call to get a user info based on id
// export const fetchAUserInfo = async (userid) => {
//   const authToken = localStorage.getItem('token-access');
//   const username = localStorage.getItem('username');
//   if (!authToken) {
//     console.error('Auth token not found in localStorage');
//     return null;
//   }

//   try {
//     const response = await axios.get(`http://127.0.0.1:8000/api/user-info/id/${userid}/`, {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });
//     console.log('Response from one user details:', response.data);
//     return response.data; 
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     return null;
//   }
// };





// // API call to get a user info based on id
// export const fetchAShopInfo = async (shopid) => {
//   const authToken = localStorage.getItem('token-access');
//   const username = localStorage.getItem('username');
//   if (!authToken) {
//     console.error('Auth token not found in localStorage');
//     return null;
//   }

//   try {
//     const response = await axios.get(`http://127.0.0.1:8000/api/shop/${shopid}/`, {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });
//     console.log('Response from one user details:', response.data);
//     return response.data; 
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     return null;
//   }
// };







// export const followUser = async (userToFollow, dispatch) => {
//   const authToken = localStorage.getItem('token-access');
//   const username = localStorage.getItem('username');
//   if (!authToken) {
//     console.error('Auth token not found in localStorage');
//     return;
//   }

//   try {
//     const response = await axios.post(
//       `http://127.0.0.1:8000/api/follow/${userToFollow}/`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );
//     console.log(response.data);
//     await fetchUserData(dispatch);  // Update user data
//     await fetchAllUsers(dispatch);  // Update all users data
//     toast.success('followed!')
//   } catch (e) {
//     console.error(e.response ? e.response.data : e.message);
//     toast.error('somthig went wrong')

//   }
// }

// export const unfollowUser = async (userToUnfollow, dispatch) => {
//   const authToken = localStorage.getItem('token-access');
//   const username = localStorage.getItem('username');
//   if (!authToken) {
//     console.error('Auth token not found in localStorage');
//     return;
//   }

//   try {
//     const response = await axios.post(
//       `http://127.0.0.1:8000/api/unfollow/${userToUnfollow}/`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );
//     console.log(response.data); 
//     await fetchUserData(dispatch);  
//     await fetchAllUsers(dispatch); 
//     toast.success('unfollowed!')
//   } catch (e) {
//     console.error(e.response ? e.response.data : e.message);
//     toast.error('somthig went wrong')
//   }
// }




// // Fetch all shops from API
// export const fetchAllShops = async (dispatch) =>{
//   const authToken = localStorage.getItem('token-access');
//   const username = localStorage.getItem('username');
//   if (!authToken) {
//     console.error('Auth token not found');
//     return null;
//   }

//   try {
//     const response = await axios.get('http://127.0.0.1:8000/api/shops/', {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });
//     console.log('Response from fetchAllShops:', response.data); 
//     dispatch(setShops(response.data));
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching all users:', error);
//     return null;
//   }
// };





// //Fetch all Groups
// export const fetchGroups = async (dispatch) =>{
//   const authToken = localStorage.getItem('token-access');
//   const username = localStorage.getItem('username');
//   if (!authToken) {
//     console.error('Auth token not found');
//     return null;
//   }

//   try {
//     const response = await axios.get('http://127.0.0.1:8000/api/groups/', {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });
//     console.log('Response from fetchAllGroups:', response.data); 
//     dispatch(setGroups(response.data));
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching all Groups:', error);
//     return null;
//   }
// };






// // Join a group
// export const handleJoinGP = async (groupId, dispatch) => {
//   const authToken = localStorage.getItem('token-access');

//   if (!authToken) {
//     console.error('Auth token not found');
//     return null;
//   }

//   try {
//     const response = await axios.post(
//       `http://127.0.0.1:8000/api/groups/${groupId}/join/`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );
//     console.log(response.data);
    
//     await fetchGroups(dispatch);  
//     toast.success('Joined the group!');
//   } catch (error) {
//     console.error('Error joining group:', error);
//     toast.error('Failed to join the group.');
//   }
// };

// // Leave a group
// export const handleLeaveGP = async (groupId, dispatch) => {
//   const authToken = localStorage.getItem('token-access');

//   if (!authToken) {
//     console.error('Auth token not found');
//     return null;
//   }

//   try {
//     const response = await axios.post(
//       `http://127.0.0.1:8000/api/groups/${groupId}/leave/`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );
//     console.log(response.data);
    
//     await fetchGroups(dispatch);  
//     toast.success('Left the group!');
//   } catch (error) {
//     console.error('Error leaving group:', error);
//     toast.error('Failed to leave the group.');
//   }
// };




//testing the auth token expire issue ------------------------------

import axios from 'axios';
import { setUser, setUsers, updateFollowingCount, updateFollowerCount, setShops, setGroups } from '../redux/slices/userSlice';
import toast from 'react-hot-toast';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});


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
        localStorage.removeItem('token-access');
        localStorage.removeItem('token-refresh');
        localStorage.removeItem('username',)
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Setup request interceptor to always include the latest token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token-access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchUserData = async (dispatch) => {
  const username = localStorage.getItem('username');
  if (!username) {
    console.error('Username not found in localStorage');
    return null;
  }

  try {
    const response = await api.get(`/user-info/${username}/`);
    dispatch(updateFollowerCount(response.data.followers_count));
    dispatch(updateFollowingCount(response.data.following_count));
    dispatch(setUser({
      ...response.data,
      accessToken: localStorage.getItem('token-access'),
    }));
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching user data');
    return null;
  }
};

export const fetchAllUsers = async (dispatch) => {
  try {
    const response = await api.get('/users/');
    dispatch(setUsers(response.data));
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching all users');
    return null;
  }
};

export const fetchAUserInfo = async (userid) => {
  try {
    const response = await api.get(`/user-info/id/${userid}/`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching user details');
    return null;
  }
};

export const fetchAShopInfo = async (shopid) => {
  try {
    const response = await api.get(`/shop/${shopid}/`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching shop details');
    return null;
  }
};

export const followUser = async (userToFollow, dispatch) => {
  try {
    await api.post(`/follow/${userToFollow}/`);
    await Promise.all([
      fetchUserData(dispatch),
      fetchAllUsers(dispatch)
    ]);
    toast.success('Followed successfully!');
  } catch (error) {
    handleApiError(error, 'Error following user');
  }
};

export const unfollowUser = async (userToUnfollow, dispatch) => {
  try {
    await api.post(`/unfollow/${userToUnfollow}/`);
    await Promise.all([
      fetchUserData(dispatch),
      fetchAllUsers(dispatch)
    ]);
    toast.success('Unfollowed successfully!');
  } catch (error) {
    handleApiError(error, 'Error unfollowing user');
  }
};

export const fetchAllShops = async (dispatch) => {
  try {
    const response = await api.get('/shops/');
    dispatch(setShops(response.data));
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching shops');
    return null;
  }
};

export const fetchGroups = async (dispatch) => {
  try {
    const response = await api.get('/groups/');
    dispatch(setGroups(response.data));
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching groups');
    return null;
  }
};

export const handleJoinGP = async (groupId, dispatch) => {
  try {
    await api.post(`/groups/${groupId}/join/`);
    await fetchGroups(dispatch);
    toast.success('Joined the group!');
  } catch (error) {
    handleApiError(error, 'Error joining group');
  }
};

export const handleLeaveGP = async (groupId, dispatch) => {
  try {
    await api.post(`/groups/${groupId}/leave/`);
    await fetchGroups(dispatch);
    toast.success('Left the group!');
  } catch (error) {
    handleApiError(error, 'Error leaving group');
  }
};

// Centralized error handling--------------
const handleApiError = (error, customMessage) => {
  console.error(customMessage, error);
  if (error.response?.status === 401) {
    toast.error('Session expired. Please login again.');
  } else {
    toast.error(error.response?.data?.message || customMessage);
  }
};