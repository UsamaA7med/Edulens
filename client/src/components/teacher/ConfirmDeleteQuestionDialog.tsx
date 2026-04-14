import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useQuestion from '@/store/useQuestion'
import toast from 'react-hot-toast'
import { RiDeleteBin5Line } from 'react-icons/ri'

export function ConfirmDeleteQuestionDialog({
  questionId,
}: {
  questionId: string
}) {
  const { deleteQuestion } = useQuestion()
  const handelDeleteQuestion = async () => {
    try {
      const res = await deleteQuestion(questionId)
      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error('error while deleting question')
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <RiDeleteBin5Line />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              question.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handelDeleteQuestion}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
