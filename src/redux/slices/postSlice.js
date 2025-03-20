import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedPosts: [], // Kaydedilen postlar [{ postId, postData }]
};

const savedPostsSlice = createSlice({
  name: 'savedPosts',
  initialState,
  reducers: {
    setSavedPosts: (state, action) => {
      state.savedPosts = action.payload.savedPosts;
    },
    addSavedPost: (state, action) => {
      state.savedPosts.push(action.payload.post);
    },
    removeSavedPost: (state, action) => {
      state.savedPosts = state.savedPosts.filter(post => post.postId !== action.payload.postId);
    },
  },
});

export const { setSavedPosts, addSavedPost, removeSavedPost } = savedPostsSlice.actions;
export default savedPostsSlice.reducer;
