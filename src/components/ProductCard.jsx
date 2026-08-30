import { getFieldError } from '../utils/calculate'

function Field({ label, value, onChange, error, inputMode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-white/60">{label}</label>
      <input
        type="number"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 ${
          error ? 'ring-2 ring-red-500' : 'focus:ring-primary'
        }`}
      />
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  )
}

function ProductCard({ product, index, onChange, onRemove, canRemove }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          value={product.name}
          onChange={(e) => onChange(product.id, 'name', e.target.value)}
          placeholder={`Opción ${index + 1}`}
          className="bg-transparent text-lg font-semibold outline-none border-b border-transparent focus:border-primary flex-1"
        />
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label="Quitar opción"
            className="text-white/40 hover:text-white/80 text-sm"
          >
            ✕
          </button>
        )}
      </div>

      <Field
        label="Cantidad de rollos"
        value={product.rolls}
        onChange={(v) => onChange(product.id, 'rolls', v)}
        error={getFieldError('rolls', product.rolls)}
        inputMode="numeric"
      />
      <Field
        label="Metros por rollo"
        value={product.metersPerRoll}
        onChange={(v) => onChange(product.id, 'metersPerRoll', v)}
        error={getFieldError('metersPerRoll', product.metersPerRoll)}
        inputMode="decimal"
      />
      <Field
        label="Precio total"
        value={product.price}
        onChange={(v) => onChange(product.id, 'price', v)}
        error={getFieldError('price', product.price)}
        inputMode="decimal"
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm text-white/60">Capas (opcional)</label>
        <select
          value={product.layers}
          onChange={(e) => onChange(product.id, 'layers', e.target.value)}
          className="bg-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">—</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </div>
  )
}

export default ProductCard
