import type { TCreateUser, TLoginUser } from '@/validations/user.validations'
import { create } from 'zustand'
import axios, { isAxiosError } from 'axios'

interface IUserStore {
  user: (TCreateUser & { _id: string }) | null
  isLoading: boolean
  isCheckingAuth: boolean
  isAuthenticated: boolean
  register: (
    data: TCreateUser
  ) => Promise<{ success: boolean; message: string }>
  login: (data: TLoginUser) => Promise<{ success: boolean; message: string }>
  checkAuth: () => Promise<void>
  logout: () => Promise<{ success: boolean; message: string }>
}

const useUser = create<IUserStore>((set) => ({
  user: null,
  isLoading: false,
  isCheckingAuth: true,
  isAuthenticated: true,
  register: async (data) => {
    set({ isLoading: true, isAuthenticated: false })
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        data,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ user: res.data.data, isAuthenticated: true })
        return { success: true, message: res.data.message }
      } else {
        return { success: false, message: res.data.message }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return { success: false, message: error.response?.data.message }
      } else {
        return { success: false, message: 'Something went wrong' }
      }
    } finally {
      set({ isLoading: false })
    }
  },
  login: async (data) => {
    set({ isLoading: true, isAuthenticated: false })
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        data,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ user: res.data.data, isAuthenticated: true })
        return { success: true, message: res.data.message }
      } else {
        return { success: false, message: res.data.message }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return { success: false, message: error.response?.data.message }
      } else {
        return { success: false, message: 'Something went wrong' }
      }
    } finally {
      set({ isLoading: false })
    }
  },
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true, isAuthenticated: false })
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/checkAuth`,
        {},
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ user: res.data.data, isAuthenticated: true })
      }
    } catch (error) {
      console.log(error)
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  logout: async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ user: null, isAuthenticated: false })
        return { success: true, message: res.data.message }
      } else {
        return { success: false, message: res.data.message }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return { success: false, message: error.response?.data.message }
      } else {
        return { success: false, message: 'Something went wrong' }
      }
    }
  },
}))

export default useUser
