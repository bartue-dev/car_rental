import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

type InitialStateType = {
  username: string | null,
  role: string | null,
}

const initialState : InitialStateType = {
  username: null,
  role: null,
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { 
        username,
        role,
      } = action.payload;

      state.username = username;
      state.role = role; 
    },
    clearUser: (state) => {
      state.username = null;
      state.role = null
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer

export const username = (state: RootState) => state.user.username
export const userRole = (state: RootState) => state.user.role