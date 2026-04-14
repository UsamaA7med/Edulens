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

const cloudinaryUploadImage = async (url: string) => {
  try {
    const uploaded = await cloudinary.uploader.upload(url)
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
