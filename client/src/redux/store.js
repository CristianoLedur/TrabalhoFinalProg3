import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../app/GlobalRedux/Features/user/userSlice'

export default configureStore({
  reducer:{
    user: userReducer,
  }
})