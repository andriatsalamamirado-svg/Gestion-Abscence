export default function FormInput({ label, name, type = 'text', as = 'input', options = [], error, required = false, className = '', ...props }) {
  const base =
    'focus-ring w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400'

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      {as === 'select' ? (
        <select id={name} name={name} className={base} {...props}>
          <option value="">-- Sélectionner --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea id={name} name={name} rows={3} className={base} {...props} />
      ) : (
        <input id={name} name={name} type={type} className={base} {...props} />
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
