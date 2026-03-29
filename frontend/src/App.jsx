import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import Consultants from '@/pages/Consultants'
import Missions from '@/pages/Missions'
import Login from '@/pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="consultants" element={<Consultants />} />
        <Route path="missions" element={<Missions />} />
      </Route>
    </Routes>
  )
}

export default App
