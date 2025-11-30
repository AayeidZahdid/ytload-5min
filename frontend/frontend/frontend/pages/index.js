export default function Home() {
  return (
    <main style={{fontFamily:'Arial',padding:40}}>
      <h1>YTLoad</h1>
      <p>Upload a 5–7 min video → get AI title, description, tags.</p>
      <form>
        <input type="file" accept="video/*" required />
        <button type="submit">Upload</button>
      </form>
    </main>
  )
}
