import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://projectmanagement-backend-k54l.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await response.json();
      return { token: data.token, user: data.user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: '', user: null, error: null },
  reducers: {
    logout: (state) => {
      state.token = '';
      state.user = null;
    },
    validateSession: (state) => {
      const token = localStorage.getItem('authToken');
      const expirationDate = localStorage.getItem('tokenExpiration');
      if (!token || !expirationDate || new Date().getTime() > expirationDate) {
        state.token = '';
        state.user = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpiration');
      }
    },
    expireSession: (state) => {
      state.token = '';
      state.user = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiration');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;

        // Save token and user to localStorage
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));  // Save user info
      })
      .addCase(login.rejected, (state, action) => {
        state.error = { message: action.payload };
      });
  },
});

export const { logout, validateSession, expireSession } = authSlice.actions;
export default authSlice.reducer;
