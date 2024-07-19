
import axios from 'axios';
import { setUser,setUsers,updateFollowingCount,updateFollowerCount } from '../redux/slices/userSlice';

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





// // Follow function
// export const followUser = async (userToFollow) => {
//   const authToken = localStorage.getItem('token-access');
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
//     console.log(response.data); // Handle the response as needed
//   } catch (e) {
//     console.error(e.response ? e.response.data : e.message);
//   }
// }

// // Unfollow function (for completeness)
// export const unfollowUser = async (userToUnfollow) => {
//   const authToken = localStorage.getItem('token-access');
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
//     console.log(response.data); // Handle the response as needed
//   } catch (e) {
//     console.error(e.response ? e.response.data : e.message);
//   }
// }





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
    console.log(response.data); // Handle the response as needed
    await fetchUserData(dispatch);  // Update user data
    await fetchAllUsers(dispatch);  // Update all users data
  } catch (e) {
    console.error(e.response ? e.response.data : e.message);
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
    console.log(response.data); // Handle the response as needed
    await fetchUserData(dispatch);  // Update user data
    await fetchAllUsers(dispatch);  // Update all users data
  } catch (e) {
    console.error(e.response ? e.response.data : e.message);
  }
}


