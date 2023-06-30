'use client';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Features/user/userSlice';

export default configureStore({
  reducer:{
    user: userReducer,
  }
})