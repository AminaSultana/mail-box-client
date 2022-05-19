import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const email = localStorage.getItem("email");
const isLoggedIn = !!initialToken;

const initialState = {
  token: initialToken,
  email: email,
  isLoggedIn: isLoggedIn,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
