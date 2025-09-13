import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";


type InitialStateType = {
  username: string | null,
  accessToken: string | null,
  role: string | null,
  accountId: string | null,
}

const initialState : InitialStateType = {
  username: null,
  accessToken: null,
  role: null,
  accountId: null
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      const { 
        username,
        accessToken,
        role,
        accountId
      } = action.payload;

      state.username = username;
      state.accessToken = accessToken;
      state.role = role;
      state.accountId = accountId; 
    },
  }
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer

export const authAccessToken = (state: RootState) => state.auth.accessToken