import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      default: {
        url: null,
        public_id: null,
      },
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const QuestionModel = mongoose.model('Question', questionSchema)

export default QuestionModel
