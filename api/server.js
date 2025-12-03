const express = require('express')
const cors    = require('cors')
const multer  = require('multer')
const upload  = multer({ dest: 'tmp/' })
const cloudinary = require('cloudinary').v2

// Cloudinary config from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_, res) => res.sendStatus(200))

app.post('/upload', upload.single('video'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' })

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    resource_type: 'video',
    folder: 'ytload',
    quality: 'auto',
    fetch_format: 'mp4'
  })

  // Return public URL + duration
  return res.json({
    data: {
      url: result.secure_url,
      duration: result.duration,
      publicId: result.public_id
    }
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on ${PORT}`))
