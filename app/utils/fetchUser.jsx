
import axios from 'axios';
import { setUser,setUsers,updateFollowingCount,updateFollowerCount,setShops,setGroups  } from '../redux/slices/userSlice';
import toast from 'react-hot-toast';



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

    
    console.log('Full response from backend:', response);
    console.log('Response data:', response.data);
    console.log('Followers count:', response.data.followers_count);
    console.log('Following count:', response.data.following_count);




    
    dispatch(updateFollowerCount(response.data.followers_count));
    dispatch(updateFollowingCount(response.data.following_count));
    
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


// API call to get a user info based on id
export const fetchAUserInfo = async (userid) => {
  const authToken = localStorage.getItem('token-access');
  if (!authToken) {
    console.error('Auth token not found in localStorage');
    return null;
  }

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/user-info/id/${userid}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('Response from one user details:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};





// API call to get a user info based on id
export const fetchAShopInfo = async (shopid) => {
  const authToken = localStorage.getItem('token-access');
  if (!authToken) {
    console.error('Auth token not found in localStorage');
    return null;
  }

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/shop/${shopid}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('Response from one user details:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};







export const followUser = async (userToFollow, dispatch) => {
  const authToken = localStorage.getItem('token-access');
  if (!authToken) {
    console.error('Auth token not found in localStorage');
    return;
  }

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/follow/${userToFollow}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response.data);
    await fetchUserData(dispatch);  // Update user data
    await fetchAllUsers(dispatch);  // Update all users data
    toast.success('followed!')
  } catch (e) {
    console.error(e.response ? e.response.data : e.message);
    toast.error('somthig went wrong')

  }
}

export const unfollowUser = async (userToUnfollow, dispatch) => {
  const authToken = localStorage.getItem('token-access');
  if (!authToken) {
    console.error('Auth token not found in localStorage');
    return;
  }

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/unfollow/${userToUnfollow}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response.data); 
    await fetchUserData(dispatch);  
    await fetchAllUsers(dispatch); 
    toast.success('unfollowed!')
  } catch (e) {
    console.error(e.response ? e.response.data : e.message);
    toast.error('somthig went wrong')
  }
}




// Fetch all shops from API
export const fetchAllShops = async (dispatch) =>{
  const authToken = localStorage.getItem('token-access');
  
  if (!authToken) {
    console.error('Auth token not found');
    return null;
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/shops/', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('Response from fetchAllShops:', response.data); 
    dispatch(setShops(response.data));
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    return null;
  }
};





//Fetch all Groups
export const fetchGroups = async (dispatch) =>{
  const authToken = localStorage.getItem('token-access');
  
  if (!authToken) {
    console.error('Auth token not found');
    return null;
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/groups/', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('Response from fetchAllGroups:', response.data); 
    dispatch(setGroups(response.data));
    return response.data;
  } catch (error) {
    console.error('Error fetching all Groups:', error);
    return null;
  }
};






// Join a group
export const handleJoinGP = async (groupId, dispatch) => {
  const authToken = localStorage.getItem('token-access');

  if (!authToken) {
    console.error('Auth token not found');
    return null;
  }

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/groups/${groupId}/join/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response.data);
    
    await fetchGroups(dispatch);  
    toast.success('Joined the group!');
  } catch (error) {
    console.error('Error joining group:', error);
    toast.error('Failed to join the group.');
  }
};

// Leave a group
export const handleLeaveGP = async (groupId, dispatch) => {
  const authToken = localStorage.getItem('token-access');

  if (!authToken) {
    console.error('Auth token not found');
    return null;
  }

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/groups/${groupId}/leave/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response.data);
    
    await fetchGroups(dispatch);  
    toast.success('Left the group!');
  } catch (error) {
    console.error('Error leaving group:', error);
    toast.error('Failed to leave the group.');
  }
};



