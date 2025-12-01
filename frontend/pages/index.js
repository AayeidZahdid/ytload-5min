import { useState } from 'react'

const API_URL = 'https://ytload-cors-fix.onrender.com'

export default function Home() {
  const [file, setFile]   = useState(null)
  const [meta, setMeta]   = useState(null)
  const [loading, setLoad]= useState(false)

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return alert('Choose a file')
    const vid = document.createElement('video')
    vid.preload = 'metadata'
    vid.src = URL.createObjectURL(file)
    await new Promise(res => vid.addEventListener('loadedmetadata', res))
    const dur = vid.duration
    if (dur < 300 || dur > 420) return alert('Video must be 5–7 minutes')

    setLoad(true)
    const fd = new FormData()
    fd.append('video', file)

    const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: fd })
    const json = await res.json()
    setMeta(json.data)
    setLoad(false)
  }

  return (
    <main style={{fontFamily:'Arial',padding:40}}>
      <h1>YTLoad</h1>
      <p>Upload a 5–7 min video → get AI title, description, tags.</p>

      <form onSubmit={handleUpload} aria-label="Video upload">
  <label>
    Choose 5–7 min video:
    <input type="file" accept="video/*" required
           onChange={e => setFile(e.target.files?.[0])}
           aria-label="Video file" />
  </label>
  <button disabled={loading} aria-label="Upload video">
    {loading ? 'Processing…' : 'Upload'}
  </button>
</form>

      {meta && (
        <section style={{marginTop:30}}>
          <h2>AI Results</h2>
          <p><strong>Title:</strong> {meta.title}</p>
          <p><strong>Description:</strong> {meta.description}</p>
          <p><strong>Tags:</strong> {meta.tags?.join(', ')}</p>
        </section>
      )}
    </main>
  )
}
