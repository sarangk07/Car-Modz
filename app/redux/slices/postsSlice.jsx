// postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token-access');
      const response = await axios.get('http://127.0.0.1:8000/api/posts/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token-access');
      await axios.delete(`http://127.0.0.1:8000/api/posts/${postId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return postId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ postId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token-access');
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/posts/${postId}/`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    shuffledPosts: []
  },
  reducers: {
    shufflePosts: (state) => {
      state.shuffledPosts = [...state.items].sort(() => 0.5 - Math.random());
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.shuffledPosts = [...action.payload].sort(() => 0.5 - Math.random());
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.id !== action.payload);
        state.shuffledPosts = state.shuffledPosts.filter(post => post.id !== action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
          const shuffledIndex = state.shuffledPosts.findIndex(post => post.id === action.payload.id);
          if (shuffledIndex !== -1) {
            state.shuffledPosts[shuffledIndex] = action.payload;
          }
        }
      });
  },
});

export const { shufflePosts } = postsSlice.actions;
export default postsSlice.reducer;