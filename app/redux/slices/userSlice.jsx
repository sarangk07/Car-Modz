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
  users: [], 
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
    },
  },
});

export const { setUser, setUsers, clearUser } = userSlice.actions;
export default userSlice.reducer;
