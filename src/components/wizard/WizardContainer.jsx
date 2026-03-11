import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../context/AuthContext'
import Paso1Situacion from './Paso1Situacion'
import Paso2Pensamientos from './Paso2Pensamientos'
import Paso3Emociones from './Paso3Emociones'
import Paso4Conducta from './Paso4Conducta'
import Paso5QueParaDespues from './Paso5QueParaDespues'

const PASOS = [Paso1Situacion, Paso2Pensamientos, Paso3Emociones, Paso4Conducta, Paso5QueParaDespues]
const TITULOS = ['Situación', 'Pensamientos', 'Emociones', 'Conducta', '¿Qué pasa después?']

export default function WizardContainer() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [paso, setPaso] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    situacion: '',
    pensamientos: '',
    pensamientos_puntuacion: 5,
    emociones: '',
    emociones_puntuacion: 5,
    conducta: '',
    que_pasa_despues: '',
  })

  const PasoActual = PASOS[paso]
  const esUltimoPaso = paso === PASOS.length - 1

  function handleChange(campo, valor) {
    setFormData(prev => ({ ...prev, [campo]: valor }))
  }

  async function handleSiguiente() {
    if (esUltimoPaso) {
      setSaving(true)
      setError(null)
      if (user?.isGuest) {
        await new Promise(r => setTimeout(r, 500))
        setSaving(false)
        navigate('/historial')
        return
      }
      const { error } = await supabase.from('registros').insert({
        user_id: user.id,
        ...formData,
      })
      setSaving(false)
      if (error) {
        setError(error.message)
      } else {
        navigate('/historial')
      }
    } else {
      setPaso(p => p + 1)
    }
  }

  function handleAnterior() {
    setPaso(p => p - 1)
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex gap-1.5 mb-8">
        {PASOS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= paso ? 'bg-indigo-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">
        Paso {paso + 1} de {PASOS.length}
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{TITULOS[paso]}</h2>

      <PasoActual formData={formData} onChange={handleChange} />

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 mt-8">
        {paso > 0 && (
          <button
            onClick={handleAnterior}
            className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Anterior
          </button>
        )}
        <button
          onClick={handleSiguiente}
          disabled={saving}
          className="flex-1 bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Guardando...' : esUltimoPaso ? 'Guardar registro' : 'Siguiente'}
        </button>
      </div>
    </div>
  )
}
