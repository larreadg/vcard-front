import { Route, Routes } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'
import PublicRoutes from './routes/PublicRoutes'

function App() {
  return (
    <Routes>
      <Route path="admin/*" element={<AdminRoutes />} />
      <Route path="realm/*" element={<PublicRoutes />} />
    </Routes>
  )
}

export default App
