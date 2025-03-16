
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import RadiosPage from './pages/RadiosPage'
import NewRadiosPage from './pages/NewRadiosPage'
import SuggestRadioPage from './pages/SuggestRadioPage'
import { useToast, ToastContainer } from './hooks/useToast'

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

function App() {
  const { toasts, dismissToast } = useToast()

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="radios" element={<RadiosPage />} />
          <Route path="nouvelles-radios" element={<NewRadiosPage />} />
          <Route path="suggerer-radio" element={<SuggestRadioPage />} />
        </Route>
      </Routes>
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </QueryClientProvider>
  )
}

export default App
