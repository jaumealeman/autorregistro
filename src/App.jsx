import { useAuth } from './context/AuthContext'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Registro Emocional</h1>
      </header>
      <main className="p-6">
        {user ? (
          <p className="text-gray-600">Bienvenido, {user.email}</p>
        ) : (
          <p className="text-gray-600">No has iniciado sesión.</p>
        )}
      </main>
    </div>
  )
}

export default App
