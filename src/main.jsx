import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './Components/DataProvider/DataProvider.jsx'
import { reduser } from './Utillity/reduser.js'
import { initialState } from './Utillity/reduser.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider reduser={reduser} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>,
)
