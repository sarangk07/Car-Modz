// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  accessToken: '',
  refreshToken: '',
  userInfo: {
    email: '',
    fullname: '',
    id:'',
    is_shopOwner:false,
    username: '',
  },
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userInfo = action.payload.userInfo;
    },
    clearUser: (state) => {
      state.username = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
