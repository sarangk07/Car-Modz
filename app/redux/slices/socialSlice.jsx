// redux/features/socialSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchLikes = createAsyncThunk(
  'social/fetchLikes',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token-access');
      const response = await axios.get('http://127.0.0.1:8000/api/likes/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleLike = createAsyncThunk(
  'social/toggleLike',
  async ({ postId, isLiked }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token-access');
      if (isLiked) {
        await axios.post(`http://127.0.0.1:8000/api/posts/${postId}/dislike/`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return { postId, action: 'dislike' };
      } else {
        await axios.post('http://127.0.0.1:8000/api/likes/', 
          { post: postId },
          { headers: { Authorization: `Bearer ${token}` }}
        );
        return { postId, action: 'like' };
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchComments = createAsyncThunk(
  'social/fetchComments',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token-access');
      const response = await axios.get('http://127.0.0.1:8000/api/comments/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  'social/addComment',
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token-access');
      const response = await axios.post('http://127.0.0.1:8000/api/comments/',
        { post: postId, content },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'social/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token-access');
      await axios.delete(`http://127.0.0.1:8000/api/comments/${commentId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return commentId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const socialSlice = createSlice({
  name: 'social',
  initialState: {
    likes: [],
    comments: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Likes handlers
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.likes = action.payload;
        state.loading = false;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        if (action.payload.action === 'like') {
          state.likes.push({ post: action.payload.postId });
        } else {
          state.likes = state.likes.filter(like => like.post !== action.payload.postId);
        }
      })
      // Comments handlers
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      })
      // Error handlers
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      );
  }
});

export default socialSlice.reducer;
