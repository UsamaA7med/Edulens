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
import { TbDownload } from 'react-icons/tb'
const items = [
  {
    title: 'Average Score',
    value: '68.0%',
  },
  {
    title: 'Pass Rate',
    value: '80%',
  },
  {
    title: 'Avg. Time',
    value: '21m 37s',
  },
]
const TeacherResultsPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Exam Results</h1>
          <p className="text-muted-foreground">
            View and export student performance
          </p>
        </div>
        <Button size="lg">
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
            {[1, 2, 3, 4].map((question) => (
              <TableRow key={question}>
                <TableCell>Osama Ahmed</TableCell>
                <TableCell>Mathematics</TableCell>
                <TableCell>100</TableCell>
                <TableCell>1:00:00</TableCell>
                <TableCell>Pass</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <Card key={item.title} className="border border-gray-200">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.value}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TeacherResultsPage
