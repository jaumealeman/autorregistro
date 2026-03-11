export default function Paso1Situacion({ formData, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-3">
        ¿Qué está ocurriendo? Describe la situación
      </label>
      <textarea
        value={formData.situacion}
        onChange={e => onChange('situacion', e.target.value)}
        rows={7}
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
      />
    </div>
  )
}
