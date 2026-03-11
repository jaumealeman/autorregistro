import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'
    }`

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <span className="text-sm font-semibold text-gray-800">Registro Emocional</span>

      <div className="flex items-center gap-6">
        <NavLink to="/" end className={linkClass}>
          Nuevo
        </NavLink>
        <NavLink to="/historial" className={linkClass}>
          Historial
        </NavLink>
        <NavLink to="/configuracion" className={linkClass}>
          Configuración
        </NavLink>
      </div>

      <button
        onClick={handleSignOut}
        className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        Salir
      </button>
    </nav>
  )
}
