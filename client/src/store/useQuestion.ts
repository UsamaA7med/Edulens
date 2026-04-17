import type {
  TCreateQuestion,
  TUpdateQuestion,
} from '@/validations/teacher.validations'
import axios, { isAxiosError } from 'axios'
import { create } from 'zustand'

export type TQuestion = {
  _id: string
  question: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: {
    _id: string
    text: string
    isCorrect: boolean
  }[]
  image: string
}

interface IQuestionStore {
  questions: TQuestion[] | null
  isLoading: boolean
  isLoadingQuestions: boolean
  addQuestion: (
    question: TCreateQuestion
  ) => Promise<{ success: boolean; message: string }>
  deleteQuestion: (id: string) => Promise<{ success: boolean; message: string }>
  teacherQuestions: () => Promise<void>
  updateQuestion: (
    id: string,
    question: TUpdateQuestion
  ) => Promise<{ success: boolean; message: string }>
}

const useQuestion = create<IQuestionStore>((set) => ({
  questions: null,
  isLoading: false,
  isLoadingQuestions: false,
  addQuestion: async (question) => {
    set({ isLoading: true })
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/question`,
        question,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ questions: res.data.data })
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
  deleteQuestion: async (id) => {
    set({ isLoading: true })
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/question/${id}`,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ questions: res.data.data })
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
  teacherQuestions: async () => {
    set({ isLoadingQuestions: true })
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/question`,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ questions: res.data.data })
      }
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoadingQuestions: false })
    }
  },
  updateQuestion: async (id, question) => {
    set({ isLoading: true })
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/question/${id}`,
        question,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ questions: res.data.data })
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
}))

export default useQuestion
