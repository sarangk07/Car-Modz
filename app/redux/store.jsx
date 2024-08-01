
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import shopReducer from './slices/shopSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
  },
});

export default store;
