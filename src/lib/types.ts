import React, { type ReactNode } from "react";

//auth-provider types
export type AuthProviderProps = {
  children: ReactNode;
}

export type AuthType = {
  username?: string;
  accessToken?: string;
  role?: string;
  accountId?: string;
}

export type UserType = {
  username?: string,
  role?: string
}

export type AuthContextType = {
  auth: AuthType,
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>, 
  user: UserType | null,
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>,
  authLoading: boolean
}

/* ---------- */