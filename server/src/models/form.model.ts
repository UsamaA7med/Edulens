import mongoose from 'mongoose'

const formSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
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
    ],
  },
  {
    timestamps: true,
  }
)

const FormModel = mongoose.model('Form', formSchema)

export default FormModel
