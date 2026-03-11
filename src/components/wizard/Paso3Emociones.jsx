export default function Paso3Emociones({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-600 mb-3">
          ¿Qué siento? ¿Qué sensaciones físicas tengo?
        </label>
        <textarea
          value={formData.emociones}
          onChange={e => onChange('emociones', e.target.value)}
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-gray-600">Intensidad</label>
          <span className="text-lg font-semibold text-indigo-600">
            {formData.emociones_puntuacion}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={formData.emociones_puntuacion}
          onChange={e => onChange('emociones_puntuacion', Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
    </div>
  )
}
