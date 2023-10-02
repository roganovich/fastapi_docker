import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/scss/bootstrap.scss'

import Home from './components/screens/home/Home'
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
  </React.StrictMode>,
)
