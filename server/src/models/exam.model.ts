import mongoose from 'mongoose'

const examSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
    ],
    forms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true,
      },
    ],
    examDuration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const ExamModel = mongoose.model('Exam', examSchema)

export default ExamModel
