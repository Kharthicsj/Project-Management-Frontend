import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/authSlics';
import sessionReducer from '../Redux/sessionExpiration';
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sessionExpiration: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Add thunk middleware
});

export default store;
