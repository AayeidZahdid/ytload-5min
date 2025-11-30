const express = require('express')
const multer  = require('multer')
const upload  = multer({ dest: 'tmp/' })
const router  = express.Router()

router.post('/upload', upload.single('video'), async (req, res) => {
  // TODO: call Cloudinary + OpenAI here
  return res.json({
    data: {
      title: 'AI Title Placeholder',
      description: 'AI Description Placeholder',
      tags: ['tag1', 'tag2', 'tag3']
    }
  })
})

module.exports = router
