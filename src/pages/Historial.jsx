import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'

function formatFecha(iso) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Historial() {
  const { user } = useAuth()
  const [registros, setRegistros] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandido, setExpandido] = useState(null)

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase
        .from('registros')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setRegistros(data ?? [])
      setLoading(false)
    }
    cargar()
  }, [user.id])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <p className="text-sm text-gray-400">Cargando registros...</p>
      </div>
    )
  }

  if (registros.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-sm mb-4">Aún no tienes ningún registro.</p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Crear primer registro
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Historial</h1>
        <Link
          to="/"
          className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          + Nuevo
        </Link>
      </div>

      <div className="space-y-3">
        {registros.map(r => (
          <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandido(expandido === r.id ? null : r.id)}
              className="w-full text-left px-4 py-3 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-gray-400 mb-0.5">{formatFecha(r.created_at)}</p>
                <p className="text-sm text-gray-700 line-clamp-1">{r.situacion || '—'}</p>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className="text-xs text-indigo-500 font-medium">
                  {r.emociones_puntuacion}/10
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${expandido === r.id ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {expandido === r.id && (
              <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-3">
                <Campo label="Situación" valor={r.situacion} />
                <Campo label="Pensamientos" valor={r.pensamientos} extra={`Intensidad: ${r.pensamientos_puntuacion}/10`} />
                <Campo label="Emociones" valor={r.emociones} extra={`Intensidad: ${r.emociones_puntuacion}/10`} />
                <Campo label="Conducta" valor={r.conducta} />
                <Campo label="¿Qué pasa después?" valor={r.que_pasa_despues} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Campo({ label, valor, extra }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
        {label} {extra && <span className="normal-case font-normal text-indigo-400">· {extra}</span>}
      </p>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">{valor || '—'}</p>
    </div>
  )
}
