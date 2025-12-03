const express = require('express')
const cors    = require('cors')
const multer  = require('multer')
const upload  = multer({ dest: 'tmp/' })
const cloudinary = require('cloudinary').v2
const { OpenAI } = require('openai')
const fs    = require('fs')

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_, res) => res.sendStatus(200))

app.post('/upload', upload.single('video'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' })

  // 1. Upload video to Cloudinary
  const cloudResult = await cloudinary.uploader.upload(req.file.path, {
    resource_type: 'video',
    folder: 'ytload',
    quality: 'auto',
    fetch_format: 'mp4'
  })

  // 2. Download audio stream for Whisper
  const audioUrl = cloudResult.secure_url.replace('/video/upload/', '/video/upload/q_auto,ac_mp3/') + '.mp3'
  const audioRes = await fetch(audioUrl)
  const audioBuffer = await audioRes.arrayBuffer()

  // 3. Transcribe with Whisper
  const transcription = await openai.audio.transcriptions.create({
    file: audioBuffer,
    model: 'whisper-1',
    response_format: 'text'
  })

  // 4. Generate SEO metadata with GPT-4
  const prompt = `
You are a YouTube SEO expert.
Video transcript (first 500 words):
${transcription.slice(0, 500)}

Return **only** valid JSON:
{
  "title": "60 chars max, keyword first, click-worthy",
  "description": "200-400 chars, first 120 chars hook, 3 timestamps, CTA",
  "tags": ["15 relevant keywords"]
}
`
  const gpt = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 400
  })

  const ai = JSON.parse(gpt.choices[0].message.content)

  // 5. Return everything
  return res.json({
    data: {
      url: cloudResult.secure_url,
      duration: cloudResult.duration,
      publicId: cloudResult.public_id,
      transcript: transcription,
      title: ai.title,
      description: ai.description,
      tags: ai.tags
    }
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on ${PORT}`))
