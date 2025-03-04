
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import RadiosPage from './pages/RadiosPage'
import NewRadiosPage from './pages/NewRadiosPage'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="radios" element={<RadiosPage />} />
          <Route path="nouvelles-radios" element={<NewRadiosPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
