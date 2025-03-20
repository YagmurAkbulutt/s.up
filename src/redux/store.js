import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import likesReducer from './slices/likesSlice';
import commentsReducer from './slices/commentSlice';
import commentersReducer from './slices/commenterSlice';
import savedPostsReducer from './slices/postSlice';
import shareReducer from "./slices/shareSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    likes: likesReducer,
    comments: commentsReducer,
    commenters: commentersReducer,
    savedPosts: savedPostsReducer,
    share: shareReducer,
  },
});

export default store;
