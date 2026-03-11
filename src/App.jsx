import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Wizard from './pages/Wizard'
import Historial from './pages/Historial'
import Configuracion from './pages/Configuracion'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {children}
    </div>
  )
}

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Cargando...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout><Wizard /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/historial" element={
          <ProtectedRoute>
            <Layout><Historial /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/configuracion" element={
          <ProtectedRoute>
            <Layout><Configuracion /></Layout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
