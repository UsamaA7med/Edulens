import axios, { isAxiosError } from 'axios'
import { create } from 'zustand'

type TExamType = {
  _id: string
  examTitle: string
  examDuration: number
  forms: {
    questions: {
      question: {
        _id: string
        question: string
      }
      options: {
        _id: string
        text: string
        isCorrect: boolean
      }[]
    }[]
    _id: string
  }[]
}

interface IExamStore {
  exams: TExamType[] | null
  isLoading: boolean
  createExam: (data: {
    examDuration: number
    questions: string[]
    examTitle: string
  }) => Promise<{ success: boolean; message: string }>
  getTeacherExams: () => Promise<void>
}

const useExam = create<IExamStore>((set) => ({
  exams: null,
  isLoading: false,
  createExam: async (data) => {
    set({ isLoading: true })
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/exam`,
        data,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ exams: res.data.data })
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
  getTeacherExams: async () => {
    set({ isLoading: true })
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/exam`,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ exams: res.data.data })
      }
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default useExam
