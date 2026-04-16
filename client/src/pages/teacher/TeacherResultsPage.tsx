import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TbDownload } from 'react-icons/tb'

type TAttempt = {
  _id: string
  timeTaken: string
  score: number
  student: {
    fullName: string
  }
  status: string
  exam: {
    examTitle: string
  }
}
const TeacherResultsPage = () => {
  const [attempts, setAttempts] = useState<TAttempt[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const downloadCSV = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/teacher/exam/export-csv`,
      { responseType: 'blob', withCredentials: true }
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'users.csv')
    document.body.appendChild(link)
    link.click()
  }
  const getAttempts = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/exam/attempts`,
        {
          withCredentials: true,
        }
      )
      if (res.status === 200) {
        setAttempts(res.data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getAttempts()
  }, [])
  console.log(attempts)
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Exam Results</h1>
          <p className="text-muted-foreground">
            View and export student performance
          </p>
        </div>
        <Button size="lg" onClick={downloadCSV}>
          <TbDownload size={20} />
          Export to Excel
        </Button>
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100 rounded-md  ">
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Exam</TableHead>
              <TableHead>score</TableHead>
              <TableHead>Time Taken</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {attempts?.map((att) => (
              <TableRow key={att._id}>
                <TableCell>{att.student.fullName}</TableCell>
                <TableCell>{att.exam.examTitle}</TableCell>
                <TableCell>{att.score}</TableCell>
                <TableCell>{att.timeTaken}</TableCell>
                <TableCell>{att.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TeacherResultsPage
