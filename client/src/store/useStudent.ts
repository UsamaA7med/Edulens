import axios, { isAxiosError } from 'axios'
import { create } from 'zustand'

type TExam = {
  _id: string
  questions: {
    question: {
      _id: string
      question: string
      image: {
        url: string
        public_id: string
      }
    }
    options: {
      _id: string
      text: string
      isCorrect: boolean
    }[]
  }[]
}

interface IStudentStore {
  exams:
    | {
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
        teacher: {
          _id: string
          fullName: string
        }
      }[]
    | null
  isLoading: boolean
  currentExamForm: TExam | null
  getAllExams: () => Promise<void>
  currentSession: {
    answers: {
      questionId: string
      answer: string
    }[]
    startTime: number
    endTime: number
    form: TExam
  } | null
  startTime: number | null
  endTime: number | null
  startExam: (examId: string) => Promise<{ status: boolean }>
  getCurrentExamSession: (examId: string) => Promise<void>
  attempt: {
    attempt: {
      _id: string
      score: number
      timeTaken: string
      status: string
      teacher: {
        _id: string
        fullName: string
      }
      exam: {
        _id: string
        examTitle: string
      }
    }
    numberOfQuestions: number
  } | null
  nextQuestion: (
    data: {
      questionId: string
      answer: string
    }[],
    examId: string
  ) => Promise<void>
  submitExam: (examId: string) => Promise<{
    status: boolean
  }>
  getAttempt: (attemptId: string) => Promise<{
    status: boolean
  }>
}

const useStudent = create<IStudentStore>((set) => ({
  exams: null,
  attempt: null,
  startTime: null,
  currentExamForm: null,
  currentSession: null,
  endTime: null,
  isLoading: false,
  getAllExams: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/student/exams`,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ exams: res.data.data })
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data.message)
      } else {
        console.log('Something went wrong')
      }
    }
  },
  startExam: async (examId) => {
    try {
      set({ isLoading: true })
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/student/exam/start`,
        {
          examId,
        },
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({
          currentExamForm: res.data.data,
          startTime: res.data.startTime,
          endTime: res.data.endTime,
        })
        return { status: true }
      } else {
        return { status: false }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data.message)
        return { status: false }
      } else {
        console.log('Something went wrong')
        return { status: false }
      }
    } finally {
      set({ isLoading: false })
    }
  },
  getCurrentExamSession: async (examId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/student/exams/${examId}`,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({
          currentSession: res.data.data,
          currentExamForm: res.data.data.form,
          startTime: res.data.data.startTime,
          endTime: res.data.data.endTime,
        })
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data.message)
      } else {
        console.log('Something went wrong')
      }
    }
  },
  nextQuestion: async (data, examId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/student/exam/next/${examId}`,
        data,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ currentSession: res.data.data })
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data.message)
      } else {
        console.log('Something went wrong')
      }
    }
  },
  submitExam: async (examId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/student/exam/submit/${examId}`,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        return { status: true }
      } else {
        return { status: false }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data.message)
      } else {
        console.log('Something went wrong')
      }
      return { status: false }
    }
  },
  getAttempt: async (attemptId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/student/attempt/${attemptId}`,
        {
          withCredentials: true,
        }
      )
      if (res.data.status === 'success') {
        set({ attempt: res.data.data })
        return { status: true }
      } else {
        return { status: false }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data.message)
      } else {
        console.log('Something went wrong')
      }
      return { status: false }
    }
  },
}))

export default useStudent
