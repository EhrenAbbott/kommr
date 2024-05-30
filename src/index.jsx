import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {

  return (
    <>
      <h1>Kommr</h1>
      <p>Hi</p>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
