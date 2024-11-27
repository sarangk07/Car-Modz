
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import shopReducer from './slices/shopSlice';
import postsReducer from './slices/postsSlice';
import socialReducer from './slices/socialSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    posts: postsReducer,
    social: socialReducer,
  },
});

export default store;
