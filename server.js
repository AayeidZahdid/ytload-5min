const express = require('express')
const cors    = require('cors')
const app     = express()
app.use(cors({
  origin: 'https://ytload-5min-u8no.vercel.app',   // allow only your frontend
  methods: ['GET', 'POST', 'OPTIONS'],             // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // allowed headers}))
app.use(express.json())
app.get('/health', (_, res) => res.sendStatus(200))
app.post('/upload', (req, res) => res.json({title:'AI'}))
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on ${PORT}`))
