export default function Paso5QueParaDespues({ formData, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-3">
        ¿Qué consecuencias tiene a corto plazo? ¿En qué te ayuda esta respuesta? ¿Cómo te sientes después?
      </label>
      <textarea
        value={formData.que_pasa_despues}
        onChange={e => onChange('que_pasa_despues', e.target.value)}
        rows={7}
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
      />
    </div>
  )
}
