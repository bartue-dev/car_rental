import React, { type ReactNode, type RefObject } from "react";
import type {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors
} from "react-hook-form"

/* auth-provider types */
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


/* Register types */
type RegisterData = {username: string, password: string}

export type RegisterPropsType = {
  onSubmit: (data : RegisterData) => Promise<void>,
  handleSubmit: UseFormHandleSubmit<RegisterData>,
  register: UseFormRegister<RegisterData>,
  errors: FieldErrors<RegisterData>
  isSubmitting: boolean,
  serverError: {error?: string}
}
/* --------- */

/* Login types */
type LoginData = {username: string, password: string}

export type LoginPropsType = {
  onSubmit: (data: LoginData) => Promise<void>,
  handleSubmit: UseFormHandleSubmit<LoginData>,
  register: UseFormRegister<LoginData>,
  errors: FieldErrors<LoginData>,
  isSubmitting: boolean,
  serverError: {error?: string}
  formRef: RefObject<HTMLFormElement | null>
}
/* -------- */

