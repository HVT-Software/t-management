import axios, { type AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { loginPath } from "../constants/routes";

export const clientInstance = axios.create({
  baseURL: `/api`,
  withCredentials: true
});

clientInstance.interceptors.response.use(undefined, async (error: AxiosError) => {
  if (error?.response?.status === 401) {
    await signOut({ redirect: false, callbackUrl: loginPath });
    window.location.replace(loginPath);
  }

  return Promise.reject(error?.response);
});
