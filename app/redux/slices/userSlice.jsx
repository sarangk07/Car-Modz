// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  username: '',
  email: '',
  fullname: '',
  car: '',
  profile_pic: '',
  is_shopOwner: false,
  accessToken: '',
  refreshToken: '',
  followers_count: 0,
  following_count: 0,
  users: [], 
  shops: [],
  groups: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.car = action.payload.car;
      state.profile_pic = action.payload.profile_pic;
      state.is_shopOwner = action.payload.is_shopOwner;
      state.accessToken = action.payload.accessToken || state.accessToken;
      state.refreshToken = action.payload.refreshToken || state.refreshToken;
      state.followers_count = action.payload.followers_count || 0;
      state.following_count = action.payload.following_count || 0;

      state.followers = action.payload.followers;
      state.following = action.payload.following;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    
    clearUser: (state) => {
      state.id = '';
      state.username = '';
      state.email = '';
      state.fullname = '';
      state.car = '';
      state.profile_pic = '';
      state.is_shopOwner = false;
      state.accessToken = '';
      state.refreshToken = '';
      state.followers_count = 0;
      state.following_count = 0;
      
      state.followers = 0;
      state.following = 0;
    },

    updateFollowerCount: (state, action) => {
      state.followers_count = action.payload;
    },
    updateFollowingCount: (state, action) => {
      state.following_count = action.payload;
    },
    setShops: (state, action) => {
      state.shops = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const { setUser, setUsers,setGroups, clearUser,updateFollowerCount ,updateFollowingCount,setShops } = userSlice.actions;
export default userSlice.reducer;
