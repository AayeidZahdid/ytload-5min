const express = require('express')
const cors    = require('cors')
const multer  = require('multer')
const upload  = multer({ dest: 'tmp/' })
const app     = express()

app.use(cors()) // allow all origins
app.use(express.json())

// health check
app.get('/health', (_, res) => res.json({ status: 'ok' }))

// upload endpoint
app.post('/upload', upload.single('video'), async (req, res) => {
  // TODO: Cloudinary + OpenAI here
  return res.json({
    title: 'AI Title Placeholder',
    description: 'AI Description Placeholder',
    tags: ['tag1', 'tag2', 'tag3']
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on ${PORT}`))
