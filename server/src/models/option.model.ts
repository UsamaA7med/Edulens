import mongoose from 'mongoose'

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const OptionModel = mongoose.model('Option', optionSchema)

export default OptionModel
