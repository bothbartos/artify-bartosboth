import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ArtworkDetails from "./Pages/ArtworkDetails.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ArtworkDetails />
  </React.StrictMode>,
)
