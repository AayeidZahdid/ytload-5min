const express = require('express')
const cors    = require('cors')
const multer  = require('multer')
const upload  = multer({ dest: 'tmp/' })
const app     = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_, res) => res.sendStatus(200))
app.post('/upload', upload.single('video'), async (req, res) => {
  // TODO: real Cloudinary + OpenAI here
  return res.json({
    data: {
      title: 'AI Title Placeholder',
      description: 'AI Description Placeholder',
      tags: ['tag1', 'tag2', 'tag3']
    }
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on ${PORT}`))
