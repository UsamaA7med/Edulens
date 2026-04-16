import mongoose from 'mongoose'

const attemptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
          required: true,
        },
        answer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Option',
          required: true,
        },
      },
    ],
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    timeTaken: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['passed', 'failed'],
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const AttemptModel = mongoose.model('Attempt', attemptSchema)

export default AttemptModel
