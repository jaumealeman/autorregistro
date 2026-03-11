import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'

export default function Configuracion() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [pwError, setPwError] = useState(null)
  const [pwSuccess, setPwSuccess] = useState(false)

  async function handleChangePassword(e) {
    e.preventDefault()
    setPwError(null)
    setPwSuccess(false)

    if (password !== confirm) {
      setPwError('Las contraseñas no coinciden.')
      return
    }
    if (password.length < 6) {
      setPwError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setPwLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setPwLoading(false)

    if (error) {
      setPwError(error.message)
    } else {
      setPwSuccess(true)
      setPassword('')
      setConfirm('')
    }
  }

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-semibold text-gray-800">Configuración</h1>

      {/* Info cuenta */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Cuenta</p>
        <p className="text-sm text-gray-700">{user.email}</p>
      </div>

      {/* Cambiar contraseña */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Cambiar contraseña</h2>

        <form onSubmit={handleChangePassword} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Confirmar contraseña</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {pwError && <p className="text-sm text-red-500">{pwError}</p>}
          {pwSuccess && <p className="text-sm text-green-600">Contraseña actualizada correctamente.</p>}

          <button
            type="submit"
            disabled={pwLoading}
            className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {pwLoading ? 'Guardando...' : 'Actualizar contraseña'}
          </button>
        </form>
      </div>

      {/* Cerrar sesión */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Sesión</h2>
        <button
          onClick={handleSignOut}
          className="w-full border border-red-200 text-red-500 rounded-lg py-2 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
