const express = require('express')
const cors    = require('cors')
const multer  = require('multer')
const upload  = multer({ dest: 'tmp/' })

const app = express()
app.use(cors()) // ← allows all origins
app.use(express.json())

app.get('/health', (_, res) => res.json({ status: 'ok' }))

app.post('/upload', upload.single('video'), async (req, res) => {
  // placeholder until Cloudinary + OpenAI
  res.json({
    title: 'AI Title Placeholder',
    description: 'AI Description Placeholder',
    tags: ['tag1', 'tag2', 'tag3']
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on ${PORT}`))
