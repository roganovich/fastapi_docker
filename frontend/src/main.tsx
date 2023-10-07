import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/scss/bootstrap.scss'

import Router from './components/Router'
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
  </React.StrictMode>,
)
