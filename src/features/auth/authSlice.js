import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: null, 
    token: null, 
    isAuthenticated: false 
  },
  reducers: {
    // লগইন সফল হলে ইউজার ও টোকেন সেভ করার জন্য
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.isAuthenticated = true;
    },
    // লগআউট করার সময় স্টেট ক্লিয়ার করার জন্য
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// সিলেক্টর: সরাসরি স্টোর থেকে ডাটা পাওয়ার জন্য
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
