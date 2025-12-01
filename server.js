const express = require('express')
const cors    = require('cors')
const app     = express()
app.use(cors()) // allow all origins
app.use(express.json())

app.get('/health', (_, res) => res.sendStatus(200))
app.post('/upload', (req, res) => res.json({ title: 'AI' }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on ${PORT}`))
