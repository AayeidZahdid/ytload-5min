const express = require('express')
const cors    = require('cors')
const multer  = require('multer')
const upload  = multer({ dest: 'tmp/' })
const app     = express()

app.use(cors({
  origin: 'https://ytload-5min-u8no.vercel.app',   // allow only your frontend
  methods: ['GET', 'POST', 'OPTIONS'],             // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // allowed headers
}))
app.use(express.json())

app.get('/health', (_, res) => res.sendStatus(200))
app.post('/upload', upload.single('video'), async (req, res) => {
  // TODO: Cloudinary + OpenAI here
  res.json({
    title: 'AI Title Placeholder',
    description: 'AI Description Placeholder',
    tags: ['tag1', 'tag2', 'tag3']
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on ${PORT}`))
