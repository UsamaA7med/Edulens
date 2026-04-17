import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

import { CiSearch } from 'react-icons/ci'

import { AddQuestionDialog } from '@/components/teacher/AddQuestionDialog'
import { ConfirmDeleteQuestionDialog } from '@/components/teacher/ConfirmDeleteQuestionDialog'
import { EditQuestionDialog } from '@/components/teacher/EditQuestionDialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useQuestion, { type TQuestion } from '@/store/useQuestion'
import { useEffect, useState } from 'react'

const TeacherQuestionBank = () => {
  const { questions, isLoading } = useQuestion()
  const [filter, setFilter] = useState<{
    difficulty: string
    search: string
  }>({
    difficulty: 'all-difficulties',
    search: '',
  })
  const [filteredQuestions, setFilteredQuestions] = useState<TQuestion[]>(
    questions!
  )
  useEffect(() => {
    setFilteredQuestions(questions!)
  }, [questions])
  const handelSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      search: e.target.value,
    })
    setFilteredQuestions(
      questions?.filter((question) =>
        question.question.toLowerCase().includes(e.target.value.toLowerCase())
      )!
    )
  }
  const handelDifficultyChange = (value: string) => {
    setFilter({
      ...filter,
      difficulty: value,
    })
    if (value === 'all-difficulties') {
      setFilteredQuestions(questions!)
    } else {
      setFilteredQuestions(
        questions?.filter((question) => question.difficulty === value)!
      )
    }
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Question Bank</h1>
          <p className="text-muted-foreground">
            Manage your examination questions
          </p>
        </div>
        <AddQuestionDialog />
      </div>
      <div className="flex items-center gap-4">
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <CiSearch />
          </InputGroupAddon>
          <InputGroupInput
            id="input-group-url"
            placeholder="Search questions..."
            onChange={handelSearchChange}
          />
        </InputGroup>
        <Select onValueChange={handelDifficultyChange}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue
              placeholder="All Difficulties"
              defaultValue="all-difficulties"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Difficulties</SelectLabel>
              <SelectItem value="all-difficulties">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100 rounded-md  ">
            <TableRow>
              <TableHead className="w-4/6">Question</TableHead>
              <TableHead className="w-1/6">Difficulty</TableHead>
              <TableHead className="w-1/6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <p>Loading...</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredQuestions?.map((question) => (
                <TableRow key={question._id}>
                  <TableCell className="w-4/6">{question.question}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          question.difficulty === 'easy'
                            ? 'text-green-600 bg-green-50'
                            : question.difficulty === 'medium'
                              ? 'text-yellow-600 bg-yellow-50'
                              : 'text-red-600 bg-red-50'
                        }`}
                    >
                      {question.difficulty}
                    </span>
                  </TableCell>
                  <TableCell className="w-1/6 flex gap-2">
                    <EditQuestionDialog
                      questionId={question._id}
                      question={question}
                    />
                    <ConfirmDeleteQuestionDialog questionId={question._id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TeacherQuestionBank
