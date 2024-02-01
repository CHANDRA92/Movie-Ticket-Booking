// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    userEmail: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
