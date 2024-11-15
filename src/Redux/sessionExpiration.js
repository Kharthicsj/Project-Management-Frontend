// Redux/sessionExpiration.js
import { createSlice } from '@reduxjs/toolkit';

const sessionExpirationSlice = createSlice({
  name: 'sessionExpiration',
  initialState: {
    expiration: null, // Store the expiration timestamp
  },
  reducers: {
    setSessionExpiration: (state, action) => {
      state.expiration = action.payload.expiration;
    },
  },
});

export const { setSessionExpiration } = sessionExpirationSlice.actions;
export default sessionExpirationSlice.reducer; // Export the reducer
