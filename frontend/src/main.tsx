import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './components/Router'
import AuthProvider from './providers/AuthProvider'
import 'bootstrap/scss/bootstrap.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
)
