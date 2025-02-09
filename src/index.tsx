import React from 'react'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<React.StrictMode>{App()}</React.StrictMode>)
