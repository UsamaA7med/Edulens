import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

interface UploadedFile {
  buffer: Buffer
  mimetype: string
}

const cloudinaryUploadImage = async (file: UploadedFile) => {
  try {
    const base64 = file.buffer.toString('base64')
    const dataURI = `data:${file.mimetype};base64,${base64}`

    const isImage = file.mimetype.startsWith('image/')
    if (!isImage) {
      throw new Error('File is not an image')
    }
    const uploaded = await cloudinary.uploader.upload(dataURI)

    return {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    }
  } catch (error) {
    throw error
  }
}

const cloudinaryDeleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    throw error
  }
}

export { cloudinaryUploadImage, cloudinaryDeleteImage }
