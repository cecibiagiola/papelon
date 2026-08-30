const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function ResultCard({ calc, isWinner }) {
  if (!calc) return null

  const value = calc.costPerLayerMeter ?? calc.costPerMeter
  const label = calc.costPerLayerMeter ? '/ metro de capa' : '/ metro'

  return (
    <div
      className={`rounded-xl px-4 py-3 flex items-center justify-between border-2 transition-colors ${
        isWinner ? 'bg-primary/20 border-primary' : 'bg-white/5 border-transparent'
      }`}
    >
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{formatter.format(value)}</span>
        <span className="text-xs text-white/50">{label}</span>
      </div>
      {isWinner && (
        <span className="text-primary text-xl" aria-label="Mejor opción">
          ★
        </span>
      )}
    </div>
  )
}

export default ResultCard
