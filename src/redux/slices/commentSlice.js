import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commentCount: 0,
  comments: [], // Yorumlar [{ userId, comment }]
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.commentCount = action.payload.commentCount;
      state.comments = action.payload.comments;
    },
    addComment: (state, action) => {
      state.commentCount += 1;
      state.comments.push(action.payload.comment);
    },
    removeComment: (state, action) => {
      state.commentCount -= 1;
      state.comments = state.comments.filter(comment => comment.id !== action.payload.commentId);
    },
  },
});

export const { setComments, addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
