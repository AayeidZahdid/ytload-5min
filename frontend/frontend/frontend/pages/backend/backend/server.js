const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.get('/health', (_, res) => res.json({status:'ok'}))
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on ${PORT}`))
