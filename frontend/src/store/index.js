import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import skillsReducer from './skillsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
  },
});

export default store; 