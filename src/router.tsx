import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CountryDetail from './pages/CountryDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/country/:code',
    element: <CountryDetail />,
  },
])

export default router 