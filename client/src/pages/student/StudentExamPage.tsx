import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'

import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CiClock2 } from 'react-icons/ci'
import { Separator } from '@/components/ui/separator'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useStudent from '@/store/useStudent'
import { useEffect, useState } from 'react'
const StudentExamPage = () => {
  const {
    currentExamForm,
    endTime,
    getCurrentExamSession,
    currentSession,
    nextQuestion,
    submitExam,
  } = useStudent()
  const [currentQuestion, setCurrentQuestion] = useState(
    currentExamForm?.questions[0]
  )
  const [currentAnswers, setCurrentAnswers] = useState<
    {
      questionId: string
      answer: string
    }[]
  >([])
  const [timeLeft, setTimeLeft] = useState(0)
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const { state } = useLocation()
  const { id } = useParams()
  const handleNextQuestion = async () => {
    if (currentIndex < currentExamForm?.questions.length! - 1) {
      setCurrentIndex((prev) => prev + 1)
      setCurrentQuestion(currentExamForm?.questions[currentIndex + 1])
      try {
        await nextQuestion(currentAnswers, id!)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handlePrevQuestion = async () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setCurrentQuestion(currentExamForm?.questions[currentIndex - 1])
    }
  }
  const handelOptionChange = (value: string) => {
    const answerdQuestion = currentAnswers.filter(
      (answer) => answer.questionId !== currentQuestion?.question._id!
    )
    setCurrentAnswers(() => [
      ...answerdQuestion,
      {
        questionId: currentQuestion?.question._id!,
        answer: value,
      },
    ])
  }
  const handleSubmitForm = async () => {
    try {
      await nextQuestion(currentAnswers, id!)
      const res = await submitExam(id!)
      if (res.status) {
        navigate(`/student/exam/result/${id}`)
      } else {
        navigate(`/student/dashboard`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const minutes = Math.floor(timeLeft / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)
  useEffect(() => {
    if (!endTime) return

    const interval = setInterval(() => {
      const now = Date.now()
      const diff = Math.max(0, endTime - now)

      setTimeLeft(diff)

      if (diff === 0) {
        clearInterval(interval)
        handleSubmitForm()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime])
  useEffect(() => {
    getCurrentExamSession(id!)
  }, [id])
  useEffect(() => {
    if (currentExamForm?.questions?.length! > 0) {
      setCurrentQuestion(currentExamForm?.questions[0])
    }
  }, [currentExamForm])
  useEffect(() => {
    if (currentSession) {
      setCurrentAnswers(currentSession.answers)
    }
  }, [currentSession])
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-5 w-1/2 min-w-sm">
        <div className="flex justify-between items-center">
          <h1>{state?.examTitle}</h1>
          <Card>
            <CardContent className="flex items-center gap-2">
              <CiClock2 size={20} />
              <p>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground">
                  Question {currentIndex + 1} of{' '}
                  {currentExamForm?.questions.length}
                </p>
                <Separator />
              </div>
              <div className="flex flex-col gap-5">
                <p>{currentQuestion?.question.question}</p>
                <div>
                  <img src={currentQuestion?.question.image.url} alt="" />
                </div>
                <RadioGroup
                  onValueChange={handelOptionChange}
                  value={
                    currentAnswers.find((ans) => {
                      if (ans.questionId === currentQuestion?.question._id)
                        return ans
                    })?.answer!
                  }
                >
                  {currentQuestion?.options.map((option) => (
                    <FieldLabel htmlFor={option._id} key={option._id}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>{option.text}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={option._id} id={option._id} />
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
                <Separator />
                <div className="flex justify-between">
                  <Button
                    size={'lg'}
                    variant={'outline'}
                    onClick={handlePrevQuestion}
                    disabled={currentIndex === 0}
                  >
                    <IoIosArrowBack /> Previous
                  </Button>
                  <Button
                    size={'lg'}
                    onClick={
                      currentIndex === currentExamForm?.questions.length! - 1
                        ? handleSubmitForm
                        : handleNextQuestion
                    }
                  >
                    {currentIndex === currentExamForm?.questions.length! - 1 ? (
                      <>
                        Submit
                        <IoIosArrowForward />
                      </>
                    ) : (
                      <>
                        Next
                        <IoIosArrowForward />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StudentExamPage
